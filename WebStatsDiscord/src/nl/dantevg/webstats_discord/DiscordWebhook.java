package nl.dantevg.webstats_discord;

import com.google.gson.Gson;
import nl.dantevg.webstats.StatData;
import nl.dantevg.webstats.Stats;
import nl.dantevg.webstats.WebStats;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpPatch;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.bukkit.Bukkit;
import org.bukkit.configuration.ConfigurationSection;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.stream.Collectors;

public class DiscordWebhook implements Runnable {
	private final WebStatsDiscord plugin;
	
	private final @NotNull URL baseURL;
	private final @NotNull String sortColumn;
	private final @NotNull SortDirection sortDirection;
	private final int displayCount;
	private final @NotNull List<List<String>> embeds = new ArrayList<>();
	
	private Message message;
	
	public DiscordWebhook(WebStatsDiscord plugin) throws MalformedURLException {
		this.plugin = plugin;
		
		ConfigurationSection config = WebStats.config.getConfigurationSection("discord-webhook");
		
		baseURL = new URL(config.getString("url"));
		sortColumn = config.getString("sort-column", "Player");
		sortDirection = SortDirection.fromString(
				config.getString("sort-direction", ""),
				SortDirection.DESCENDING);
		displayCount = config.getInt("display-count", 10);
		if (config.contains("columns")) {
			embeds.addAll((List<List<String>>) config.getList("columns"));
		}
	}
	
	@Override
	public void run() {
		WebStatsDiscord.logger.log(Level.INFO, "Sending Discord webhook update");
		final StatData.Stats stats = Stats.getStats();
		
		Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
			// Sort entries
			Map<String, Object> columnToSortBy = stats.scores.get(sortColumn);
			List<String> entries = new ArrayList<>(stats.entries);
			entries.sort((aRow, bRow) -> {
				String a = (String) columnToSortBy.get(aRow);
				String b = (String) columnToSortBy.get(bRow);
				
				try {
					// Try to convert a and b to numbers
					double aNum = Double.parseDouble(a);
					double bNum = Double.parseDouble(b);
					return (sortDirection == SortDirection.DESCENDING ? -1 : 1)
							* Double.compare(aNum, bNum);
				} catch (NumberFormatException e) {
					// a or b were not numbers, compare as strings
					return a.compareToIgnoreCase(b);
				}
			});
			
			// Fill message
			if (message == null) message = new Message();
			message.removeEmbeds();
			
			if (embeds.isEmpty()) {
				List<String> columns = (stats.columns != null)
						? stats.columns
						: stats.scores.keySet().stream().sorted().collect(Collectors.toList());
				message.addEmbed(makeEmbed(stats, columns, entries));
			} else {
				for (List<String> columns : embeds) {
					message.addEmbed(makeEmbed(stats, columns, entries));
				}
			}
			
			// Send message
			try {
				if (message.id != null) {
					editMessage(message);
				} else {
					sendMessage(message);
				}
			} catch (IOException e) {
				WebStatsDiscord.logger.log(Level.WARNING, "Could not send webhook message", e);
			}
		});
	}
	
	private @NotNull Embed makeEmbed(StatData.@NotNull Stats stats, @NotNull List<String> columns, @NotNull List<String> entries) {
		Embed embed = new Embed();
		embed.addField(new Embed.EmbedField("Player",
				String.join("\n", entries), true));
		
		for (String columnName : columns) {
			Map<String, Object> column = stats.scores.get(columnName);
			
			List<String> values = entries.stream()
					.limit(displayCount)
					.map((entryName) -> column.get(entryName) != null
							? (String) column.get(entryName) : "")
					.collect(Collectors.toList());
			
			embed.addField(new Embed.EmbedField(columnName,
					String.join("\n", values), true));
		}
		
		return embed;
	}
	
	private void sendMessage(Message message) throws IOException {
		URL url = new URL(baseURL + "?wait=true");
		send(new HttpPost(url.toString()), message);
	}
	
	private void editMessage(Message message) throws IOException {
		URL url = new URL(baseURL + "/messages/" + message.id);
		send(new HttpPatch(url.toString()), message);
	}
	
	private void send(HttpEntityEnclosingRequestBase request, Message message) throws IOException {
		try (final CloseableHttpClient httpClient = HttpClients.createDefault()) {
			request.setHeader("Content-Type", "application/json; charset=UTF-8");
			request.setEntity(new StringEntity(new Gson().toJson(message)));
			
			try (final CloseableHttpResponse response = httpClient.execute(request)) {
				final int status = response.getStatusLine().getStatusCode();
				if (isStatusCodeOk(status)) {
					InputStream input = response.getEntity().getContent();
					Message responseMessage = new Gson().fromJson(
							new InputStreamReader(input), Message.class);
					message.id = responseMessage.id;
				} else {
					WebStatsDiscord.logger.log(Level.WARNING, "Got !=2XX HTTP code " + status + " from Discord");
				}
			}
		}
	}
	
	private static boolean isStatusCodeOk(int status) {
		return status >= 200 && status < 300;
	}
	
	private enum SortDirection {
		ASCENDING, DESCENDING;
		
		public static @NotNull SortDirection fromString(@NotNull String direction, @NotNull SortDirection def) {
			try {
				return SortDirection.valueOf(direction.toUpperCase());
			} catch (IllegalArgumentException e) {
				WebStatsDiscord.logger.log(Level.WARNING, "Invalid direction value '" + direction + "', using default");
				return def;
			}
		}
	}
	
}
