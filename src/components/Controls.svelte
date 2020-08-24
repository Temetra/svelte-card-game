<script lang="ts">
	import { requestNewCards } from "@/modules/Game";
	import { controlsEnabled } from "@/stores/datastore";
	import Card from "@/components/Card.svelte";
	$: mode = $controlsEnabled ? "spin" : "";
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
		<span class="icon"><Card suit={1} rank={1} {mode} /></span>
		<span class="text">Deal cards</span>
	</button>
</section>