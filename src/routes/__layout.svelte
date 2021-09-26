<script>
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte'
	import "../app.postcss";
</script>

<Header/>

<main>
<slot>
</slot>
</main>

<Footer />

<style>
	
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 0;
		box-sizing: border-box;
	}

</style>
