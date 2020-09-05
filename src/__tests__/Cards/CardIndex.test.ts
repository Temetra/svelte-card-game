import { Ranks, Rank, Suits, Suit, getCardIndex } from "@/modules/Cards";

test("Unique indices for cards", () => {
	let indices = Suits.map(suit => {
		return Ranks.map(rank => getCardIndex(rank, suit));
	});

	expect(indices).toMatchSnapshot();
});

test("getCardIndex rank suit", () => {
	let rankSuitValue = getCardIndex(Rank.Four, Suit.Diamonds);
	expect(rankSuitValue).toBe(204);
});

test("getCardIndex card", () => {
	let rankSuitValue = getCardIndex({ rank:Rank.Four, suit:Suit.Diamonds });
	expect(rankSuitValue).toBe(204);
});
