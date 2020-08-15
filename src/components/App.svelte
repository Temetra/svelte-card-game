<script lang="ts">
	import { onMount } from "svelte";
	import { prepareAudio } from "@/modules/Audio";
	import { prepareGame, requestNewCards } from "@/modules/Game";
	import { guiEnabled, playerOneHand } from "@/stores/datastore";
	import CardGraphic from "@/components/CardGraphic.svelte";

	onMount(async () => {
		await prepareAudio();
		await prepareGame();
	});
</script>

<style type="text/scss">
	section {
		padding:20px;
	}

	.gui {
		margin-bottom:20px;
	}

	.cards {
		--card-width:calc(500px/4);
		--card-height:calc(700px/4);
		display:flex;
		flex-flow:row wrap;
		gap:15px;
	}
</style>

<section>
	<div class="gui">
		<button type="button" class="purple" on:click={requestNewCards} disabled={!$guiEnabled}>
			<span class="icon">🃏</span>
			<span class="text">Deal cards</span>
		</button>
	</div>
	<div class="cards">
		{#each $playerOneHand as card}
			<CardGraphic suit={card.suit} rank={card.rank} />
		{/each}
	</div>
</section>