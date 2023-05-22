/*!
	WebStats version 1.8
	https://github.com/Dantevg/WebStats
	
	by RedPolygon
	
	Licence: MIT
	
	Includes modified version of @itsjavi/jsx-runtime
		(MIT licenced, https://github.com/itsjavi/jsx-runtime/)
*/
class t{all;scores;online;tables;constructor({all:t,scores:e,online:s,tables:n}){this.all=t,this.scores=e,this.online=s,this.tables=n}static json(e){const s=e.startsWith("http")?"":"http://";return new t({all:`${s}${e}/stats.json`,scores:`${s}${e}/scoreboard.json`,online:`${s}${e}/online.json`,tables:`${s}${e}/tables.json`})}getStats=async()=>{if(this.all)return await(await fetch(this.all)).json();{const[t,e]=await Promise.all([this.getOnline(),this.getScoreboard()]);return{online:t,scoreboard:e}}};getScoreboard=()=>fetch(this.scores).then((t=>t.json())).catch((()=>{}));getOnline=()=>fetch(this.online).then((t=>t.json())).catch((()=>{}));getTables=()=>fetch(this.tables).then((t=>t.json())).catch((()=>{}))}class e{scoreboard;columns;scores;players;columns_;playernames;constructor(t){this.setStats(t)}get entries(){return this.scoreboard.entries}get online(){return this.players}get nOnline(){return Object.keys(this.players).length}isOnline=t=>!0===this.players[t];isAFK=t=>"afk"===this.players[t];isOffline=t=>!!this.players[t];getStatus=t=>this.isOnline(t)?"online":this.isAFK(t)?"afk":"offline";isCurrentPlayer=t=>this.playernames?.includes(t)??!1;setScoreboard(t){this.scoreboard=t,this.columns=Object.keys(t.scores).sort(),this.filter(),this.scores=[];for(const t of this.entries){const e=[];e.push(this.scores.push(e)-1),e.push(t);for(const s of this.columns)e.push(this.scoreboard.scores[s]?.[t]??0)}this.columns_={Player:1},this.columns.forEach(((t,e)=>this.columns_[t]=e+2))}setOnlineStatus(t){this.players=t}setPlayernames(t){this.playernames=t}setStats(t){this.setScoreboard(t.scoreboard),this.setOnlineStatus(t.online),this.setPlayernames(t.playernames)}filter(){this.scoreboard.entries=this.scoreboard.entries.filter(e.isPlayerOrServer).filter(this.isNonemptyEntry.bind(this)).sort(Intl.Collator().compare),this.scoreboard.scores=e.filter(this.scoreboard.scores,e.isNonemptyObjective)}sort(t,e){const s=new Intl.Collator(void 0,{sensitivity:"base"});this.scores=this.scores.sort(((n,a)=>{const i=n[this.columns_[t]],r=a[this.columns_[t]];return isNaN(Number(i))||isNaN(Number(r))?(e?-1:1)*s.compare(i,r):(e?-1:1)*(i-r)}))}isNonemptyEntry=t=>Object.entries(this.scoreboard.scores).filter((([e,s])=>s[t]&&"0"!=s[t])).length>0;static isPlayerOrServer=t=>"#server"==t||t.match(/^\w{3,16}$/)&&!t.match(/^\d*$/);static isNonemptyObjective=t=>Object.keys(t).filter(e.isPlayerOrServer).length>0;static filter=(t,e)=>Object.fromEntries(Object.entries(t).filter((([t,s])=>e(s))));static map=(t,e)=>Object.fromEntries(Object.entries(t).map((([t,s])=>[t,e(t,s)])))}function s(){return s=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},s.apply(this,arguments)}const n=["children"],a="jsx.Fragment",i="jsx.Text";function r(t,e){if("function"==typeof t)return void 0!==t.prototype?new t(e):t(e);const{children:a=[]}=e;return{type:t,key:null,props:s({},function(t,e){if(null==t)return{};var s,n,a={},i=Object.keys(t);for(n=0;n<i.length;n++)e.indexOf(s=i[n])>=0||(a[s]=t[s]);return a}(e,n),{children:Array().concat(a).map((t=>"object"==typeof t?t:{type:i,key:null,props:{text:t,children:[]}}))})}}r.Fragment=a,r.TextNode=i,r.customAttributes=["children","key","props"];const o=t=>!r.customAttributes.includes(t);class l{constructor(t){this.element=null,this.props=void 0,this.props=t}render(){return null}}"undefined"!=typeof window&&(r._globalThis=window),r.setGlobalThis=t=>{r._globalThis=t},r.renderDOM=(t,e=null,s=null,n=!1)=>{const a=t instanceof l;let i=a?t.render():t;a&&(s=t);const c=null===e?r._globalThis.document:e.ownerDocument;if(i.type===r.TextNode){void 0===i.props.text&&(i.props.text="");const t=c.createTextNode(i.props.text);return null!==e&&e.appendChild(t),t}const h=i.type===r.Fragment?c.createDocumentFragment():c.createElement(i.type);h.jsxComponent=s;const d=i.props,u=Object.keys(d);void 0!==d.className&&Array.isArray(d.className)&&(d.className=d.className.join(" ")),u.filter(o).forEach((t=>{let e=d[t];null!==s&&e instanceof Function&&(e=e.bind(s),e instanceof Function&&e(null)),t.startsWith("data-")&&h.setAttribute(t,e),h[t]=e,h[t.toLowerCase()]=e})),Array.isArray(i.props.children)&&i.props.children.forEach((t=>r.renderDOM(t,h,s)));let p=null;return a&&null!==s&&(p=s.element,s.element=h),a&&null!==s&&void 0!==s.onWillMount&&s.onWillMount(p),null!==e&&(n?e.replaceChildren(h):e.appendChild(h)),a&&null!==s&&void 0!==s.onDidMount&&s.onDidMount(p),h};const c=(t,e=null,s=null)=>r.renderDOM(t,e,s,!0),h={"§0":"black","§1":"dark_blue","§2":"dark_green","§3":"dark_aqua","§4":"dark_red","§5":"dark_purple","§6":"gold","§7":"gray","§8":"dark_gray","§9":"blue","§a":"green","§b":"aqua","§c":"red","§d":"light_purple","§e":"yellow","§f":"white"},d={"§k":"obfuscated","§l":"bold","§m":"strikethrough","§n":"underline","§o":"italic","§r":"reset"},u=/(§x§.§.§.§.§.§.|§.)([^§]*)/gm;function p(t){if(!t.format&&!t.colour)return t.text;if(0==t.text.length)return t.text;const e=["mc-format"];return t.format&&e.push(`mc-${t.format}`),"simple"==t.colourType&&e.push(`mc-${t.colour}`),r("span",{className:e,style:"hex"==t.colourType&&`color: ${t.colour}`,children:t.text})}function m(t,e,s){if(h[t])return{text:e,colour:h[t],colourType:"simple"};if(d[t])return{text:e,format:d[t],colour:s?.colour,colourType:s?.colourType};const n=t.match(/§x§(.)§(.)§(.)§(.)§(.)§(.)/m);return n?{text:e,colour:"#"+n.slice(1).join(""),colourType:"hex"}:{text:e}}const g=t=>function(t){const e=[],s=t.matchAll(u).next().value?.index;(null==s||s>0)&&e.push({text:t.substring(0,s)});for(const s of t.matchAll(u))e.push(m(s[1],s[2],e[e.length-1]));return e}(t).map(p),b=({columns:t,showSkins:e,onClick:s})=>r("tr",{children:[r("th",{colSpan:e&&2,onClick:s,children:"Player"}),...t.map((t=>r("th",{onClick:s,children:t})))]}),f=({entry:t})=>r("td",{className:["sticky","skin"],children:r("img",{title:t,src:"#server"==t?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4T2NUUlL6z0ABYBw1gGE0DBioHAZ3795lUFZWJildosQCRQaQoxnkVLgL0A2A8dFpdP8NfEICAMkiK2HeQ9JUAAAAAElFTkSuQmCC":`https://www.mc-heads.net/avatar/${t}.png`})}),y=({column:t,value:e})=>{if(null==e||"0"==e)return r("td",{"data-objective":t,className:"empty"});const s=isNaN(e)?e:Number(e).toLocaleString();return r("td",{"data-objective":t,"data-value":e,children:g(s)})},w=({entry:t,status:e})=>r("td",{"data-objective":"Player","data-value":t,children:[r("div",{className:["status",e],title:e}),"#server"==t?"Server":t]});class v extends l{props;values=new Map;status="offline";constructor(t){super(t),this.props=t}render=()=>r("tr",{entry:this.props.entry,className:[this.status,this.props.isCurrentPlayer?"current-player":void 0],children:[this.props.showSkins&&r(f,{entry:this.props.entry}),r(w,{entry:this.props.entry,status:this.status}),...this.props.columns.map((t=>r(y,{column:t,value:this.values.get(t)})))]})}class E{table;pagination;columns;sortColumn;descending;showSkins;hideOffline;data;headerElem;rows;constructor({table:t,pagination:e,showSkins:s=!0},{columns:n,sortColumn:a="Player",sortDirection:i="descending"}){this.table=t,this.pagination=e,this.columns=n,this.sortColumn=a,this.descending="descending"==i,this.showSkins=s,this.hideOffline=!1,this.pagination&&(this.pagination.onPageChange=t=>this.show())}init(t){this.data=t,this.pagination&&this.updatePagination(),this.headerElem=r(b,{columns:this.columns??this.data.columns,showSkins:this.showSkins,onClick:this.thClick.bind(this)}),this.rows=new Map;for(const t of this.getEntries())this.rows.set(t,new v({columns:this.columns??this.data.columns,showSkins:this.showSkins,entry:t,isCurrentPlayer:this.data.isCurrentPlayer(t)}));this.updateStats()}getEntries(){const t=this.data.entries.filter((t=>(this.columns??this.data.columns).some((e=>this.data.scoreboard.scores[e]?.[t]&&"0"!=this.data.scoreboard.scores[e][t]))));return this.hideOffline?t.filter((t=>this.data.isOnline(t))):t}getScores(){const t=this.data.scores.filter((t=>this.rows.has(t[1])));return this.hideOffline?t.filter((t=>this.data.isOnline(t[1]))):t}updatePagination(){this.pagination.update(this.getEntries().length)}updateScoreboard(){for(const t of this.data.scores)for(const e of this.columns??this.data.columns){let s=t[this.data.columns_[e]];s&&this.rows.get(t[1]).values.set(e,s)}}updateScoreboardAndShow(){this.updateScoreboard(),this.show()}updateOnlineStatus(){for(const[t,e]of this.rows)e.status=this.data.getStatus(e.props.entry)}updateOnlineStatusAndShow(){this.updateOnlineStatus(),this.pagination&&this.show()}updateStats(){this.updateScoreboard(),this.updateOnlineStatus()}updateStatsAndShow(){this.updateStats(),this.show()}changeHideOffline(t){this.hideOffline=t,this.pagination&&(this.updatePagination(),this.pagination.changePage(1),this.show())}show(){this.data.sort(this.sortColumn,this.descending);const t=this.getScores(),[e,s]=this.pagination?this.pagination.getRange(t.length):[0,t.length],n=[this.headerElem];for(let a=e;a<s;a++)n.push(this.rows.get(t[a][1]));c(r(a,{children:n}),this.table)}thClick(t){let e=t.target.innerText;this.descending=e!==this.sortColumn||!this.descending,this.sortColumn=e,this.pagination?.changePage(1),this.show()}static quoteEscape=t=>t.replace(/'/g,"&quot;")}class S{maxPage;displayCount;currentPage;parentElem;selectElem;prevButton;nextButton;onPageChange;constructor(t,e){this.displayCount=t,this.currentPage=1,this.parentElem=e,this.selectElem=e.querySelector("select.webstats-pagination[name=page]"),this.prevButton=e.querySelector("button.webstats-pagination[name=prev]"),this.nextButton=e.querySelector("button.webstats-pagination[name=next]"),this.selectElem.addEventListener("change",(t=>this.changePageAndCallback(Number(t.target.value)))),this.prevButton.addEventListener("click",(()=>this.changePageAndCallback(this.currentPage-1))),this.nextButton.addEventListener("click",(()=>this.changePageAndCallback(this.currentPage+1)))}static create(t,e){const s=r(a,{children:[r("button",{className:"webstats-pagination",name:"prev",children:"Prev"}),r("select",{className:"webstats-pagination",name:"page"}),r("button",{className:"webstats-pagination",name:"next",children:"Next"})]});return c(s,e),new S(t,e)}update(t){if(this.maxPage=Math.ceil(t/this.displayCount),1==this.maxPage?this.parentElem.classList.add("pagination-hidden"):this.parentElem.classList.remove("pagination-hidden"),this.selectElem){this.selectElem.innerHTML="";for(let t=1;t<=this.maxPage;t++){const e=document.createElement("option");e.innerText=String(t),this.selectElem.append(e)}this.selectElem.value=String(this.currentPage)}this.prevButton&&this.prevButton.toggleAttribute("disabled",this.currentPage<=1),this.nextButton&&this.nextButton.toggleAttribute("disabled",this.currentPage>=this.maxPage)}changePage(t){t=Math.max(1,Math.min(t,this.maxPage)),this.currentPage=t,this.selectElem.value=String(this.currentPage),this.prevButton&&this.prevButton.toggleAttribute("disabled",this.currentPage<=1),this.nextButton&&this.nextButton.toggleAttribute("disabled",this.currentPage>=this.maxPage)}changePageAndCallback(t){this.changePage(t),this.onPageChange&&this.onPageChange(this.currentPage)}getRange(t){return[(this.currentPage-1)*this.displayCount,this.displayCount>0?Math.min(this.currentPage*this.displayCount,t):t]}}class A{static CONNECTION_ERROR_MSG="No connection to server. Maybe the server is offline, or the 'host' setting in index.html is incorrect.";displays;connection;data;updateInterval;interval;loadingElem;errorElem;constructor(e){this.displays=[],this.connection=e.connection??t.json(e.host),this.updateInterval=e.updateInterval??1e4;const s=document.querySelector("input.webstats-option#hide-offline"),n=document.querySelector(".webstats-status");this.loadingElem=n?.querySelector(".webstats-loading-indicator"),this.errorElem=n?.querySelector(".webstats-error-message"),this.setLoadingStatus(!0);const a=this.connection.getStats(),i=this.connection.getTables();Promise.all([a,i]).then((([t,n])=>this.init(t,n,e,s.checked)),this.catchError(A.CONNECTION_ERROR_MSG,e)).catch(this.catchError(void 0,e));(document.cookie.split("; ")??[]).filter((t=>t.length>0)).forEach((t=>{const[e,s]=t.match(/[^=]+/g);document.documentElement.classList.toggle(e,"true"==s);const n=document.querySelector("input.webstats-option#"+e);n&&(n.checked="true"==s)})),document.querySelectorAll("input.webstats-option").forEach((t=>t.addEventListener("change",(()=>{document.documentElement.classList.toggle(t.id,t.checked),document.cookie=`${t.id}=${t.checked}; max-age=315360000; SameSite=Lax`})))),s?.addEventListener("change",(t=>{this.displays.forEach((t=>t.changeHideOffline(s.checked)))})),window.webstats=this}init(t,s,n,a){if(n.tables)for(const e in n.tables){const a=s?s.find((t=>(t.name??"")==e)):{colums:t.scoreboard.columns};a&&this.addTableManual(n,a)}else if(s)for(const t of s)this.addTableAutomatic(n,t);else this.addTableAutomatic(n,{colums:t.scoreboard.columns});this.data=new e(t),this.displays.forEach((t=>{t.init(this.data),t.hideOffline=a,t.show()})),this.updateInterval>0&&(this.startUpdateInterval(!0),document.addEventListener("visibilitychange",(()=>document.hidden?this.stopUpdateInterval():this.startUpdateInterval()))),this.setLoadingStatus(!1)}update(){this.data.nOnline>0?this.connection.getStats().then((t=>{this.data.setStats(t),this.displays.forEach((t=>t.updateStatsAndShow()))})).catch(this.catchError(A.CONNECTION_ERROR_MSG)):this.connection.getOnline().then((t=>{this.data.setOnlineStatus(t),this.displays.forEach((t=>t.updateOnlineStatusAndShow()))})).catch(this.catchError(A.CONNECTION_ERROR_MSG))}startUpdateInterval(t){this.interval=setInterval(this.update.bind(this),this.updateInterval),t||this.update()}stopUpdateInterval(){clearInterval(this.interval)}addTableManual(t,e){let s;if(t.displayCount>0&&t.tables[e.name??""].pagination){const n=t.tables[e.name??""].pagination;s=new S(t.displayCount,n)}this.displays.push(new E({...t,table:t.tables[e.name??""].table,pagination:s},e))}addTableAutomatic(t,e){const s=t.tableParent.appendChild(document.createElement("div"));let n;if(s.classList.add("webstats-tableheading"),e.name&&(s.innerText=e.name,s.setAttribute("webstats-table",e.name)),t.displayCount>0){const e=s.appendChild(document.createElement("span"));e.classList.add("webstats-pagination"),n=S.create(t.displayCount,e)}const a=t.tableParent.appendChild(document.createElement("table"));e.name&&a.setAttribute("webstats-table",e.name),this.displays.push(new E({...t,table:a,pagination:n},e))}setLoadingStatus(t){this.loadingElem&&(this.loadingElem.style.display=t?"inline":"none")}setErrorMessage(t,e){if(this.errorElem)this.errorElem.innerText=t;else{const s=document.createElement("span");if(s.innerText=t,s.classList.add("webstats-error-message"),e?.tableParent)e.tableParent.appendChild(s);else if(e?.tables)for(const t in e.tables)e.tables[t].table&&e.tables[t].table.appendChild(s)}}catchError(t,e){const s=this;return n=>{console.error(n),t&&console.warn(t),s.setErrorMessage(t??n,e),s.setLoadingStatus(!1),s.stopUpdateInterval()}}}export{t as Connection,e as Data,E as Display,S as Pagination,g as convertFormattingCodes,A as default};
//# sourceMappingURL=WebStats-dist.js.map
