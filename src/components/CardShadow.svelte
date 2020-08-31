<script lang="ts">
	import type { Card } from "@/modules/Cards";
	import { Suit, Rank, CardState, getCardName } from "@/modules/Cards";

	export let card: Card = { suit: Suit.Joker, rank:Rank.Ace, state:CardState.Default };
	export let index: number = 0;
</script>

<style type="text/scss">
	section {
		position: relative;
		transform-style: preserve-3d;
		transform: scale3d(1,1,1) translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg);
		transition: transform 250ms;
		background:rgba(0,0,0,0.5);
		box-shadow: 0px 0px 8px black;
		opacity: 0.5;

		// Card dimensions with fallback
		width:var(--card-width, 500px);
		height:var(--card-height, 700px);

		&.deal {
			animation: deal-card 400ms forwards;
		}

		&.hide {
			opacity: 0;
		}

		&.flipped {
			transform: scale3d(1,1,1) translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(180deg);
		}

		&.focused, &.flipped.focused {
			background: linear-gradient(0deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 5%, rgba(0,0,0,0.5) 95%, rgba(0,0,0,0.25) 100%);
			box-shadow: 0px 0px 16px black;
		}

		$positions: -60px, -30px, 0px, 30px, 60px;

		@each $pos in 1,2,3,4,5 {
			&.focused.position#{$pos} {
				transform: scale3d(1.25,1.25,1) translateX(nth($positions, $pos)) translateY(0px) translateZ(-50px) rotateX(-30deg) rotateY(0deg);
			}
			
			&.flipped.focused.position#{$pos} {
				transform: scale3d(1.25,1.25,1) translateX(nth($positions, $pos)) translateY(0px) translateZ(-50px) rotateX(-30deg) rotateY(180deg);
			}
		}
	}

	@keyframes deal-card {
		from {
			opacity:0.25;
			box-shadow: 0px 0px 32px black;
			transform: scale3d(0.85,0.85,1) translateY(100px) translateZ(0px) rotateX(30deg) rotateY(0deg);
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
	class={`position${index+1}`}
>
</section>