<script lang="ts">
	import { loading } from "@/stores/datastore";
	$: nameValue = $loading ? $loading.name : "";
	$: barValue = $loading && $loading.progress ? $loading.progress / $loading.total : 0;
</script>

<style type="text/scss">
	section {
		grid-area: playing-area;
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
  		align-items: center;
		flex-direction: column;
	}
</style>

<section>
	<div>Loading {nameValue}</div>
	<div><progress value={barValue}></progress></div>
</section>
