import type { Card } from "./Cards";
import { Suit, Rank, Suits, Ranks } from "./Cards";
import { fetchFiles } from "./Fetching";
import { loading } from "@/stores/datastore";

// In-memory cache for card images
let images: Record<string, string> = {};

// Returns promise to preload images into bank
export function prepareCardGraphics() {
	// Create an array of images to load
	const files = {
		"CardTexture": "images/cards/CardTexture.svg",
		"CardBackgroundRed": "images/cards/CardBackgroundRed.svg",
		"CardBackgroundBlue": "images/cards/CardBackgroundBlue.svg",
		"Joker": "images/cards/Joker.svg"
	};
	
	// Iterate over card enums, adding a card for each combo
	for (const suit of Suits) {
		for (const rank of Ranks) {
			let name = `${Suit[suit]}${Rank[rank]}`;
			files[name] = `images/cards/${name}.svg`;
		}
	}

	// Return a promise to load images
	return fetchFiles(files, processResponse, updateProgress)
		.then(data => images = data);
}

// Get blob from response, convert to base64
async function processResponse(response: Response): Promise<string> {
	return await response.blob()
		.then(blob => new Promise<string>(resolve => {
			const reader = new FileReader();
			reader.addEventListener("error", () => resolve(null));
			reader.addEventListener("load", evt => resolve(evt.target.result as string));
			reader.readAsDataURL(blob);
		}));
}

// Update progress store
function updateProgress(progress: number, total: number) {
	loading.set({ name:"images", progress, total });
}

// Returns base64 image blob for card texture
export function getCardTexture() : string {
	return images["CardTexture"] || "";
}

// Returns blob for card back
export function getCardBack() : string {
	return images["CardBackgroundRed"] || "";
}

// Returns blob for card face value
export function getCardFace(card: Card) : string {
	switch (card.suit) {
		case Suit.Joker: return images["Joker"] || "";
		default: return images[`${Suit[card.suit]}${Rank[card.rank]}`] || "";
	}
}
