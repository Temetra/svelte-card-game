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
	let section = document.body.getElementsByTagName("section").item(0);
	expect(section).not.toBeNull();
	expect(section.classList.length).toBe(1);

	let graphic = section.getElementsByClassName("face").item(0);
	expect(graphic).not.toBeNull();
	expect(graphic).toMatchSnapshot();
});

test("flipped focused", async () => {
	// Setup
	let card: StatefulCard = { suit: Suit.Hearts, rank:Rank.Queen, state: CardState.Flipped | CardState.Focused };

	// Render component
	let component = new CardGraphic({ target: document.body, props: { card } });
	expect(component).not.toBeNull();

	// Run tests
	let section = document.body.getElementsByTagName("section").item(0);
	expect(section).not.toBeNull();
	expect(section.classList.length).toBe(3);
	expect(section.classList.contains("flipped")).toBeTruthy();
	expect(section.classList.contains("focused")).toBeTruthy();
});
