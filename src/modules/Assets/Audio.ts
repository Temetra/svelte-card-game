import { loadingStatus } from "@/modules/Assets/LoadingStatus";
import { fetchFiles } from "@/modules/Fetching";

// Audio context
let audioCtx: AudioContext;

// In-memory cache for sounds
let sounds: Record<string, AudioBuffer>;

// Finds and plays sound. No-op until sounds are loaded.
export let playSound = async (name: string) => {};

// Returns promise to preload sounds into bank
export function prepareAudio() {
	// Sounds to load
	const files = {
		"blip": "sounds/blip.mp3",
		"card": "sounds/card-hard.mp3",
		"slide": "sounds/card-soft.mp3"
	};

	// Return a promise to load images
	return createAudioContext()
		.then(() => fetchFiles(files, processResponse, updateProgress))
		.then(data => sounds = data)
		.then(() => playSound = playSoundInternal)
		.catch(error => console.log(error));
}

async function createAudioContext() {
	if (window.AudioContext) {
		// Use native AudioContext
		audioCtx = new window.AudioContext();
	}
	else if (window.webkitAudioContext) {
		// Dynamically load this larger module
		await import("standardized-audio-context").then(({ AudioContext }) => {
			audioCtx = new AudioContext() as unknown as AudioContext;
		});
	}

	// Throw error so promise chain can abort loading
	if (!audioCtx) throw new Error("Audio context not created");
}

// Get ArrayBuffer from response, convert to AudioBuffer
async function processResponse(response: Response): Promise<AudioBuffer> {
	return await response.arrayBuffer()
		.then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer));
}

// Update progress store
function updateProgress(progress: number, total: number) {
	loadingStatus.set({ name:"sounds", progress, total });
}

// Finds and plays sound
async function playSoundInternal(name: string) {
	let buffer = sounds[name];
	if (buffer) {
		const trackSource = audioCtx.createBufferSource();
		trackSource.buffer = buffer;
		trackSource.connect(audioCtx.destination);
		trackSource.start();
	}
}
