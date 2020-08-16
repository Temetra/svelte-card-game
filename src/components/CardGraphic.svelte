<script lang="ts">
	import type { SvelteComponent } from "svelte/internal";
	import Background from "@/cards/CardBackground.svg";
	import { Suit, Rank, getCardComponent } from "@/modules/Cards";

	export let suit: Suit = Suit.Joker;
	export let rank: Rank = Rank.Ace;

	let cardComponent: SvelteComponent = getCardComponent(suit, rank);
</script>

<style type="text/scss">
	@keyframes fadein {
		from { opacity: 0; top: -20px; }
		to { opacity: 1; top: 0; }
	}
	
	section {
		position:relative;
		animation: fadein 500ms;

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