(this.webpackJsonpbattleships=this.webpackJsonpbattleships||[]).push([[0],{15:function(t,e,n){},18:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n(1),c=n.n(a),i=n(8),s=n.n(i),o=(n(15),n(2)),u=n(9),f=n(5),l=n(3),d=n.n(l),j=function(t,e){var n=t,r=e,a=t.length;return{hit:function(){a--},isSunk:function(){return 0===a},coords:n,horizontal:function(){return r}}},h=function(t){var e=t.coords,n=t.recieveHit,c=t.isShip,i=t.placeShip,s=t.player,u=t.ship,f=t.gameStarted,l=Object(a.useState)(!1),d=Object(o.a)(l,2),j=d[0],h=d[1],b=Object(a.useState)("clear"),p=Object(o.a)(b,2),O=p[0],v=p[1],m=Object(a.useState)(""),y=Object(o.a)(m,2),g=y[0],S=y[1];Object(a.useEffect)((function(){c&&"player"===s&&v(u.horizontal()?"ship horizontal":"ship")}),[c,s,u]),Object(a.useEffect)((function(){c&&u.isSunk()&&v("sunk")}));var E=function(){c?(n(e),v(u.horizontal()?"ship hit horizontal":"ship hit"),S(Object(r.jsx)("i",{className:"fas fa-crosshairs"}))):(t.switchPlayer(),S(Object(r.jsx)("i",{className:"fas fa-times"})))};return Object(r.jsx)("div",{onClick:function(){!j&&f&&t.currentPlayer!==s&&(h(!0),E())},className:"grid-square ".concat(O," ").concat(s),onDrop:function(t){return function(t){if("player"===s){t.preventDefault();var n=t.dataTransfer.getData("text");i(e,n)}}(t)},onDragOver:function(t){return function(t){t.preventDefault()}(t)},"data-clicked":j,children:g})},b=function(t){var e=t.gameStarted,n=t.setBoardReady,c=t.setGameWon,i=t.player,s=Object(a.useState)([]),l=Object(o.a)(s,2),b=l[0],p=l[1];Object(a.useEffect)((function(){e&&"computer"===i&&m()}),[e]),Object(a.useEffect)((function(){b.length&&b.every((function(t){return t.isSunk()}))&&c(!0)}),[b,e,c]),Object(a.useEffect)((function(){10===b.length&&n(!0)}),[b,n]);var O=function(t,e){var n=JSON.parse(e),r=v(t,n);g(r)&&(S(r,n.rotated),document.getElementById(n.id).remove())},v=function(t,e){var n=Object(o.a)(t,2),r=n[0],a=n[1],c=[];if(e.rotated)for(var i=0;i<e.size;i++)c.push([r+(i-e.offsetX),a]);else for(var s=0;s<e.size;s++)c.push([r,a+(s-e.offsetY)]);return c},m=function(){var t=[];[6,4,4,3,3,3,2,2,2,2].forEach((function(e){for(var n=y(e);!g(n,t);)n=y(e);t.push(j(n))})),p(t)},y=function(t){var e=Math.random()>.5,n=[Math.floor(10*Math.random()),Math.floor(10*Math.random())];return v(n,{size:t,offsetX:0,offsetY:0,rotated:e})},g=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:b;return t.every((function(t){var n=Object(o.a)(t,2),r=n[0],a=n[1];return d.a.inRange(r,0,10)&&d.a.inRange(a,0,10)&&!E([r,a],e)}))},S=function(t,e){var n=j(t,e);p((function(t){return[].concat(Object(f.a)(t),[n])}))},E=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:b;return e.some((function(e){return e.coords.some((function(e){return d.a.isEqual(e,t)}))}))},x=function(t){var e,n=Object(u.a)(b);try{for(n.s();!(e=n.n()).done;){var r=e.value;if(r.coords.some((function(e){return d.a.isEqual(e,t)})))return r}}catch(a){n.e(a)}finally{n.f()}},k=function(t){x(t).hit();var e=Object(f.a)(b);p(e)};return Object(r.jsx)("div",{className:"game-board ".concat(t.player,"-board"),children:function(){for(var e=[],n=0;n<10;n++)for(var a=0;a<10;a++)e.push(Object(r.jsx)(h,{recieveHit:k,coords:[a,n],isShip:E([a,n]),ship:x([a,n]),placeShip:O,player:t.player,switchPlayer:t.switchPlayer,currentPlayer:t.currentPlayer,gameStarted:t.gameStarted}));return e}()})},p=function(t){var e=!1;return Object(r.jsx)("div",{className:"player-ship",id:t.shipId,draggable:"true","data-size":t.size,onDragStart:function(n){return function(n){document.getElementById("ships-instruct").classList.remove("blink"),n.target.style.scale="1";var r=JSON.stringify({size:n.target.dataset.size,offsetY:Math.floor((n.clientY-n.target.getBoundingClientRect().top)/50),offsetX:Math.floor((n.clientX-n.target.getBoundingClientRect().left)/50),rotated:e,id:t.shipId});n.dataTransfer.setData("text",r)}(n)},onDragEnd:function(t){return t.target.style.scale=".5"},onClick:function(t){return function(t){t.target.parentNode.style.transform=e?"":"rotate(90deg)",e=!e}(t)},children:function(){for(var e=[],n=0;n<t.size;n++)e.push(Object(r.jsx)("div",{className:"ship-square"},n));return e}()})},O=function(){return Object(r.jsxs)("div",{className:"ships-container",children:[Object(r.jsx)("span",{id:"ships-instruct",className:"blink",children:"CLICK TO ROTATE, DRAG TO DEPLOY"}),Object(r.jsx)("div",{className:"ship-yard",id:"shipYard",children:[6,4,4,3,3,3,2,2,2,2].map((function(t,e){return Object(r.jsx)(p,{size:t,shipId:"ship-".concat(e)},e)}))})]})},v=function(t){return Object(r.jsx)("button",{className:"start-btn ".concat(t.btnClass),onClick:t.startGame,children:t.text})},m=function(){var t=!1,e=!1,n=!1,r=!1,a=!1,c=0,i=0,s=function(){var s=document.querySelectorAll(".player"),f=o(s),l=c-2*c,j=function(t){return s[t].classList.contains("sunk")},h=function(t){return s[t]&&"false"===s[t].dataset.clicked};return n&&j(n)&&(e=!1),e?h(i+c)&&a?i+=c:i=h(n+l)?n+(c=l):u(s):r&&f&&!j(r)?(t=!0,c=d.a.sample(f),i=r+c):i=u(s),s[i]},o=function(t){var e=[-10,10,-1,1].filter((function(e){return t[r+e]&&"false"===t[r+e].dataset.clicked}));return d.a.isEmpty(e)&&(e=!1),e},u=function(c){r=a=t=n=e=!1;var i=d.a.sample(Object(f.a)(c).filter((function(t){return"false"===t.dataset.clicked})));return Object(f.a)(c).indexOf(i)};return{takeTurn:function c(){var o=s();o.click(),o.classList.contains("ship")?(a||t||(n=i),t&&(e=!0),r=i,a++,setTimeout((function(){return c()}),500)):e&&a?(t=!1,a=0):(e=!1,a=0)}}}();var y=function(){var t=Object(a.useState)("player"),e=Object(o.a)(t,2),n=e[0],c=e[1],i=function(){c("player"===n?"computer":"player")};Object(a.useEffect)((function(){"computer"===n&&setTimeout((function(){return m.takeTurn()}),500)}),[n]);var s=Object(a.useState)(!1),u=Object(o.a)(s,2),f=u[0],l=u[1],d=Object(a.useState)(!1),j=Object(o.a)(d,2),h=j[0],p=j[1];Object(a.useEffect)((function(){h&&(N("START GAME"),E("blink"),document.getElementById("ships-instruct").style.display="none")}),[h]);var y=Object(a.useState)(""),g=Object(o.a)(y,2),S=g[0],E=g[1],x=Object(a.useState)("DEPLOY YOUR FLEET"),k=Object(o.a)(x,2),T=k[0],N=k[1];Object(a.useEffect)((function(){f&&(N("COMMENCE ATTACK!"),E(""))}),[f]);var C=Object(a.useState)(!1),P=Object(o.a)(C,2),z=P[0],M=P[1];Object(a.useEffect)((function(){z&&(l(!1),N("player"===n?"YOU WIN!":"COMPUTER WINS"),E("winMsg"))}),[z,n]);var D=function(){window.location.reload()};return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)("header",{children:Object(r.jsx)("h1",{children:"BATTLESHIPS"})}),Object(r.jsxs)("div",{className:"boards-container",children:[Object(r.jsx)(b,{player:"player",switchPlayer:i,currentPlayer:n,gameStarted:f,setBoardReady:p,setGameWon:M}),Object(r.jsx)(v,{startGame:function(){h&&!z?l(!0):z&&D()},text:T,btnClass:S}),Object(r.jsx)(b,{player:"computer",switchPlayer:i,currentPlayer:n,gameStarted:f,setBoardReady:p,setGameWon:M})]}),Object(r.jsx)(O,{})]})},g=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),r(t),a(t),c(t),i(t)}))};s.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(y,{})}),document.getElementById("root")),g()}},[[18,1,2]]]);
//# sourceMappingURL=main.cc2f6f1b.chunk.js.map