export enum Suit {
	Clubs = 1,
	Diamonds,
	Hearts,
	Spades,
	Joker
}

export const Suits: Suit[] = Object.keys(Suit).filter(x => !Number(x)).map(x => Suit[x]).filter(x => x != Suit.Joker);
