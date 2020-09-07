<script lang="ts">
	import PlayingTable from "@/components/PlayingTable.svelte";
	import PlayingCards from "@/components/PlayingCards.svelte";
	import PlayingUI from "@/components/PlayingUI.svelte";
</script>

<style type="text/scss">
	section {
		height:100%;
	}
</style>

<section>
	<PlayingTable />
	<PlayingCards />
	<PlayingUI />
</section>