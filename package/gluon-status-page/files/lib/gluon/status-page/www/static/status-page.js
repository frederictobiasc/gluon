"use strict";!function(){var r=JSON.parse(document.body.getAttribute("data-translations"));function i(t,e){return t.toFixed(e).replace(/\./,r["."])}function o(t,e){e--;for(var n=t;10<=n&&0<e;n/=10)e--;return i(t,e)}function a(t){return function(t,e,n){var i=0;if(void 0===n)return"- ";for(;e<n&&i<t.length-1;)n/=e,i++;return(n=o(n,3))+" "+t[i]}(["","K","M","G","T"],1024,t)}String.prototype.sprintf=function(){var t=0,e=arguments;return this.replace(/%s/g,function(){return e[t++]})};var s={id:function(t){return t},decimal:function(t){return i(t,2)},percent:function(t){return r["%s used"].sprintf(o(100*t,3)+"%")},memory:function(t){t=1-t.available/t.total;return s.percent(t)},time:function(t){var e=Math.round(t/60),n=Math.floor(e/1440),i=Math.floor(e%1440/60),e=Math.floor(e%60),t="";return 1===n?t+=r["1 day"]+", ":1<n&&(t+=r["%s days"].sprintf(n)+", "),t+=i+":",e<10&&(t+="0"),t+=e},packetsDiff:function(t,e,n){if(0<n)return n=(t-e)/n,r["%s packets/s"].sprintf(i(n,0))},bytesDiff:function(t,e,n){if(0<n)return a(8*((t-e)/n))+"bps"},bytes:function(t){return a(t)+"B"},neighbour:function(t){if(!t)return"";for(var e in c){var n=c[e].lookup_neigh(t);if(n)return"via "+n.get_hostname()+" ("+e+")"}return"via "+t+" (unknown iface)"}};function l(e,t){return t.split("/").forEach(function(t){e=e&&e[t]}),e}function d(t,e){var n=new EventSource(t),i={};n.onmessage=function(t){t=JSON.parse(t.data);e(t,i),i=t},n.onerror=function(){n.close(),window.setTimeout(function(){d(t,e)},3e3)}}var x,k=document.body.getAttribute("data-node-address");try{x=JSON.parse(document.body.getAttribute("data-node-location"))}catch(t){}function t(t){var e=document.getElementById("mesh-vpn");if(t){e.style.display="";for(var i=document.getElementById("mesh-vpn-peers");i.lastChild;)i.removeChild(i.lastChild);t=function e(n,i){return Object.keys(i.peers||{}).forEach(function(t){n.push([t,i.peers[t]])}),Object.keys(i.groups||{}).forEach(function(t){e(n,i.groups[t])}),n}([],t);t.sort(),t.forEach(function(t){var e=document.createElement("tr"),n=document.createElement("th");n.textContent=t[0],e.appendChild(n);n=document.createElement("td");t[1]?n.textContent=r.connected+" ("+s.time(t[1].established)+")":n.textContent=r["not connected"],e.appendChild(n),i.appendChild(e)})}else e.style.display="none"}function e(t){var e=document.getElementById("radios");if(t){e.style.display="";for(var i=document.getElementById("radio-devices");i.lastChild;)i.removeChild(i.lastChild);t.sort(function(t,e){return t.phy-e.phy}),t.forEach(function(t){var e=document.createElement("tr"),n=document.createElement("th");n.textContent="phy"+t.phy,e.appendChild(n);n=document.createElement("td");n.innerHTML=t.frequency+" MHz<br />Channel "+(2484===(t=t.frequency)?14:2412<=t&&t<=2472?(t-2407)/5:5160<=t&&t<=5885?(t-5e3)/5:"unknown"),e.appendChild(n),i.appendChild(e)})}else e.style.display="none"}var n=document.querySelectorAll("[data-statistics]");d("/cgi-bin/dyn/statistics",function(o,a){var c=o.uptime-a.uptime;n.forEach(function(t){var e=t.getAttribute("data-statistics"),n=t.getAttribute("data-format"),i=l(a,e),e=l(o,e);try{var r=s[n](e,i,c);void 0!==r&&(t.textContent=r)}catch(t){console.error(t)}});try{t(o.mesh_vpn)}catch(t){console.error(t)}try{e(o.wireless)}catch(t){console.error(t)}});var c={};function A(n){var i=document.createElement("canvas"),r=i.getContext("2d"),o=null;return{canvas:i,highlight:!1,resize:function(t,e){try{r.getImageData(0,0,t,e)}catch(t){}i.width=t,i.height=e},draw:function(t,e){e=e(o);r.clearRect(t,0,5,i.height),e&&(t=t,e=e,r.beginPath(),r.fillStyle=n,r.arc(t,e,1.2,0,2*Math.PI,!1),r.closePath(),r.fill())},set:function(t){o=t}}}function h(){var c=-100,s=0,n=0,i=[],l=document.createElement("canvas");l.className="signalgraph",l.height=200;var u=l.getContext("2d");function t(){l.width=l.clientWidth,i.forEach(function(t){t.resize(l.width,l.height)})}function r(){var e;0!==l.clientWidth&&(l.width!==l.clientWidth&&t(),u.clearRect(0,0,l.width,l.height),e=!1,i.forEach(function(t){t.highlight&&(e=!0)}),u.save(),i.forEach(function(t){e&&(u.globalAlpha=.2),t.highlight&&(u.globalAlpha=1),t.draw(n,function(t){return e=t,n=c,i=s,t=l.height,(1-(e-n)/(i-n))*t;var e,n,i}),u.drawImage(t.canvas,0,0)}),u.restore(),u.save(),u.beginPath(),u.strokeStyle="rgba(255, 180, 0, 0.15)",u.lineWidth=5,u.moveTo(n+2.5,0),u.lineTo(n+2.5,l.height),u.stroke(),function(){var t=Math.floor(l.height/40);u.save(),u.lineWidth=.5,u.strokeStyle="rgba(0, 0, 0, 0.25)",u.fillStyle="rgba(0, 0, 0, 0.5)",u.textAlign="end",u.textBaseline="bottom",u.beginPath();for(var e,n,i,r=0;r<t;r++){var o=l.height-40*r;u.moveTo(0,o-.5),u.lineTo(l.width,o-.5);var a=Math.round((e=o,n=c,i=s,a=l.height,(n*e+i*(a-e))/a))+" dBm";u.save(),u.strokeStyle="rgba(255, 255, 255, 0.9)",u.lineWidth=4,u.miterLimit=2,u.strokeText(a,l.width-5,o-2.5),u.fillText(a,l.width-5,o-2.5),u.restore()}u.stroke(),u.strokeStyle="rgba(0, 0, 0, 0.83)",u.lineWidth=1.5,u.strokeRect(.5,.5,l.width-1,l.height-1),u.restore()}())}t(),window.addEventListener("resize",r);var o=0;return window.requestAnimationFrame(function t(e){40<e-o&&(r(),n=(n+1)%l.width,o=e),window.requestAnimationFrame(t)}),{el:l,addSignal:function(t){i.push(t),t.resize(l.width,l.height)},removeSignal:function(t){i.splice(i.indexOf(t),1)}}}function f(t,e,n,i){var r,o=t.table.firstElementChild,a=t.table.insertRow(),c=a.insertCell();c.setAttribute("data-label",o.children[0].textContent),t.wireless&&((r=document.createElement("span")).textContent="⬤ ",r.style.color=n,c.appendChild(r));var s=document.createElement("span");s.textContent=e,c.appendChild(s);var l={};for(var u,d,h,f,g,v,m,p,b,y=0;y<o.children.length;y++)u=o.children[y],f=h=d=void 0,(f=u.getAttribute("data-key"))&&(d=u.getAttribute("data-suffix")||"",(h=a.insertCell()).textContent="-",h.setAttribute("data-label",u.textContent),l[f]={td:h,suffix:d});function C(){b&&window.clearTimeout(b),b=window.setTimeout(function(){p&&t.signalgraph.removeSignal(p),a.parentNode.removeChild(a),i()},6e4)}function E(t){t=function(t){"::"==(t="::"==t.slice(0,2)?"0"+t:t).slice(-2)&&(t+="0");var n=(t=t.split(":")).length,i=[];return t.forEach(function(t,e){if(""===t)for(;n++<=8;)i.push(0);else/^[a-f0-9]{1,4}$/i.test(t)&&i.push(parseInt(t,16))}),i}(t);if(t){var e="";return t.forEach(function(t){e+=("0000000000000000"+t.toString(2)).slice(-16)}),e}}function w(t){var i=E(k);if(t&&t[0]){(t=t.map(function(t){var e=E(t);if(!e)return[-1];var n=0;return[n=i?function(t,e){for(var n=0;n<t.length&&n<e.length&&t[n]===e[n];n++);return n}(i,e):n,e,t]})).sort(function(t,e){return t[0]<e[0]?1:t[0]>e[0]||t[1]<e[1]?-1:t[1]>e[1]?1:0});t=t[0][2];return t&&!/^fe80:/i.test(t)?t:void 0}}return t.wireless&&((g=a.insertCell()).textContent="-",g.setAttribute("data-label",o.children[Object.keys(l).length+1].textContent),(v=a.insertCell()).textContent="-",v.setAttribute("data-label",o.children[Object.keys(l).length+2].textContent),(m=a.insertCell()).textContent="-",m.setAttribute("data-label",o.children[Object.keys(l).length+3].textContent),p=A(n),t.signalgraph.addSignal(p)),a.onmouseenter=function(){a.classList.add("highlight"),p&&(p.highlight=!0)},a.onmouseleave=function(){a.classList.remove("highlight"),p&&(p.highlight=!1)},C(),{get_hostname:function(){return s.textContent},update_nodeinfo:function(t){var e,n,i,r,o=w(t.network.addresses);o&&("span"===s.nodeName.toLowerCase()&&(r=s,s=document.createElement("a"),r.parentNode.replaceChild(s,r)),s.href="http://["+o+"]/"),s.textContent=t.hostname,x&&t.location&&(e=x.latitude,n=x.longitude,i=t.location.latitude,r=t.location.longitude,o=Math.PI/180,t=(i*=o)-(e*=o),n=(r*=o)-(n*=o),i=Math.sin(t/2)*Math.sin(t/2)+Math.sin(n/2)*Math.sin(n/2)*Math.cos(e)*Math.cos(i),i=6372.8*(2*Math.asin(Math.sqrt(i))),v.textContent=Math.round(1e3*i)+" m"),C()},update_mesh:function(n){Object.keys(l).forEach(function(t){var e=l[t];e.td.textContent=n[t]+e.suffix}),C()},update_wifi:function(t){g.textContent=t.signal,m.textContent=Math.round(t.inactive/1e3)+" s",a.classList.toggle("inactive",200<t.inactive),p.set(200<t.inactive?null:t.signal),C()}}}function u(t,e,n){var i,o={};n&&(i=h(),t.appendChild(i.el));var r={table:t.firstElementChild,signalgraph:i,ifname:e,wireless:n},a=!1,c={},s=[];function l(){var t;a||(a=!0,(t=new EventSource("/cgi-bin/dyn/neighbours-nodeinfo?"+encodeURIComponent(e))).addEventListener("neighbour",function(t){try{var n=JSON.parse(t.data);i=[],r=n.network.mesh,Object.keys(r).forEach(function(t){var e=r[t].interfaces;Object.keys(e).forEach(function(t){e[t].forEach(function(t){i.push(t)})})}),i.forEach(function(t){var e=o[t];if(e){delete c[t];try{e.update_nodeinfo(n)}catch(t){console.error(t)}}})}catch(t){console.error(t)}var i,r},!1),t.onerror=function(){t.close(),a=!1,Object.keys(c).forEach(function(t){0<c[t]&&(c[t]--,l())})})}function u(t){var e=o[t];return e||(c[t]=3,e=o[t]=f(r,t,(s=s[0]?s:["#396AB1","#DA7C30","#3E9651","#CC2529","#535154","#6B4C9A","#922428","#948B3D"]).shift(),function(){delete c[t],delete o[t]}),l()),e}return n&&d("/cgi-bin/dyn/stations?"+encodeURIComponent(e),function(n){Object.keys(n).forEach(function(t){var e=n[t];u(t).update_wifi(e)})}),{get_neigh:u,lookup_neigh:function(t){return o[t]}}}document.querySelectorAll("[data-interface]").forEach(function(t){var e=t.getAttribute("data-interface"),n=(t.getAttribute("data-interface-address"),!!t.getAttribute("data-interface-wireless"));c[e]=u(t,e,n)});var g=document.body.getAttribute("data-mesh-provider");g&&d(g,function(i){Object.keys(i).forEach(function(t){var e=i[t],n=c[e.ifname];n&&n.get_neigh(t).update_mesh(e)})})}();