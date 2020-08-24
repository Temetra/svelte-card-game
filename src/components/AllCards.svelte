<script lang="ts">
	import Card from "@/components/Card.svelte"
	import { Suits, Ranks, Suit } from "@/modules/Cards"
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
	<Card suit={Suit.Joker} />
	{#each Suits as suit}
		{#each Ranks as rank}
			<Card {suit} {rank} />
		{/each}
	{/each}
</div>