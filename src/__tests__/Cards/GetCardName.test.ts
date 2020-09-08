import { getCardName, Card, Suit, Rank } from "@/modules/Cards";

test("queen of clubs", () => {
	let suit = Suit.Clubs;
	let rank = Rank.Queen;
	let result = getCardName(suit, rank);
	expect(result).toBe("Queen of Clubs");
});

test("queen of clubs with card object", () => {
	let card: Card = { rank: Rank.Queen, suit: Suit.Clubs };
	let result = getCardName(card);
	expect(result).toBe("Queen of Clubs");
});