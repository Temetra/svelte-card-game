<script lang="ts">
	import { Suits, Ranks, Suit, Rank, CardState } from "@/modules/Cards"
	import CardGraphic from "@/components/CardGraphic.svelte"
	const state = CardState.Default;
</script>

<style type="text/scss">
	.container {
		display:flex;
		flex-flow:row wrap;
		gap:15px;
		padding:10px;

		// Setting card dimensions using CSS variables
		--card-width:calc(500px/4);
		--card-height:calc(700px/4);
	}
</style>

<div class="container">
	<CardGraphic card={{suit:Suit.Joker, rank:Rank.Ace, state}} />
	{#each Suits as suit}
		{#each Ranks as rank}
			<CardGraphic card={{suit, rank, state}} />
		{/each}
	{/each}
</div>