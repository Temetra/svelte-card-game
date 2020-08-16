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
		from {
			opacity: 0;
			top: -50px;
			transform: rotateX(-30deg) translateZ(100px) translateY(-100px);
			filter: drop-shadow(0px 100px 8px rgba(0, 0, 0, 0.5));
		}
		to {
			opacity: 1;
			top: 0;
			transform: rotateX(0deg) translateZ(0px);
			filter: drop-shadow(0px 1px 2px rgba(0,0,0,0.25));
		}
	}
	
	section {
		position: relative;
		animation: fadein 400ms forwards;
		filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.25));

		// Card dimensions with fallback
		width:var(--card-width, 500px);
		height:var(--card-height, 700px);

		:global(svg) {
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>

<section>
	<Background />
	<svelte:component this={cardComponent}/>
</section>