<script lang="ts">
	import { playerOneHand } from "@/stores/datastore";
	import CardGraphic from "@/components/CardGraphic.svelte";
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
		transform-style: preserve-3d;
		transform: rotateX(30deg);
	}

	.table {
		transform-style: preserve-3d;
		display: flex;
		height: 200rem;
		width: 200rem;
		justify-content: center;
  		align-items: center;
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
			background-size: 19rem;
			filter:invert(100%) opacity(75%);
		}
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
		<div class="table grid">
			<div class="cards">
				{#each $playerOneHand as card}
					<CardGraphic {card} />
				{/each}
			</div>
		</div>
	</div>
</section>