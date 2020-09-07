<script lang="ts">
	import type { StatefulCard } from "@/modules/Cards";
	import { Suit, Rank, CardState } from "@/modules/Cards";
	import { getCardImage } from "@/modules/Assets";

	export let card: StatefulCard = { suit: Suit.Joker, rank:Rank.Ace, state:0 };
	export let index: number = 0;
</script>

<style type="text/scss">
	section {
		position: relative;
		transform-style: preserve-3d;
		transform: scale3d(1.15,1.15,1) translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg);
		transition: transform 250ms;
		opacity: 0.2;

		// Card dimensions with fallback
		width:var(--card-width, 500px);
		height:var(--card-height, 700px);

		img {
			position: absolute;
			transform-style: preserve-3d;
			left:0;
			width: 100%;
			height: 100%;
		}

		&.deal {
			animation: deal-card 400ms forwards;
		}

		&.hide {
			opacity: 0;
		}

		&.flipped {
			transform: scale3d(1.15,1.15,1) translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(180deg);
		}

		&.focused {
			transform: scale3d(1.5,1.75,1) translateX(0) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg);
		}

		&.flipped.focused {
			transform: scale3d(1.5,1.75,1) translateX(0) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(180deg);
		}

		&.discard {
			animation: discard-card 400ms forwards;
		}
	}

	@keyframes deal-card {
		from {
			opacity: 0;
			transform: scale3d(1.5,1.5,1) translateY(-100px) translateZ(0px) rotateX(0deg) rotateY(0deg);
		}
		to {
			transform: scale3d(1.15,1.15,1) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg);
		}
	}

	@keyframes discard-card {
		from {
			transform: scale3d(1.15,1.15,1) translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(180deg);
		}
		to {
			opacity: 0;
			transform: scale3d(1.15,1.15,1) translateX(0px) translateY(-100px) translateZ(0px) rotateX(0deg) rotateY(180deg);
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
	class={`position${index+1}`}
>
	<img src={getCardImage("CardShadow")} alt="" />
</section>