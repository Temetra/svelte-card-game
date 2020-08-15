<script lang="ts">
	import Card from "~/Card.svelte"
	import { Suits, Ranks, Suit } from "~/modules/Cards.ts"


</script>

<style type="text/scss">
	section {
		--card-width:calc(500px/4);
		--card-height:calc(700px/4);
		padding:20px;
	}
</style>

<section>
	<button type="button" class="purple">
		<span class="icon">🃏</span>Deal some cards
	</button>
</section>