<script lang="ts">
	import CardGraphic from "@/components/CardGraphic.svelte";
	import { Suits, Ranks, Suit } from "@/modules/Cards";
</script>

<style type="text/scss">
	section {
		display:flex;
		flex-flow:row wrap;
		gap:15px;
		padding:10px;

		// Setting card dimensions using CSS variables
		--card-width:calc(500px/4);
		--card-height:calc(700px/4);
	}
</style>

<section>
	{#each Suits as suit}
		{#each Ranks as rank}
			<CardGraphic {suit} {rank} />
		{/each}
	{/each}
	<CardGraphic suit={Suit.Joker} />
</section>