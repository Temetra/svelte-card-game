<script lang="ts">
	import Logo from "@/components/Logo.svelte";
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
	<Logo />
	<PlayingCards />
	<PlayingUI />
</section>