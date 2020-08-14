import type { SvelteComponent } from "svelte/internal";
import Joker from "../cards/Joker.svg"
import Clubs10 from "../cards/Clubs10.svg"
import Diamonds10 from "../cards/Diamonds10.svg"
import Hearts10 from "../cards/Hearts10.svg"
import Spades10 from "../cards/Spades10.svg"
import Clubs9 from "../cards/Clubs9.svg"
import Diamonds9 from "../cards/Diamonds9.svg"
import Hearts9 from "../cards/Hearts9.svg"
import Spades9 from "../cards/Spades9.svg"
import Clubs8 from "../cards/Clubs8.svg"
import Diamonds8 from "../cards/Diamonds8.svg"
import Hearts8 from "../cards/Hearts8.svg"
import Spades8 from "../cards/Spades8.svg"
import Clubs7 from "../cards/Clubs7.svg"
import Diamonds7 from "../cards/Diamonds7.svg"
import Hearts7 from "../cards/Hearts7.svg"
import Spades7 from "../cards/Spades7.svg"
import Clubs6 from "../cards/Clubs6.svg"
import Diamonds6 from "../cards/Diamonds6.svg"
import Hearts6 from "../cards/Hearts6.svg"
import Spades6 from "../cards/Spades6.svg"
import Clubs5 from "../cards/Clubs5.svg"
import Diamonds5 from "../cards/Diamonds5.svg"
import Hearts5 from "../cards/Hearts5.svg"
import Spades5 from "../cards/Spades5.svg"
import Clubs4 from "../cards/Clubs4.svg"
import Diamonds4 from "../cards/Diamonds4.svg"
import Hearts4 from "../cards/Hearts4.svg"
import Spades4 from "../cards/Spades4.svg"
import Clubs3 from "../cards/Clubs3.svg"
import Diamonds3 from "../cards/Diamonds3.svg"
import Hearts3 from "../cards/Hearts3.svg"
import Spades3 from "../cards/Spades3.svg"
import Clubs2 from "../cards/Clubs2.svg"
import Diamonds2 from "../cards/Diamonds2.svg"
import Hearts2 from "../cards/Hearts2.svg"
import Spades2 from "../cards/Spades2.svg"
import ClubsAce from "../cards/ClubsAce.svg"
import DiamondsAce from "../cards/DiamondsAce.svg"
import HeartsAce from "../cards/HeartsAce.svg"
import SpadesAce from "../cards/SpadesAce.svg"
import ClubsJack from "../cards/ClubsJack.svg"
import DiamondsJack from "../cards/DiamondsJack.svg"
import HeartsJack from "../cards/HeartsJack.svg"
import SpadesJack from "../cards/SpadesJack.svg"
import ClubsQueen from "../cards/ClubsQueen.svg"
import DiamondsQueen from "../cards/DiamondsQueen.svg"
import HeartsQueen from "../cards/HeartsQueen.svg"
import SpadesQueen from "../cards/SpadesQueen.svg"
import ClubsKing from "../cards/ClubsKing.svg"
import DiamondsKing from "../cards/DiamondsKing.svg"
import HeartsKing from "../cards/HeartsKing.svg"
import SpadesKing from "../cards/SpadesKing.svg"

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

export const Ranks: Rank[] = Object.keys(Rank).filter(x => !Number(x)).map(x => Rank[x]);

export enum Suit {
	Clubs = 1,
	Diamonds,
	Hearts,
	Spades,
	Joker
}

export const Suits: Suit[] = Object.keys(Suit).filter(x => !Number(x)).map(x => Suit[x]).filter(x => x != Suit.Joker);

type Cards = {
	[P in Rank]?: SvelteComponent;
}

const clubs: Cards = {
	[Rank.Ten]: Clubs10,
	[Rank.Nine]: Clubs9,
	[Rank.Eight]: Clubs8,
	[Rank.Seven]: Clubs7,
	[Rank.Six]: Clubs6,
	[Rank.Five]: Clubs5,
	[Rank.Four]: Clubs4,
	[Rank.Three]: Clubs3,
	[Rank.Two]: Clubs2,
	[Rank.Ace]: ClubsAce,
	[Rank.Jack]: ClubsJack,
	[Rank.Queen]: ClubsQueen,
	[Rank.King]: ClubsKing,
};

const diamonds: Cards = {
	[Rank.Ten]: Diamonds10,
	[Rank.Nine]: Diamonds9,
	[Rank.Eight]: Diamonds8,
	[Rank.Seven]: Diamonds7,
	[Rank.Six]: Diamonds6,
	[Rank.Five]: Diamonds5,
	[Rank.Four]: Diamonds4,
	[Rank.Three]: Diamonds3,
	[Rank.Two]: Diamonds2,
	[Rank.Ace]: DiamondsAce,
	[Rank.Jack]: DiamondsJack,
	[Rank.Queen]: DiamondsQueen,
	[Rank.King]: DiamondsKing,
};

const hearts: Cards = {
	[Rank.Ten]: Hearts10,
	[Rank.Nine]: Hearts9,
	[Rank.Eight]: Hearts8,
	[Rank.Seven]: Hearts7,
	[Rank.Six]: Hearts6,
	[Rank.Five]: Hearts5,
	[Rank.Four]: Hearts4,
	[Rank.Three]: Hearts3,
	[Rank.Two]: Hearts2,
	[Rank.Ace]: HeartsAce,
	[Rank.Jack]: HeartsJack,
	[Rank.Queen]: HeartsQueen,
	[Rank.King]: HeartsKing,
};

const spades: Cards = {
	[Rank.Ten]: Spades10,
	[Rank.Nine]: Spades9,
	[Rank.Eight]: Spades8,
	[Rank.Seven]: Spades7,
	[Rank.Six]: Spades6,
	[Rank.Five]: Spades5,
	[Rank.Four]: Spades4,
	[Rank.Three]: Spades3,
	[Rank.Two]: Spades2,
	[Rank.Ace]: SpadesAce,
	[Rank.Jack]: SpadesJack,
	[Rank.Queen]: SpadesQueen,
	[Rank.King]: SpadesKing,
};

export function getCardComponent(suit: Suit, rank: Rank) : SvelteComponent {
	switch (suit) {
		case Suit.Clubs: return clubs[rank];
		case Suit.Diamonds: return diamonds[rank];
		case Suit.Hearts: return hearts[rank];
		case Suit.Spades: return spades[rank];
		case Suit.Joker: return Joker;
	}
}
