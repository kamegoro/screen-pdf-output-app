<script lang="ts">
	import type { PageData } from './$types';
	import { generatePdf } from '../utils/generatePDF';
	import { goto } from '$app/navigation';
	export let data: PageData;

	let ref: HTMLElement;
	let loading = false;
	let count = data.users.length;

	const onPdf = async () => {
		loading = true;
		if (ref) {
			await generatePdf(ref);
		}
		loading = false;
	};

	const onEnter = (
		e: KeyboardEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		if (e.key === 'Enter') {
			goto(`/?user=${count}`);
		}
	};
</script>

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
	<div class="fixed bottom-10 right-10 flex flex-col">
		<input
			bind:value={count}
			type="number"
			disabled={loading}
			placeholder="ユーザー数"
			class="input w-36 max-w-xs mb-2"
			on:keydown={onEnter}
		/>
		<button
			disabled={loading}
			class="btn btn-primary {loading ? 'loading' : undefined}"
			on:click={onPdf}
		>
			{#if loading}
				...loading
			{:else}
				PDF出力
			{/if}
		</button>
	</div>
</div>
