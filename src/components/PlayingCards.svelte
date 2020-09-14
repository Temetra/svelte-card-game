<script lang="ts">
	import { handleCardClick, handleCardHover, playerOneHand } from "@/modules/Game";
	import CardGraphic from "@/components/CardGraphic.svelte";
	import CardShadow from "@/components/CardShadow.svelte";
</script>

<style type="text/scss">
	section {
		position:absolute;
		height: 100%;
		width: 100%;
		perspective: 1000px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.cards, .shadows {
		transform-style: preserve-3d;
		transform: translateY(0) translateZ(1px) rotateX(30deg);
		position: absolute;
		display: flex;
		flex-flow: row wrap;
		row-gap: 15px;
		column-gap: 15px;

		& > div {
			transform-style: preserve-3d;
			width: (500px/3);
		}
	}

	.shadows {
		pointer-events: none;
	}
</style>

<section>
	<div class="shadows">
		{#each $playerOneHand as card, index}
			<div><CardShadow {card} {index} /></div>
		{/each}
	</div>
	<div class="cards">
		{#each $playerOneHand as card}
			<div><CardGraphic {card} on:click={handleCardClick} on:hover={handleCardHover} /></div>
		{/each}
	</div>
</section>