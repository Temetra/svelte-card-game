export enum Suit {
	Clubs = 0,
	Diamonds = 13,
	Hearts = 26,
	Spades = 39,
	Joker = 52
}

export const Suits: Suit[] = Object.keys(Suit).filter(x => Number.isNaN(Number(x))).map(x => Suit[x]).filter(x => x != Suit.Joker);
