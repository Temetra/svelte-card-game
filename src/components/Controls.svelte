<script lang="ts">
	import { GameState, gameState, requestNewCards, playerOneHand } from "@/modules/Game";
	import type { StatefulCard } from "@/modules/Cards";
	import { Suit, Rank, CardState } from "@/modules/Cards";
	import CardGraphic from "@/components/CardGraphic.svelte";

	let card: StatefulCard = { suit: Suit.Clubs, rank: Rank.Ace, state: 0 };
	$: disabled = !($gameState == GameState.Ready || $gameState == GameState.Selection);
	$: card.state = disabled ? 0 : CardState.Spinning;
</script>

<style type="text/scss">
	section {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		row-gap: 15px;
		column-gap: 15px;
		--card-width: #{(500px/32)};
		--card-height: #{(700px/32)};
	}

	.icon {
		perspective: 100px;
	}

	.text {
		margin-left:4px;
	}
</style>

<section>
	<button type="button" class="cyan" on:click={requestNewCards} {disabled}>
		<span class="icon"><CardGraphic {card} /></span>
		<span class="text">Deal cards</span>
	</button>
	<button type="button" class="purple" {disabled}>
		<span class="icon"><CardGraphic {card} /></span>
		<span class="text">Draw cards</span>
	</button>
	<button type="button" class="orange" {disabled}>
		<span class="icon"><CardGraphic {card} /></span>
		<span class="text">Finish</span>
	</button>
</section>