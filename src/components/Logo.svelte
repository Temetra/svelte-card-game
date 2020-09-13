<script lang="ts">
</script>

<style type="text/scss">
	section {
		position: absolute;
		width: 30rem;
		height: 13rem;
		top: 1rem;
		left: 1rem;

		& img {
			position: absolute;
			z-index: 2;
			width: 20rem;
		}

		& img:nth-child(2) {
			bottom: 0;
			right: 0;
			z-index: 1;
		}
	}
</style>

<section>
	<img src="images/video.svg" alt="Video" />
	<img src="images/poker.svg" alt="Poker" />
</section>