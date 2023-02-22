<script lang="ts">
	import type { PageData } from './$types';
	// @ts-ignore
	import Gravatar from 'svelte-gravatar';
	import { generatePdf } from '../utils/generatePDF';
	export let data: PageData;

	let ref: HTMLElement;
	let loading = false;

	const onPdf = async () => {
		loading = true;
		if (ref) {
			await generatePdf(ref);
		}
		loading = false;
	};
</script>

<svelte:head>
	<title>PDF output app</title>
	<meta name="description" content="PDF output app" />
</svelte:head>

<div class="container mx-auto max-w-4xl py-8">
	<div bind:this={ref}>
		{#each data.users as user}
			<div class="flex mb-4">
				<div class="avatar mr-8">
					<div class="w-20 h-20 rounded-full mt-1">
						<img alt="avatar" src={user.imgUrl} />
					</div>
				</div>
				<div>
					<p class="mb-3 text-black">{user.name}</p>
					<div class="bg-white text-black p-6">
						<p>{user.description}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<button
		class="btn btn-primary fixed bottom-10 right-10 {loading ? 'loading' : undefined}"
		on:click={onPdf}
	>
		{#if loading}
			...loading
		{:else}
			PDF出力
		{/if}
	</button>
</div>
