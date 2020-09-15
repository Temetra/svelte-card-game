import { Combination } from "@/modules/Cards";
import { geti18nText } from "@/modules/Text";

test("Basic text check", () => {
	expect(geti18nText("Combinations.ThreeOfAKind")).toBe("Three of a kind");
	expect(geti18nText("Controls.Deal")).toBe("Deal cards");
	expect(geti18nText("Combinations.Mistake")).toBeUndefined();
	expect(geti18nText("Mistake.Mistake")).toBeUndefined();
});

test("Slightly more elaborate", () => {
	let combo = Combination.ThreeOfAKind;
	expect(geti18nText(`Combinations.${Combination[combo]}`)).toBe("Three of a kind");
});