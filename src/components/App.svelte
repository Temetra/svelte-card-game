<script lang="ts">
	import { onMount } from "svelte";
	import Card from "~/Card.svelte"
	import { Suits, Ranks, Suit } from "~/modules/Cards.ts"
	import { waitFor, checkResponse } from "~/modules/Fetching.ts"

	const AudioContext = window.AudioContext || window.webkitAudioContext;
	const audioCtx = new AudioContext();

	let disabled: boolean = true;
	let sounds: Partial<Record<string, AudioBuffer>> = {};

	onMount(async () => {
		Promise.all([
			loadAudio("sounds/blip.mp3"),
			loadAudio("sounds/card-hard.mp3"),
			loadAudio("sounds/card-soft.mp3")
		])
		.then(values => {
			sounds.blip = values[0];
			sounds.card = values[1];
			sounds.slide = values[2];
			disabled = false;
		});
	});

	function loadAudio(filename: string): Promise<AudioBuffer> {
		return fetch(filename)
			.then(checkResponse)
			.then(response => response.arrayBuffer())
			.then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer));
	}

	function playSound(buffer: AudioBuffer) {
		const trackSource = audioCtx.createBufferSource();
		trackSource.buffer = buffer;
		trackSource.connect(audioCtx.destination);
		trackSource.start();
	}

	async function requestNewCards() {
		return Promise.resolve()
			.then(startDealing)
			.then(dealCard)
			.then(dealCard)
			.then(dealCard)
			.then(dealCard)
			.then(dealCard)
			.then(finishDealing);
	}

	async function startDealing() {
		disabled = true;
		playSound(sounds.blip);
		await waitFor(500); // some sort of anim prep before dealing
	}

	async function dealCard() {
		await waitFor(randomRange(225, 275));
		playSound(sounds.card)
	}

	async function finishDealing() {
		await waitFor(500);
		disabled = false;
	}

	function randomRange(min: number, max: number) : number {
		return Math.random() * (max - min) + min;
	}
</script>

<style type="text/scss">
	section {
		--card-width:calc(500px/4);
		--card-height:calc(700px/4);
		padding:20px;
	}
</style>

<section>
	<button type="button" class="purple" on:click={requestNewCards} {disabled}>
		<span class="icon">🃏</span>
		<span class="text">Deal cards</span>
	</button>
</section>
