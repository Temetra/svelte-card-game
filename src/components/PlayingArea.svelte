<script lang="ts">
	import { playerOneHand } from "@/stores/datastore";
	import CardGraphic from "@/components/CardGraphic.svelte";
</script>

<style type="text/scss">
	section {
		grid-area: playing-area;
		overflow: hidden;
		perspective: 1000px;
	}

	.container {
		transform-style: preserve-3d;
		transform: rotateX(30deg);
		position: absolute;
		height: 200%;
		width: 200%;
		top: -50%;
		left: -50%;
	}

	.table {
		transform-style: preserve-3d;
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
  		align-items: center;
		background: #2E7D32;
		background-image: url("../images/felt.jpg");
		background-position: 50% 50%;
	}

	.cards {
		transform-style: preserve-3d;
		display: flex;
		flex-flow: row wrap;
		row-gap: 15px;
		column-gap: 15px;
		width: (500px/4) * 5 + 15px * 4;
		height: (700px/4);
		--card-width: #{(500px/4)};
		--card-height: #{(700px/4)};
	}
</style>

<section>
	<div class="container">
		<div class="table">
			<div class="cards">
				{#each $playerOneHand as card}
					<CardGraphic suit={card.suit} rank={card.rank} mode="deal" />
				{/each}
			</div>
		</div>
	</div>
</section>