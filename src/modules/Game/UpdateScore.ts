import { GameState, gameStateAndHand, playerOneScore } from "@/modules/Game/GameState";
import type { StatefulCard, Card } from "@/modules/Cards";
import { CardState, getBestCombination, compareCards } from "@/modules/Cards";
import { compareArrays } from "@/modules/Collections";

// Copy of previous hand
let prevHand: Card[] = [];

// Subscribe to store
gameStateAndHand.subscribe(updateScoreWhenHandChanged);

// Automatic action, updates score when either gamestate or player hand changes
function updateScoreWhenHandChanged([state, hand]: [GameState, StatefulCard[]]) {
	if (state == GameState.Selection 
		|| state == GameState.Discard
		|| state == GameState.Summary
	) {
		// Filter out flipped cards
		let filteredHand = hand.filter(x => (x.state & CardState.Flipped) == 0) as Card[];

		// Update score if hand has changed
		// Ignore focus state changes
		if (!compareArrays(filteredHand, prevHand, compareCards)) {
			// Copy filtered hand for checking next time
			prevHand = [...filteredHand];

			// Get score combination
			let combo = getBestCombination(filteredHand);

			// Update UI
			playerOneScore.set(combo);
		}
	}
	else {
		// Reset filtered hand if gamestate changes
		prevHand = [];
	}
}