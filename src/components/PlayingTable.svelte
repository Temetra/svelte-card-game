<script lang="ts">
</script>

<style type="text/scss">
	@import "grid";

	section {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;

		div {
			position: absolute;
			transform-style: preserve-3d;
			transform: rotateX(30deg);
			height: 200rem;
			width: 200rem;

			&.felt {
				background-color: #2E7D32;
				background-image: url("../images/felt.jpg");
				background-position: 50% 50%;
				background-size: 50%;
			}

			&.grid {
				@include blue-grid();
			}
		}
	}
</style>

<section class="shared-perspective">
	<div class="grid"></div>
</section>