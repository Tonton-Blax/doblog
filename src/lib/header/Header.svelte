<script>
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import {onMount} from 'svelte'
	import Dorothee from './Dorothee.svelte'
	let ready = false;
	let open = false;
	let burger;
	onMount(()=>setTimeout( () => ready = true , 300));
	let handleClick = (e) => {
		if (!burger.contains(e.target))
			open = false;
		else open = !open
	}

</script>
<svelte:window on:scroll={()=>open = false} on:click={handleClick} />
<nav class="bg-white shadow">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="flex justify-between h-16">
		<div class="flex">
		  <div class="flex-shrink-0 flex items-center">
			<img class="block lg:hidden h-8 w-auto" src="/img/writing.svg" alt="Workflow">
			<img class="hidden lg:block h-8 w-auto" src="/img/writing.svg" alt="Workflow">
		  </div>
		  <div class="hidden sm:ml-6 sm:flex sm:space-x-8" id="menu-bloc">
			<!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
			<a href="/" class:border-indigo-500={$page.path === '/'} sveltekit:prefetch 
			class="border-transparent text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-extrabold">
			  Accueil
			</a>
			<a href="/about" class:border-indigo-500={$page.path === '/about'} sveltekit:prefetch 
			class="border-transparent text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-extrabold">
			  Me Myself & I
			</a>
			<a href="/articles" class:border-indigo-500={$page.path === '/articles'} sveltekit:prefetch
			class="border-transparent text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-extrabold">
			  Articles
			</a>
			
				
			
		  </div>
		</div>
		{#if ready}
			<Dorothee/>
		{/if}

		<div class="-mr-2 flex items-center sm:hidden">
		  <!-- Mobile menu button -->
		  <button bind:this={burger}
		 	type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
			<span class="sr-only">Open main menu</span>			
			<svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			{#if open}
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			{:else}
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			{/if}
			</svg>
		  </button>
		</div>
	  </div>
	</div>
  
	<!-- Mobile menu, show/hide based on menu state. -->
	{#if open}
	<div class="sm:hidden" id="mobile-menu" transition:slide>
	  <div class="pt-2 pb-3 space-y-1">
		<!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
		<a href="/" class:active={$page.path === '/'} sveltekit:prefetch class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Accueil</a>
		<a href="/about" class:active={$page.path === '/about'} class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Me Myself & I</a>
		<a href="/articles" class:active={$page.path === '/articles'} sveltekit:prefetch={!$page.path.includes('articles')} class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Articles</a>
	  </div>
	</div>
	{/if}
  </nav>
  

<style lang="postcss">
	#menu-bloc a:hover {
		@apply border-gray-300 text-gray-700
	}

</style>