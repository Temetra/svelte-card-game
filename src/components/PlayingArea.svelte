<script lang="ts">
	import { handleKeyDown, handleCardClick, handleCardHover, playerOneHand } from "@/modules/Game";
	import CardGraphic from "@/components/CardGraphic.svelte";
	import CardShadow from "@/components/CardShadow.svelte";
</script>

<style type="text/scss">
	section {
		grid-area: playing-area;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		perspective: 1000px;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.table {
		transform-style: preserve-3d;
		transform: rotateX(30deg);
		position: absolute;
		height: 200rem;
		width: 200rem;
	}

	// .table.felt {
	// 	background: #2E7D32;
	// 	background-image: url("../images/felt.jpg");
	// 	background-position: 50% 50%;
	// }

	.table.grid {
		background-color:#1B6EB8;

		&::before {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			background-image: url("../images/grid.svg");
			background-position: 50% 50%;
			background-size: 16.5%;
			filter:invert(100%) opacity(75%);
		}
	}

	.cards, .shadows {
		transform-style: preserve-3d;
		transform: translateZ(1px) rotateX(30deg);
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

<svelte:window on:keydown={handleKeyDown}/>

<section>
	<div class="container">
		<div class="table grid"></div>
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
	</div>
</section>