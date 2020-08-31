<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Card } from "@/modules/Cards";
	import { Suit, Rank, CardState, getCardName } from "@/modules/Cards";
	import { getCardTexture, getCardFace, getCardBack } from "@/modules/Assets";

	export let card: Card = { suit: Suit.Joker, rank:Rank.Ace, state:CardState.Default };

	// Dispatch card click events
	const dispatch = createEventDispatcher();
	const handleClick = () => dispatch("click", card);
	const handleEnter = () => dispatch("hover", { target:card, enter:true });
	const handleExit = () => dispatch("hover", { target:card, enter:false });
</script>

<style type="text/scss">
	section {
		position: relative;
		transform-style: preserve-3d;
		transform: scale3d(1,1,1) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg);
		transition: transform 250ms;

		// Card dimensions with fallback
		width:var(--card-width, 500px);
		height:var(--card-height, 700px);

		img {
			position: absolute;
			transform-style: preserve-3d;
			backface-visibility: hidden;
			left:0;
			width: 100%;
			height: 100%;

			&.texture {
				backface-visibility: visible;
			}

			&.back {
				transform: rotateY(180deg);
			}
		}

		&.deal {
			animation: deal-card 400ms forwards;
		}

		&.spin {
			animation-play-state: running;
			animation: spin-card 3000ms infinite;
		}

		&.hide {
			opacity: 0;
		}

		&.flipped {
			transform: scale3d(1,1,1) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(180deg);
		}

		&.focused {
			transform: scale3d(1.25,1.25,1) translateY(50px) translateZ(100px) rotateX(-30deg) rotateY(0deg);
		}

		&.flipped.focused {
			transform: scale3d(1.25,1.25,1) translateY(50px) translateZ(100px) rotateX(-30deg) rotateY(180deg);
		}
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

	@keyframes deal-card {
		from {
			opacity:0;
			transform: scale3d(1,1,1) translateY(-100px) translateZ(100px) rotateX(-30deg) rotateY(0deg);
		}
		to {
			transform: scale3d(1,1,1) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg);
		}
	}
</style>

<section 
	class:default={card.state === CardState.Default}
	class:flipped={card.state === CardState.Flipped || card.state === CardState.FlippedFocused}
	class:focused={card.state === CardState.Focused || card.state === CardState.FlippedFocused}
	class:deal={card.state === CardState.Dealing} 
	class:spin={card.state === CardState.Spinning}
	class:hide={card.state === CardState.Hidden}
	on:click={handleClick}
	on:mouseover={handleEnter}
	on:mouseout={handleExit}
>
	<img src={getCardTexture()} class="texture" alt="" />
	<img src={getCardFace(card)} class="face" alt={getCardName(card.suit, card.rank)} />
	<img src={getCardBack()} class="back" alt="" />
</section>