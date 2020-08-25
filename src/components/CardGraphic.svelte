<script lang="ts">
	import { onMount } from "svelte";
	import type { Card } from "@/modules/Cards";
	import { Suit, Rank, State, getCardName } from "@/modules/Cards";
	import { getCardFace, getCardValue } from "@/modules/CardImages";

	export let card: Card = { suit: Suit.Joker, rank:Rank.Ace, state:State.Default };

	let face: HTMLImageElement;
	let value: HTMLImageElement;

	onMount(() => {
		face.src = getCardFace();
		value.src = getCardValue(card.suit, card.rank);
	});
</script>

<style type="text/scss">
	section {
		position: relative;
		filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.25));

		// Card dimensions with fallback
		width:var(--card-width, 500px);
		height:var(--card-height, 700px);

		img {
			position: absolute;
			top: 0;
			left: 0;
			width:100%;
			height:100%;
		}
	}

	@keyframes deal-card {
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

	section.deal {
		animation: deal-card 400ms forwards;
	}

	@keyframes spin-card {
		0% {
			transform: rotateY(0deg);
		}
		25% {
			transform: rotateY(360deg);
		}
		100% {
			transform: rotateY(360deg);
		}
	}

	section.spin {
		animation: spin-card 3000ms infinite;
		animation-play-state: running;
	}

	section.hide {
		opacity: 0;
	}
</style>

<section 
	class:hide={card.state === State.Hidden}
	class:deal={card.state === State.Dealing} 
	class:spin={card.state === State.Spinning}
>
	<img bind:this={face} alt="" />
	<img bind:this={value} alt={getCardName(card.suit, card.rank)} />
</section>