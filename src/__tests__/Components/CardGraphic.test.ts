import "../Mocks/AudioContext";
import "../Mocks/Fetch";
import { StatefulCard, Suit, Rank, CardState } from "@/modules/Cards";
import { prepareCardGraphics } from "@/modules/Assets";
import CardGraphic from "@/components/CardGraphic.svelte";

beforeAll(async () => {
	await prepareCardGraphics();
});

beforeEach(() => {
	document.body.innerHTML = "";
});

test("CardGraphic", async () => {
	// Setup
	let card: StatefulCard = { suit: Suit.Hearts, rank:Rank.Queen, state:0 };

	// Render component
	let component = new CardGraphic({ target: document.body, props: { card } });
	expect(component).not.toBeNull();

	// Run tests
	let graphic = document.body.getElementsByTagName("section");
	expect(graphic.length).toBe(1);
	expect(graphic[0].classList.length).toBe(1);
	expect(graphic[0]).toMatchSnapshot();
});

test("flipped focused", async () => {
	// Setup
	let card: StatefulCard = { suit: Suit.Hearts, rank:Rank.Queen, state: CardState.Flipped | CardState.Focused };

	// Render component
	let component = new CardGraphic({ target: document.body, props: { card } });
	expect(component).not.toBeNull();

	// Run tests
	let graphic = document.body.getElementsByTagName("section");
	expect(graphic.length).toBe(1);
	expect(graphic[0].classList.length).toBe(3);
	expect(graphic[0].classList.contains("flipped")).toBeTruthy();
	expect(graphic[0].classList.contains("focused")).toBeTruthy();
});
