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
	import SvelteSeo from "svelte-seo";
	import lazyload from 'vanilla-lazyload';
	import { onMount } from 'svelte'
	import { page } from '$app/stores';
	import marked from 'marked';
	export let post;
	//console.log(post)
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

<SvelteSeo
  title="{post.title}"
  description="{post.meta}"
  canonical="https://{$page.host}/{post.canonical || post.slug}"
  jsonLd={post.jsonLd || undefined}
/>
<!-- This example requires Tailwind CSS v2.0+ -->
<div class="relative bg-indigo-800">
	<div class="absolute inset-0">
	  <img class="lazy w-full h-full object-cover" 
	  data-src="{toLowRes(post.featured_image.thumbnail, 800)}" 
	  alt="{post.featured_image.alt}"
	  >
	  <div class="absolute inset-0 bg-indigo-800 mix-blend-multiply" aria-hidden="true"></div>
	</div>
	<div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
	  <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">{post.h1}</h1>
	  <p class="mt-6 text-xl text-indigo-100 max-w-3xl"> {post.chapocontent}</p>
	</div>
  </div>
  
  <secetion class="bg-white overflow-hidden">
	<div class="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
	  <div class="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen"></div>
	  <div class="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
		<div>
		  <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">{post.contenu[0].h2}</h2>
		  <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{post.contenu[0].h3}</h3>
		</div>
	  </div>
	  <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
		<div class="relative lg:row-start-1 lg:col-start-2">
		  <svg class="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
			<defs>
			  <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
				<rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
			  </pattern>
			</defs>
			<rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
		  </svg>
		  <div class="relative text-base mx-auto max-w-prose lg:max-w-none">
			<figure>
			{#if post.contenu[0]?.images[0]?.image_section}	
			  <div class="aspect-w-12 aspect-h-7 lg:aspect-none">
				<img class="lazy rounded-lg shadow-lg object-cover object-center" 
					alt="{post.contenu[0].images[0].alt_section}"
					data-src="{toLowRes(post.contenu[0].images[0].image_section)}" 
					width="1184" height="1376"
				>
			  </div>
			  <figcaption class="mt-3 flex text-sm text-gray-500">
				<!-- Heroicon name: solid/camera -->
				<svg class="flex-none w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				  <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
				</svg>
				<span class="ml-2">{post.contenu[0].images[0].legend_section}</span>
			  </figcaption>
			{/if}
			</figure>
		  </div>
		</div>
		<div class="mt-8 lg:mt-0">
		  <div class="text-base max-w-prose mx-auto lg:max-w-none">
			{@html marked(post.contenu[0].body)}
		  </div>
		  <div class="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1" />
		</div>
	  </div>
	</div>
  </secetion>