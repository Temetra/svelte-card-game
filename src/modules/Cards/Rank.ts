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

export const Ranks: Rank[] = Object.keys(Rank).filter(x => Number.isNaN(Number(x))).map(x => Rank[x]);
