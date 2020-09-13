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
		backdrop-filter: blur(2px);
		background: rgba(255,255,255,0.05);
		color: white;
	}
</style>

<section>
	<Score />
	<Controls />
</section>