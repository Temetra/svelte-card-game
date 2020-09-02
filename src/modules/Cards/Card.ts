import type { Rank } from "@/modules/Cards/Rank";
import type { Suit } from "@/modules/Cards/Suit";
import type { CardState } from "@/modules/Cards/CardState";

export interface Card {
	rank: Rank,
	suit: Suit
}

export interface StatefulCard extends Card {
	state: CardState
}