const SOUND_KEYS = [
  {
    code: "KeyA",
    label: "A",
    name: "boom",
  },
  {
    code: "KeyS",
    label: "S",
    name: "clap",
  },
  {
    code: "KeyD",
    label: "D",
    name: "hihat",
  },
  {
    code: "KeyF",
    label: "F",
    name: "kick",
  },
  {
    code: "KeyG",
    label: "G",
    name: "openhat",
  },
  {
    code: "KeyH",
    label: "H",
    name: "ride",
  },
  {
    code: "KeyJ",
    label: "J",
    name: "snare",
  },
  {
    code: "KeyK",
    label: "K",
    name: "tink",
  },
  {
    code: "KeyL",
    label: "L",
    name: "tom",
  },
];

const rootDiv = document.getElementById("root");

const channel1 = [];
const channel2 = [];
const channel3 = [];
const channel4 = [];

const channels = { channel1, channel2, channel3, channel4 };

let recordStartTime;
let recOptions = {
  channel: channel1,
  isRec: false,
};

const audioHtml = `${SOUND_KEYS.map(
  (sound) =>
    `
      <audio src="sounds/${sound.name}.wav" style="display:none" controls id="${sound.name}"></audio>
      <div class="soundBtn ${sound.name}">${sound.label}</div>
    `
).join("")}`;

rootDiv.innerHTML = audioHtml;
const recBtn = document.querySelector("#record");
const playBtns = document.querySelectorAll(".play");
const channelSellect = document.querySelector("#channelSellect");

const recordSound = (soundName) => {
  const soundTime = Date.now() - recordStartTime;
  const sound = SOUND_KEYS.find((sound) => sound.name === soundName);
  recOptions.channel.push({ ...sound, time: soundTime });
};

const keyPressEffect = (soundDiv) => {
  soundDiv.classList.add('active');
  setTimeout(() => soundDiv.classList.remove('active'), 500)
}

const playSound = (soundName) => {
  const sound = document.querySelector(`#${soundName}`);
  const soundDiv = document.querySelector(`.${soundName}`);
  keyPressEffect(soundDiv);
  sound.play();
};

const onKeyDown = (e) => {
  const sound = SOUND_KEYS.find((sound) => e.code === sound.code);
  if (sound) {
    playSound(sound.name);
    recOptions.isRec && recordSound(sound.name);
  }
};

const onRecClick = () => {
  recordStartTime = recOptions.isRec ? 0 : Date.now();
  recOptions = { ...recOptions, isRec: !recOptions.isRec };
};

const onPlayClick = (e) => {
  console.log(recOptions);
  channels[e.target.name].forEach((sound) =>
    setTimeout(() => {
      playSound(sound.name);
    }, sound.time)
  );
};

const onChannelSellect = (e) => {
  recOptions = { ...recOptions, channel: channels[e.target.value] };
};

const recordStopButton = () => {
  recBtn.classList.contains('active')
  ? recBtn.classList.remove('active')
  : recBtn.classList.add('active');
}

document.body.addEventListener("keydown", onKeyDown);
recBtn.addEventListener("click", onRecClick);
recBtn.addEventListener("click", recordStopButton);
playBtns.forEach((btn) => btn.addEventListener("click", onPlayClick));
channelSellect.addEventListener("change", onChannelSellect);