import { loadingStatus } from "@/modules/Assets/LoadingStatus";
import { fetchFiles } from "@/modules/Fetching";

// Audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// In-memory cache for sounds
let sounds: Record<string, AudioBuffer>;

// Returns promise to preload sounds into bank
export function prepareAudio() {
	const files = {
		"blip": "sounds/blip.mp3",
		"card": "sounds/card-hard.mp3",
		"slide": "sounds/card-soft.mp3"
	};

	// Return a promise to load images
	return fetchFiles(files, processResponse, updateProgress)
		.then(data => sounds = data);
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
export function playSound(name: string) {
	let buffer = sounds[name];

	if (buffer) {
		const trackSource = audioCtx.createBufferSource();
		trackSource.buffer = buffer;
		trackSource.connect(audioCtx.destination);
		trackSource.start();
	}
}
