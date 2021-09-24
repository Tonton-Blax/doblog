<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const { slug } = page.params;
		const url = `/articles/${ slug }`;
		const res = await fetch(`${ url }.json`);
		if (res.ok) {
			return {
				props: { post: await res.json() }
			};
		}
		if (res.status == 404) {
			return {
				status: res.status,
				error: new Error('This page does not exist')
			}
		}
		return {
			status: res.status,
			error: new Error(`Could not load ${ url }`)
		};
	}
</script>

<script>
	import { browser } from '$app/env';
	import { toLowRes } from '$lib/utils';
	import lazyload from 'vanilla-lazyload';
	import { onMount } from 'svelte'
	export let post;

	let lazyloadInstance;
	let refresh;

	if (browser) {
		lazyloadInstance = new lazyload();
		window.onbeforeunload = ()=> {refresh=true; return undefined};
	}
	
	$: if (refresh) {
		lazyloadInstance.update();
		refresh=false
	}
	
	onMount(()=>lazyloadInstance.update());


</script>

<svelte:head>
	<title>{ post.title }</title>
</svelte:head>
<!-- This example requires Tailwind CSS v2.0+ -->
<div class="relative bg-white overflow-hidden">
	<div class="max-w-7xl mx-auto">
	  <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
		<svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
		  <polygon points="50,0 100,0 50,100 0,100" />
		</svg>
  
		<div>
		  <div class="relative pt-6 px-4 sm:px-6 lg:px-8" />
		</div>
  
		<main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
		  <div class="sm:text-center lg:text-left">
			<h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
			  <span class="block xl:inline">{post.h1.split(' ').filter((_,i) => i < 4).join(' ')}</span>
			  <span class="block text-indigo-600 xl:inline">{post.h1.split(' ').filter((_,i) => i >= 4).join(' ')}</span>
			</h1>
			<p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
			  {post.contenu[0].chapocontent}
			</p>
			<div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
			  <div class="rounded-md shadow">
				<a href="/about" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
				  Contactez-moi wesh
				</a>
			  </div>
			</div>
		  </div>
		</main>
	  </div>
	</div>
	<div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
	  <img class="lazy h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" data-src="{toLowRes(post.featured_image.thumbnail, 800)}" alt="">
	</div>
  </div>


  <section class=" bg-blueGray-200 -mt-24">
	<div class="container mx-auto px-4">
	  <div class="flex flex-wrap">
		<div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
		  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-1 shadow-lg rounded-lg">
			<div class="px-4 flex-auto">
			</div>
		  </div>
		</div>
	  </div>
	  <div class="flex flex-wrap items-center mt-16">
		<div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
		  <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
			<i class="fas fa-user-friends text-xl"></i>
		  </div>
		  <h2 class="text-3xl mb-2 font-extrabold leading-normal text-indigo-600">
			{post.contenu[1].h2}
		  </h2>
		  <p class="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
			{@html post.contenu[2].body}
		  </p>
		  <!-- <a href="../index.html" class="font-bold text-blueGray-700 mt-8">Check Notus JS!</a> -->
		</div>
		<div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
		  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded-lg bg-pink-500">
			<img alt="{post.contenu[3].images[0].alt_section}" data-src="{toLowRes(post.contenu[3].images[0].image_section)}" class="lazy w-full align-middle rounded-t-lg">
			<blockquote class="relative p-8 mb-4">
			<svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" class="absolute left-0 w-full block h-95-px -top-94-px">
					  <polygon points="-30,95 583,95 583,65" class="text-pink-500 fill-current"></polygon>
					</svg>
			  <h4 class="text-xl font-bold text-white">
				{post.contenu[3].images[0].legend_section}
			  </h4>
			</blockquote>
		  </div>
		</div>
	  </div>
	</div>
  </section>