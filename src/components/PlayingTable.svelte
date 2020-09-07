<script lang="ts">
</script>

<style type="text/scss">
	@import "grid";
	
	section {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		perspective: 1000px;

		div {
			position: absolute;
			transform-style: preserve-3d;
			transform: rotateX(30deg);
			height: 200rem;
			width: 200rem;

			// &.felt {
			// 	background: #2E7D32;
			// 	background-image: url("../images/felt.jpg");
			// 	background-position: 50% 50%;
			// }

			&.grid {
				background-color:#1B6EB8;
				@include background-grid;
			}
		}
	}
</style>

<section>
	<div class="grid"></div>
</section>