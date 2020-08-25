<script lang="ts">
	import { requestNewCards } from "@/modules/Game";
	import type { Card } from "@/modules/Cards";
	import { Suit, Rank, State as CardState } from "@/modules/Cards";
	import { controlsEnabled } from "@/stores/datastore";
	import CardGraphic from "@/components/CardGraphic.svelte";

	let card: Card;

	$: {
		let cardState: CardState = $controlsEnabled ? CardState.Spinning : CardState.Default;
		card = { suit: Suit.Clubs, rank:Rank.Ace, state:cardState };
	}
</script>

<style type="text/scss">
	section {
		grid-area: controls;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		row-gap: 15px;
		column-gap: 15px;
		margin: 20px;
		--card-width: #{(500px/32)};
		--card-height: #{(700px/32)};
	}

	.text {
		margin-left:4px;
	}
</style>

<section>
	<button type="button" class="cyan" on:click={requestNewCards} disabled={!$controlsEnabled}>
		<span class="icon"><CardGraphic {card} /></span>
		<span class="text">Deal cards</span>
	</button>
</section>