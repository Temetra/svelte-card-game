import { GameState, gameStateAndHand, playerOneScore } from "@/modules/Game/GameState";
import { getBestCombination } from "@/modules/Game/Scoring";
import type { StatefulCard, Card } from "@/modules/Cards";
import { CardState, Rank, Suit } from "@/modules/Cards";
import { compareArrays } from "@/modules/Collections";

// Copy of previous hand
let prevHand: Card[] = [];

// Update score when either gamestate or player hand changes
gameStateAndHand.subscribe(updateScoreWhenHandChanged);

function updateScoreWhenHandChanged([gameState, hand]: [GameState, StatefulCard[]]) {
	if (gameState == GameState.Selecting) {
		// Filter out flipped cards
		let filteredHand = hand.filter(x => (x.state & CardState.Flipped) == 0) as Card[];

		// Update score if hand has changed
		// Ignore focus state changes
		if (!compareArrays(filteredHand, prevHand, compareHands)) {
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

function compareHands(first: Card, second: Card) {
	return first.rank == second.rank && first.suit == second.suit;
}