import "../Mocks/Fetch";
import { Combination } from "@/modules/Cards";
import { prepareText, geti18nText } from "@/modules/Assets";

test("Basic text check", async () => {
	await prepareText();
	expect(geti18nText("Combinations.ThreeOfAKind")).toBe("Three of a kind");
	expect(geti18nText("Controls.Deal")).toBe("Deal cards");
	expect(geti18nText("Combinations.Mistake")).toBeUndefined();
	expect(geti18nText("Mistake.Mistake")).toBeUndefined();
});

test("Slightly more elaborate", async () => {
	await prepareText();
	let combo = Combination.ThreeOfAKind;
	expect(geti18nText(`Combinations.${Combination[combo]}`)).toBe("Three of a kind");
});

test("Google translated french", async () => {
	await prepareText("fr");
	expect(geti18nText("Combinations.ThreeOfAKind")).toBe("Un brelan");
});
