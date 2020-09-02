import { Suit, Ranks } from "@/modules/Cards";
export{}

test("Clubs", () => {
	let result = Ranks.map(rank => rank + Suit.Clubs);
	expect(result).toStrictEqual([1,2,3,4,5,6,7,8,9,10,11,12,13]);
});

test("Diamonds", () => {
	let result = Ranks.map(rank => rank + Suit.Diamonds);
	expect(result).toStrictEqual([14,15,16,17,18,19,20,21,22,23,24,25,26]);
});

test("Hearts", () => {
	let result = Ranks.map(rank => rank + Suit.Hearts);
	expect(result).toStrictEqual([27,28,29,30,31,32,33,34,35,36,37,38,39]);
});

test("Spades", () => {
	let result = Ranks.map(rank => rank + Suit.Spades);
	expect(result).toStrictEqual([40,41,42,43,44,45,46,47,48,49,50,51,52]);
});
