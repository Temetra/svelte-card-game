<script lang="ts">
	import { handleCardClick, handleCardHover, playerOneHand } from "@/modules/Game";
	import CardGraphic from "@/components/CardGraphic.svelte";
	import CardShadow from "@/components/CardShadow.svelte";
</script>

<style type="text/scss">
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.cards, .shadows {
		transform-style: preserve-3d;
		transform: translateY(0) translateZ(1px) rotateX(30deg);

		width: 80vmin;

		display: flex;
		flex-flow: row wrap;

		& > div {
			transform-style: preserve-3d;
			width: calc(20% - 12px);
			margin-right:15px;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	.shadows {
		pointer-events: none;
	}
</style>

<section class="shared-perspective">
	<div class="shadows">
			{#each $playerOneHand as card, index}
			<div><CardShadow {card} {index} /></div>
		{/each}
	</div>
</section>
<section class="shared-perspective">
	<div class="cards">
		{#each $playerOneHand as card}
			<div><CardGraphic {card} on:click={handleCardClick} on:hover={handleCardHover} /></div>
		{/each}
	</div>
</section>