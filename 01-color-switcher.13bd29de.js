!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.body},n=null;function a(){var n="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));t.body.style.backgroundColor=n}t.stopBtn.disabled=!0,t.startBtn.addEventListener("click",(function(){n=setInterval(a,1e3),t.stopBtn.disabled=!1,t.startBtn.disabled=!0})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),t.startBtn.disabled=!1,t.stopBtn.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.13bd29de.js.map
