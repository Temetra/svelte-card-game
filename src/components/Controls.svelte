<script lang="ts">
	import { GameState, gameState, requestNewCards, discardAndDraw, finishHand } from "@/modules/Game";
	import type { StatefulCard } from "@/modules/Cards";
	import { Suit, Rank, CardState } from "@/modules/Cards";
	import CardGraphic from "@/components/CardGraphic.svelte";

	let card: StatefulCard = { suit: Suit.Clubs, rank: Rank.Ace, state: 0 };
	$: disabled = !($gameState == GameState.Ready 
		|| $gameState == GameState.Selection 
		|| $gameState == GameState.Discard
		|| $gameState == GameState.Summary
	);
	$: card.state = disabled ? 0 : CardState.Spinning;
</script>

<style type="text/scss">
	section {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		row-gap: 15px;
		column-gap: 15px;
	}

	.icon {
		perspective: 100px;
		width: #{(500px/32)};
	}

	.text {
		margin-left:4px;
	}
</style>

<section>
	{#if $gameState == GameState.Ready || $gameState == GameState.Dealing}
	<button type="button" class="cyan" on:click={requestNewCards} {disabled}>
		<span class="icon"><CardGraphic {card} /></span>
		<span class="text">Deal cards</span>
	</button>
	{:else if $gameState == GameState.Discard || $gameState == GameState.Drawing}
	<button type="button" class="purple" on:click={discardAndDraw} {disabled}>
		<span class="icon"><CardGraphic {card} /></span>
		<span class="text">Draw cards</span>
	</button>
	{:else if $gameState == GameState.Selection || $gameState == GameState.Summary}
	<button type="button" class="orange" on:click={finishHand} {disabled}>
		<span class="icon"><CardGraphic {card} /></span>
		<span class="text">Finish</span>
	</button>
	{/if}
</section>