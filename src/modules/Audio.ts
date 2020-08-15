import { checkResponse } from "./Fetching";

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const sounds: Partial<Record<string, AudioBuffer>> = {};

export function prepareAudio() {
	return Promise.all([
		loadAudio("sounds/blip.mp3"),
		loadAudio("sounds/card-hard.mp3"),
		loadAudio("sounds/card-soft.mp3")
	])
	.then(values => {
		sounds.blip = values[0];
		sounds.card = values[1];
		sounds.slide = values[2];
	});
}

function loadAudio(filename: string): Promise<AudioBuffer> {
	return fetch(filename)
		.then(checkResponse)
		.then(response => response.arrayBuffer())
		.then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer));
}

export function playSound(name: string) {
	let buffer = sounds[name];

	if (buffer) {
		const trackSource = audioCtx.createBufferSource();
		trackSource.buffer = buffer;
		trackSource.connect(audioCtx.destination);
		trackSource.start();
	}
}
