<script lang="ts">
	import Score from "@/components/Score.svelte";
	import Controls from "@/components/Controls.svelte";
</script>

<style type="text/scss">
	section {
		position:absolute;
		bottom:0;
		width:100%;
		display: flex;
		row-gap: 15px;
		column-gap: 15px;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 20px;
		color: white;
	}
</style>

<section>
	<Score />
	<Controls />
</section>