<script lang="ts">
	import { GameState, gameState, requestNewCards, discardAndDraw, finishHand } from "@/modules/Game";
	import type { StatefulCard } from "@/modules/Cards";
	import { Suit, Rank, CardState } from "@/modules/Cards";
	import { geti18nText as text } from "@/modules/Text";
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
		position:absolute;
		bottom:0;
		width:100%;
		padding: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon {
		perspective: 100px;
		width: (500px/32);
	}

	.text {
		margin-left:4px;
	}
</style>

<section>
	{#if $gameState == GameState.Ready || $gameState == GameState.Dealing}
	<button type="button" class="cyan" on:click={requestNewCards} {disabled}>
		<span class="icon"><CardGraphic {card} /></span>
		<span class="text">{text("Controls.Deal")}</span>
	</button>
	{:else if $gameState == GameState.Discard || $gameState == GameState.Drawing}
	<button type="button" class="purple" on:click={discardAndDraw} {disabled}>
		<span class="icon"><CardGraphic {card} /></span>
		<span class="text">{text("Controls.Draw")}</span>
	</button>
	{:else if $gameState == GameState.Selection || $gameState == GameState.Summary}
	<button type="button" class="orange" on:click={finishHand} {disabled}>
		<span class="icon"><CardGraphic {card} /></span>
		<span class="text">{text("Controls.Finish")}</span>
	</button>
	{/if}
</section>