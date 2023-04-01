const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.body,
};

let timerId = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timerId = setInterval(setBgc, 1000);
  btnSwitcher(true, false);
  // refs.stopBtn.disabled = false;
  // refs.startBtn.disabled = true;
}
function onStopBtnClick() {
  clearInterval(timerId);
  btnSwitcher(false, true);
  //   refs.startBtn.disabled = false;
  //   refs.stopBtn.disabled = true;
}

function btnSwitcher(startBtnStatus, stopBtnStatus) {
  refs.startBtn.disabled = startBtnStatus;
  refs.stopBtn.disabled = stopBtnStatus;
}

function setBgc() {
  const colorToApply = getRandomHexColor();
  refs.body.style.backgroundColor = colorToApply;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
