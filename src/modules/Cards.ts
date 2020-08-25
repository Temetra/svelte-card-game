export enum Rank {
	Ace = 1,
	Two,
	Three,
	Four,
	Five,
	Six,
	Seven,
	Eight,
	Nine,
	Ten,
	Jack,
	Queen,
	King
}

export enum Suit {
	Clubs = 1,
	Diamonds,
	Hearts,
	Spades,
	Joker
}

export enum State {
	Default = 1,
	Hidden,
	Dealing,
	Spinning,
	Flipped,
}

export interface Card {
	rank: Rank,
	suit: Suit,
	state: State
}

export const Ranks: Rank[] = Object.keys(Rank).filter(x => !Number(x)).map(x => Rank[x]);

export const Suits: Suit[] = Object.keys(Suit).filter(x => !Number(x)).map(x => Suit[x]).filter(x => x != Suit.Joker);

export function getCardName(suit: Suit, rank: Rank) {
	if (suit == Suit.Joker) return Suit[suit];
	else return `${Rank[rank]} of ${Suit[suit]}`;
}
