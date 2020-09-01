import "../Mocks/AudioContext";
import "../Mocks/Fetch";
import { Card, Suit, Rank, CardState } from "@/modules/Cards";
import { prepareCardGraphics } from "@/modules/Assets";
import CardGraphic from "@/Components/CardGraphic.svelte";

test("CardGraphic", async () => {
	// Setup
	await prepareCardGraphics();
	let card: Card = { suit: Suit.Hearts, rank:Rank.Queen, state:CardState.Default };

	// Render component
	let component = new CardGraphic({ target: document.body, props: { card } });
	expect(component).not.toBeNull();

	// Run tests
	let faces = document.body.getElementsByClassName("face");
	expect(faces.length).toBe(1);
	expect(faces[0]).toMatchSnapshot();
});
