<script context="module">

	export async function load({ fetch }) {
		const res = await fetch(`articles.json`);
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
	import BlogBloc from '$lib/BlogBloc.svelte';
	import lazyload from 'vanilla-lazyload';
	import { browser } from '$app/env';
	import {onMount} from 'svelte'
	import { toLowRes } from '$lib/utils';
	export let posts;
	export let postType;
	
	let refresh;
	let lazyloadInstance;

	if (browser) {
		lazyloadInstance = new lazyload();
		window.onbeforeunload = ()=> {refresh=true; return undefined};
	}
	
	onMount(()=>lazyloadInstance.update());
	
	$: if (refresh) {
		lazyloadInstance.update();
		refresh=false
	}


</script>

<svelte:head>
	<title> Articles</title>
</svelte:head>

{#if posts.length != 0}
<div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
	<div class="absolute inset-0">
	  <div class="bg-white h-1/3 sm:h-2/3"></div>
	</div>
	<div class="relative max-w-7xl mx-auto">
	  <div class="text-center">
		<h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
		  Dans le blog
		</h2>
		<p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
		  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
		</p>
	  </div>
	  <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">

		{#each posts as post, idx}
		<BlogBloc {post} date={post.date}>
			<svelte:fragment slot="thumbnail">
				<img class="lazy h-48 w-full object-cover" data-src="{toLowRes(post.img)}"  alt="">
			</svelte:fragment>
			<svelte:fragment slot="bloglink">
				<a sveltekit:prefetch href="articles/{ post.slug }" class="block mt-2">
					<p class="text-xl font-semibold text-gray-900">
					  {post.title}
					</p>
					<p class="mt-3 text-base text-gray-500">
					  {post.h1}
					</p>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="thematique">
				<a href="#" class="hover:underline">
					{post.thematique || ""}
				</a>
			</svelte:fragment>
		</BlogBloc>
		{/each}

	</div>
</div>
</div>

{:else}
	<p>No { postType } were found.</p>
{/if}