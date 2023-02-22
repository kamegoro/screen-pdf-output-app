<script lang="ts">
	import type { PageData } from './$types';
	import Gravatar from 'svelte-gravatar';
	export let data: PageData;
</script>

<svelte:head>
	<title>PDF output app</title>
	<meta name="description" content="PDF output app" />
</svelte:head>

<div class="container mx-auto max-w-4xl py-8">
	{#each data.users as user}
		<div class="flex mb-4">
			<div class="avatar mr-8">
				<div class="w-12">
					<Gravatar email="notgravatar@gmail.com" default="retro" rating="g" />
				</div>
			</div>
			<div>
				<p class="mb-3">{user.name}</p>
				<div class="bg-white p-6">
					<p>{user.description}</p>
				</div>
			</div>
		</div>
	{/each}
</div>
