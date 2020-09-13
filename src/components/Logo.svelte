<script lang="ts">
</script>

<style type="text/scss">
	@import "breakpoints";

	section {
		position: absolute;
		top: 1rem;
		left: 1rem;
		width: 12rem;

		& img:nth-child(1) {
			position: absolute;
			width: 85%;
			margin: 25% 0 0 14%;
		}

		& img:nth-child(2) {
			position: absolute;
			width: 80%;
			mix-blend-mode: lighten;
		}
	}

	@include breakpoint-min(tablet) {
		section {
			top: 2rem;
			left: 2rem;
			width: 18rem;
		}
	}

	@include breakpoint-min(widescreen) {
		section {
			top: 2rem;
			left: 2rem;
			width: 24rem;
		}
	}
</style>

<section>
	<img src="images/poker.svg" alt="Poker" />
	<img src="images/video.svg" alt="Video" />
</section>