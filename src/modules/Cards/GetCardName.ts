import { Rank } from "@/modules/Cards/Rank";
import { Suit } from "@/modules/Cards/Suit";

export function getCardName(suit: Suit, rank: Rank) {
	if (suit == Suit.Joker) return Suit[suit];
	else return `${Rank[rank]} of ${Suit[suit]}`;
}
