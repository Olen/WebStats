package nl.dantevg.webstats;

import nl.dantevg.webstats.storage.CSVStorage;
import nl.dantevg.webstats.storage.DatabaseStorage;
import org.bukkit.Bukkit;
import org.bukkit.command.*;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

public class CommandWebstats implements CommandExecutor, TabCompleter {
	private final WebStats webstats;
	
	public CommandWebstats(WebStats webstats) {
		this.webstats = webstats;
	}
	
	@Override
	public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
		if (args.length == 1 && args[0].equalsIgnoreCase("debug")) {
			List<String> lines = new ArrayList<>();
			lines.add(webstats.debug());
			if (WebStats.placeholderSource != null) lines.add(WebStats.placeholderSource.debug());
			lines.add(WebStats.playerIPStorage.debug());
			sender.sendMessage(String.join("\n", lines));
			return true;
		} else if (args.length == 1 && args[0].equalsIgnoreCase("reload")) {
			webstats.reload();
			if (!(sender instanceof ConsoleCommandSender)) sender.sendMessage("Reload complete");
			return true;
		} else if (args.length == 1 && args[0].equalsIgnoreCase("export")) {
			if (WebStats.statExporter.export()) {
				if (!(sender instanceof ConsoleCommandSender)) sender.sendMessage("Export finished");
			} else {
				if (!(sender instanceof ConsoleCommandSender)) sender.sendMessage("Could not export stats, check console");
			}
			return true;
		} else if (args.length == 2 && args[0].equalsIgnoreCase("migrate-placeholders-to")) {
			if (!args[1].equalsIgnoreCase("csv") && !args[1].equalsIgnoreCase("database")) {
				return false;
			}
			// Do this async because connecting to the database may take some time
			Bukkit.getScheduler().runTaskAsynchronously(webstats, () -> {
				if (args[1].equalsIgnoreCase("csv")) {
					WebStats.placeholderSource.migrateStorage(CSVStorage.class);
				} else if (args[1].equalsIgnoreCase("database")) {
					WebStats.placeholderSource.migrateStorage(DatabaseStorage.class);
				}
				sender.sendMessage("Migration complete. Remember to change config.yml to reflect these changes!");
			});
			return true;
		}
		
		return false;
	}
	
	@Override
	public @NotNull List<String> onTabComplete(CommandSender sender, Command command, String label, String[] args) {
		List<String> completions = new ArrayList<>();
		if (args.length == 1) {
			completions.add("debug");
			completions.add("reload");
			completions.add("export");
			completions.add("migrate-placeholders-to");
		} else if (args.length == 2 && args[0].equalsIgnoreCase("migrate-placeholders-to")) {
			completions.add("database");
			completions.add("csv");
		}
		return completions;
	}
	
}
