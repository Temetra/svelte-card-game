import { GameState, gameState, playerOneHand } from "@/modules/Game/GameState";
import { flipCard } from "@/modules/Game/FlipCard";
import { focusCard } from "@/modules/Game/FocusCard";
import { requestNewCards } from "@/modules/Game/RequestNewCards";
import type { StatefulCard } from "@/modules/Cards";

let state: GameState;
gameState.subscribe(x => state = x);

let hand: StatefulCard[];
playerOneHand.subscribe(x => hand = x);

export function handleCardClick(event: CustomEvent<StatefulCard>) {
	if (state == GameState.Selection) {
		flipCard(event.detail);
	}
}

export function handleCardHover(event: CustomEvent<{target:StatefulCard, enter:boolean}>) {
	if (state == GameState.Selection) {
		focusCard(event.detail);
	}
}

export function handleKeyboardInput(event: KeyboardEvent) {
	if (event.repeat) return;

	// Number keys flip cards when selection for drawing is possible
	if (state == GameState.Selection) {
		switch (event.code) {
			case "Digit1": flipCard(hand[0]); break;
			case "Digit2": flipCard(hand[1]); break;
			case "Digit3": flipCard(hand[2]); break;
			case "Digit4": flipCard(hand[3]); break;
			case "Digit5": flipCard(hand[4]); break;
			default: break;
		}
	}

	// Space triggers the next contextual action
	if (event.code == "Space") {
		switch (state) {
			case GameState.Ready: 
			case GameState.Selection: 
				requestNewCards();
				break;
			default:
				break;
		}
	}
}
