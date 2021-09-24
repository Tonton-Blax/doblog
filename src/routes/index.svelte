<script context="module">
	export const prerender = true;
</script>

<script>
	import BlogBloc from '$lib/BlogBloc.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	
	<BlogBloc />
</section>
