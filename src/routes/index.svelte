<script context="module">
	//export const prerender = true;
	export async function load({ fetch }) {
		const res = await fetch(`/articles.json`);
		if (res.status === 200) {
			return {
				props: {
					posts: await res.json(),
				}
			};   
		}
		if (res.status == 404) {
			return {
				status: res.status,
				error: new Error('This page does not exist')
			}
		}
		else {
			return {
				props : {posts : null},
				status: res.status,
				error: new Error(`There was an error while loading the article`)
			}
		};
	}
</script>

<script>
	import lazyload from 'vanilla-lazyload';
	import { toLowRes } from '$lib/utils';
	import marked from 'marked';
	import { onMount } from 'svelte'
	import { fade, fly } from 'svelte/transition';
	import {browser} from '$app/env';
	import IntersectionObserver from "svelte-intersection-observer";
	import Card from '$lib/Card.svelte';
	import CardWrapper from '$lib/CardWrapper.svelte';
	export let posts;

	let lazyloadInstance;
	let intersectingSkills, skillsEl;
	let intersectingPosts, postsEl;

	let refresh;
	if (browser) {
		lazyloadInstance = new lazyload();
		window.onbeforeunload = ()=> {refresh=true; return undefined};
	}
	
	$: if (refresh || !!intersectingPosts) {
		lazyloadInstance.update();
		refresh=false
	}
	
	onMount(()=>lazyloadInstance.update());

	let skills = [
		{
			iconPath : ["M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"],
			description : "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi vitae lobortis.",
			titre : "Rédactionnel optimisé"
		},
		{
			iconPath : ["M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"],
			description : "Qui aut temporibus nesciunt vitae dicta repellat sit dolores pariatur. Temporibus qui illum aut.",
			titre : "Sémantisation HTML"
		},
		{
			iconPath : ["M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"],
			description : "Rerum quas incidunt deleniti quaerat suscipit mollitia. Amet repellendus ut odit dolores qui.",
			titre : "Cocon Sémantique"
		},
		{
			iconPath : ["M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"],
			description : "Ullam laboriosam est voluptatem maxime ut mollitia commodi. Et dignissimos suscipit perspiciatis.",
			titre : "Personnalisation des résultats"
		},
		{
			iconPath : [
				"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
				"M15 12a3 3 0 11-6 0 3 3 0 016 0z"
			],
			description : "Ab a facere voluptatem in quia corrupti veritatis aliquam. Veritatis labore quaerat ipsum quaerat id.",
			titre : "Métadonnées"
		},
		{
			iconPath : ["M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"],
			description : "Quia qui et est officia cupiditate qui consectetur. Ratione similique et impedit ea ipsum et.",
			titre : "Schema"
		}
	]

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<!--  
  This example requires some changes to your config:
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
-->
<div class="bg-white">
	<div class="relative overflow-hidden">
	  
	  <main>
		<div class="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
		  <div class="mx-auto max-w-7xl lg:px-8">
			<div class="lg:grid lg:grid-cols-2 lg:gap-8">
			  <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
				<div class="lg:py-24">
				  <a href="/" class="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200">
					<span class="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full">Dorothée Redval</span>
					<span class="ml-4 text-sm">06 88 88 88 88</span>
					<!-- Heroicon name: solid/chevron-right -->
					<svg class="ml-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
					</svg>
				  </a>
				  <h1 class="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
					<span class="block">Rédaction<br>WEB et SEO</span>
					<!-- <span class="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5">ship web apps</span>-->
				  </h1>
				  <p class="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
					Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.
				  </p>
				  <div class="mt-10 sm:mt-12">
					<form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0">
					  <div class="sm:flex">
						<div class="min-w-0 flex-1">
						  <label for="email" class="sr-only">Email address</label>
						  <input id="email" type="email" placeholder="Votre email" class="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900">
						</div>
						<div class="mt-3 sm:mt-0 sm:ml-3">
						  <button type="submit" class="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900">Abonnez-vous à ma newsletter</button>
						</div>
					  </div>
					  <p class="mt-3 text-sm text-gray-300 sm:mt-4">Abonnez-vous à ma newsletter et recevez régulièrement mes derniers articles traitant aussi bien de la rédaction web optimisée pour le SEO que des contenus généralistes<a href="/" class="font-medium text-white">Conditions d'utilisation</a>.</p>
					</form>
				  </div>
				</div>
			  </div>
			  <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
				<div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
				  <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
				  <img class="lazy w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none" data-src="img/writing.svg" alt="">
				</div>
			  </div>
			</div>
		  </div>
		</div>
  
		<!-- Feature section with screenshot -->
		<div class="relative bg-gray-50 pt-16 sm:pt-24 lg:pt-32">
		  <div class="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
			<div>
			  <h2 class="text-base font-semibold tracking-wider text-cyan-600 uppercase">Référencement</h2>
			  <p class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
				Comment bien référencer son site en {new Date().getFullYear()} ?
			  </p>
			  <p class="mt-5 max-w-prose mx-auto text-xl text-gray-500">
				Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend condimentum id viverra nulla.
			  </p>
			</div>
			<div class="mt-12 -mb-10 sm:-mb-24 lg:-mb-80">
			  <img class="lazy rounded-lg shadow-xl ring-1 ring-black ring-opacity-5" data-src="img/seo-illustration.jpg" alt="">
			</div>
		  </div>
		</div>
  
		<!-- Feature section with grid -->
		<div class="relative bg-white py-16 sm:py-24 lg:py-32">
		  <div class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
			<h2 class="text-base font-semibold tracking-wider text-cyan-600 uppercase">Comment obtenir un bon score sur google et bing</h2>
			<p class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
			  Les bonnes pratiques du rédactionnel SEO
			</p>
			<p class="mt-5 max-w-prose mx-auto text-xl text-gray-500">
				Référencement, optimisation, pagerank, tout ce dont vous avez besoin pour que Google soit vraiment votre ami
			</p>
			<div class="mt-12">
			
			<IntersectionObserver element={skillsEl} bind:intersecting={intersectingSkills}>	
			  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" bind:this={skillsEl}>
				{#each skills as skill, idx}
				{#if intersectingSkills}
				<div class="pt-6" transition:fade={{duration : 500, delay : idx * 100}}>
				  <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8">
					<div class="-mt-6">
					  <div>
						<span class="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-md shadow-lg">
						  <!-- Heroicon name: outline/cloud-upload -->
						  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="#333" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							{#each skill.iconPath as d}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
							d={d} />
							{/each}
						  </svg>
						</span>
					  </div>
					  <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">{skill.titre}</h3>
					  <p class="mt-5 text-base text-gray-500">
						{skill.description}
					  </p>
					</div>
				  </div>
				</div>
				{/if}
				{/each}
			  </div>
			</IntersectionObserver>

			</div>
		  </div>
		</div>

		{#if posts.length != 0}
		<div class="relative -mt-32">
			<CardWrapper >
				{#each posts as post, idx}
				{#if idx <= 3}
				<div transition:fly={{y:500, delay : 500 + (idx * 100)}}>
				<Card date={post.date}>
					<svelte:fragment slot="thumbnail">
						<img class="lazy h-48 w-full object-cover" data-src="{toLowRes(post.img)}"  alt="">
					</svelte:fragment>
					<svelte:fragment slot="bloglink">
						<a sveltekit:prefetch href="articles/{ post.slug }" class="block mt-2">
							<p class="text-xl font-semibold text-gray-900">
							{post.title}
							</p>
							<p class="mt-3 text-base text-gray-500">
							{@html marked(post.chapo)}
							</p>
						</a>
					</svelte:fragment>
					<svelte:fragment slot="thematique">
						<a href="/articles?thematique={post.thematique}" class="hover:underline">
							{post.thematique || ""}
						</a>
					</svelte:fragment>
				</Card>
				</div>
				{/if}
				{/each}
			</CardWrapper>
		</div>
		{/if}

		<!-- Testimonial section -->

		<div class="pb-16 bg-gradient-to-r from-teal-500 to-cyan-600 lg:pb-0 lg:z-10 lg:relative">
		  <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
			<div class="relative lg:-my-8">
			  <!-- <div aria-hidden="true" class="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden"></div> -->
			  <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
				<div class="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
				  <img class="lazy object-cover lg:h-full lg:w-full" data-src="img/do.jpg" alt="">
				</div>
			  </div>
			</div>
			<div class="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
			  <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
				<blockquote>
				  <div>
					<svg class="h-12 w-12 text-white opacity-25" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
					  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
					</svg>
					<!--
					<p class="mt-6 text-2xl font-medium text-white">
					  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit.
					</p>
					-->
				  </div>
				  <footer class="mt-6">
					<p class="text-base font-bold text-indigo-800">Dorothée Redval</p>
					<p class="text-base font-medium text-cyan-100">Rédactrice Web et SEO en Île de France</p>
				  </footer>
				</blockquote>
			  </div>
			</div>
		  </div>
		</div>
		<!-- BLOG SECTION -->
	  </main>
	</div>
  </div>