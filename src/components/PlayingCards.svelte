<script lang="ts">
	import { handleCardClick, handleCardHover, playerOneHand } from "@/modules/Game";
	import CardGraphic from "@/components/CardGraphic.svelte";
	import CardShadow from "@/components/CardShadow.svelte";
</script>

<style type="text/scss">
	@import "breakpoints";

	section {
		perspective: 1000px;

		position:absolute;
		height: 100%;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.cards, .shadows {
		transform-style: preserve-3d;
		transform: translateY(0) translateZ(1px) rotateX(30deg);

		// wrapped in calc to work around min/max sass issue
		width: calc(min(calc(40vmin + 400px), 90vw));
		margin-top: 5vh;

		display: flex;
		flex-flow: row wrap;
		row-gap: 15px;
		column-gap: 15px;

		& > div {
			transform-style: preserve-3d;
			width: calc(20% - 12px);
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
</section>
<section>
	<div class="cards">
		{#each $playerOneHand as card}
			<div><CardGraphic {card} on:click={handleCardClick} on:hover={handleCardHover} /></div>
		{/each}
	</div>
</section>