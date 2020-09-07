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
	}
	
	.cards, .shadows {
		transform-style: preserve-3d;
		transform: translateY(-33%) translateZ(1px) rotateX(30deg);
		position: absolute;
		width: (500px/4) * 5 + 15px * 4;
		height: (700px/4);
		display: flex;
		flex-flow: row wrap;
		row-gap: 15px;
		column-gap: 15px;
		--card-width: #{(500px/4)};
		--card-height: #{(700px/4)};
	}

	.shadows {
		pointer-events: none;
	}
</style>

<section>
	<div class="shadows">
		{#each $playerOneHand as card, index}
			<CardShadow {card} {index} />
		{/each}
	</div>
	<div class="cards">
		{#each $playerOneHand as card}
			<CardGraphic {card} on:click={handleCardClick} on:hover={handleCardHover} />
		{/each}
	</div>
</section>