<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>PDF OUTPUT</title>
	<meta name="description" content="PDF output app" />
</svelte:head>

<header class="h-14 w-full bg-white px-4 flex items-center fixed top-0 z-50">
	<a class="normal-case text-xl font-bold text-black" href="/">PDF OUTPUT</a>
</header>

<div class="bg-[#e6f2ff] h-full w-full flex justify-center pt-14">
	<slot />
</div>
