<script lang="ts">
	import type { SvelteComponent } from "svelte/internal";
	import Background from "../cards/CardBackground.svg"
	import { Suit, Rank, getCardComponent } from "~/modules/Cards.ts"

	export let suit: Suit = Suit.Joker;
	export let rank: Rank = Rank.Ace;

	let cardComponent: SvelteComponent = getCardComponent(suit, rank);
</script>

<style type="text/scss">
	section {
		position:relative;

		// Card dimensions with fallback
		width:var(--card-width, 500px);
		height:var(--card-height, 700px);

		:global(svg) {
			position: absolute;
			top:0;
			left:0;
		}
	}
</style>

<section>
	<Background />
	<svelte:component this={cardComponent}/>
</section>