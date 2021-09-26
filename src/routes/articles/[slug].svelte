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
	import ContentImage from '$lib/ContentImage.svelte'
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
	  <p class="mt-6 text-xl text-indigo-100 max-w-3xl"> {@html marked(post.chapocontent)}</p>
	</div>
  </div>	
  
  {#each post.contenu as contenu, idx}
  <section class="bg-white overflow-hidden">
	<div class="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
	  <div class="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen"></div>
	  <div class="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
		<div>
		  <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">{contenu.h2}</h2>
		  <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{contenu.h3}</h3>
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
		  {#if idx % 2 === 0}
			<ContentImage {contenu}>
				<svelte:fragment slot="imageslot">
				<img class="lazy rounded-lg shadow-lg object-cover object-center" 
					alt="{contenu.images[0].alt_section}"
					data-src="{toLowRes(contenu.images[0].image_section)}" 
					width="1184" height="1376"
				>	
				</svelte:fragment>
			</ContentImage>
		  {:else}
			<div class="prose text-base max-w-prose mx-auto lg:max-w-none">
				{@html marked(contenu.body)}
			</div>
		  {/if}
		  
		</div>

		<div class="mt-8 lg:mt-0">
			{#if idx % 2 !== 0}
			<ContentImage {contenu}>
				<svelte:fragment slot="imageslot">
				<img class="lazy rounded-lg shadow-lg object-cover object-center" 
					alt="{contenu.images[0].alt_section}"
					data-src="{toLowRes(contenu.images[0].image_section)}" 
					width="1184" height="1376"
				>	
				</svelte:fragment>
			</ContentImage>
		  {:else}
			<div class="prose text-base max-w-prose mx-auto lg:max-w-none">
				{@html marked(contenu.body)}
			</div>
		  {/if}
		  <div class="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1" />
		</div>
	  </div>
	</div>
</section>
{/each}