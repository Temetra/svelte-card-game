import { getCardName, Suit, Rank } from "@/modules/Cards";

test("queen of clubs", () => {
	let suit = Suit.Clubs;
	let rank = Rank.Queen;
	let result = getCardName(suit, rank);
	expect(result).toBe("Queen of Clubs");
});