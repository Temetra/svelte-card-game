<script lang="ts">
	import type { Card } from "@/modules/Cards";
	import { Suit, Rank, State, getCardName } from "@/modules/Cards";
	import { getCardTexture, getCardFace, getCardBack } from "@/modules/CardImages";

	export let card: Card = { suit: Suit.Joker, rank:Rank.Ace, state:State.Default };

	function flipCard() {
		card.state = card.state == State.Default ? State.Flipped : State.Default;
	}
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

		&::before {
			content: '';
			position: absolute;
			transform-style: preserve-3d;
			left:0;
			width:var(--card-width, 500px);
			height:var(--card-height, 700px);
			background:rgba(0,0,0,0.5);
			box-shadow: 0px 0px 4px black;
			opacity: 0.5;
		}

		&.deal {
			animation: deal-card 400ms forwards;

			&::before {
				animation: deal-card-shadow 400ms forwards;
			}
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

		&.default:hover {
			transform: scale3d(1.25,1.25,1.25) translateY(50px) translateZ(100px) rotateX(-30deg);
		}

		&.flipped:hover {
			transform: scale3d(1.25,1.25,1.25) translateY(50px) translateZ(100px) rotateX(-30deg) rotateY(180deg);
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
			transform: translateY(-100px) translateZ(100px) rotateX(-30deg);
		}
		to {
			transform: translateY(0px) translateZ(0px) rotateX(0deg);
		}
	}

	@keyframes deal-card-shadow {
		from {
			opacity:0.25;
			box-shadow: 0px 0px 32px black;
			transform: scale(0.85,0.85) translateY(100px) translateZ(-50px) rotateX(30deg);
		}
		to {
			box-shadow: 0px 0px 8px black;
			transform: translateY(0px) translateZ(0px) rotateX(0deg);
		}
	}
</style>

<section 
	class:default={card.state === State.Default}
	class:flipped={card.state === State.Flipped}
	class:deal={card.state === State.Dealing} 
	class:spin={card.state === State.Spinning}
	class:hide={card.state === State.Hidden}
	on:click={flipCard}
>
	<img src={getCardTexture()} class="texture" alt="" />
	<img src={getCardFace(card)} class="face" alt={getCardName(card.suit, card.rank)} />
	<img src={getCardBack()} class="back" alt="" />
</section>