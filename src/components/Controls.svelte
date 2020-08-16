<script lang="ts">
	import { requestNewCards } from "@/modules/Game";
	import { controlsEnabled } from "@/stores/datastore";
</script>

<style type="text/scss">
	section {
		grid-area: controls;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		gap: 15px;
		margin: 20px;
	}
</style>

<section>
	<button type="button" class="cyan" on:click={requestNewCards} disabled={!$controlsEnabled}>
		<span class="icon">🃏</span>
		<span class="text">Deal cards</span>
	</button>
</section>