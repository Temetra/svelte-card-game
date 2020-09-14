<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { StatefulCard } from "@/modules/Cards";
	import { Suit, Rank, CardState, getCardName } from "@/modules/Cards";
	import { getCardImage, getCardFace } from "@/modules/Assets";

	export let card: StatefulCard = { suit: Suit.Joker, rank:Rank.Ace, state:0 };

	// Dispatch card click events
	const dispatch = createEventDispatcher();
	const handleClick = () => dispatch("click", card);
	const handleEnter = () => dispatch("hover", { target:card, enter:true });
	const handleExit = () => dispatch("hover", { target:card, enter:false });
</script>

<style type="text/scss">
	section {
		position: relative;
		width: 100%;
		height: 100%;
		padding-top: 71.43%;
		transform-style: preserve-3d;
		transform: scale3d(1,1,1) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg);
		transition: transform 250ms;


		img {
			position: absolute;
			transform-style: preserve-3d;
			backface-visibility: hidden;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;

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

		&.discard {
			img {
				backface-visibility: visible;

				&.face {
					opacity: 0;
				}

				&.back {
					transform: rotateY(0deg);
				}
			}

			animation: discard-card 400ms forwards;
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

	@keyframes discard-card {
		from {
			transform: scale3d(1,1,1) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(180deg);
		}
		to {
			opacity: 0;
			transform: scale3d(1,1,1) translateY(-100px) translateZ(0px) rotateX(0deg) rotateY(180deg);
		}
	}
</style>

<section 
	class:flipped={(card.state & CardState.Flipped) != 0}
	class:focused={(card.state & CardState.Focused) != 0}
	class:deal={(card.state & CardState.Dealing) != 0}
	class:spin={(card.state & CardState.Spinning) != 0}
	class:hide={(card.state & CardState.Hidden) != 0}
	class:discard={(card.state & CardState.Discarding) != 0}
	on:click={handleClick}
	on:mouseover={handleEnter}
	on:mouseout={handleExit}
>
	<img src={getCardImage("CardTexture")} class="texture" alt="" />
	<img src={getCardFace(card)} class="face" alt={getCardName(card.suit, card.rank)} />
	<img src={getCardImage("CardBackgroundRed")} class="back" alt="" />
</section>