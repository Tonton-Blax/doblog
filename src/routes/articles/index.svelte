<script context="module">

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
	import { page } from '$app/stores';	
	import { goto, invalidate } from '$app/navigation';
	import Card from '$lib/Card.svelte';
	import CardWrapper from '$lib/CardWrapper.svelte';
	import lazyload from 'vanilla-lazyload';
	import { browser } from '$app/env';
	import {onMount} from 'svelte'
	import { toLowRes } from '$lib/utils';
	import marked from 'marked';
	export let posts;
	import { fly } from 'svelte/transition';
	export let postType;
	
	let refresh;
	let lazyloadInstance;
	let k=0;

	if (browser) {
		lazyloadInstance = new lazyload();
		window.onbeforeunload = ()=> {
			refresh=true;
			return undefined
		};
	}

	onMount(()=>{
		lazyloadInstance.update()});
	
	$: if (refresh) {
		lazyloadInstance.update();
		refresh=false
	}

	const refreshPage = async (href) => {
		console.log(posts);
		await invalidate('articles.json')
		await goto('/articles');
	}


</script>

<svelte:head>
	<title> Articles</title>
	<meta name="description" content="Articles dédiés aux SEO, mais pas que"> <!-- Meta Description -->
	<link rel="canonical" href="https://{$page.host}/articles" />
</svelte:head>

{#if posts.length != 0}
	
	<CardWrapper>
		{#each posts as post, idx}
		{#if post.chapo}
		<div transition:fly={{y:500, delay : idx * 100}}>
		<Card date={post.date}>
			<svelte:fragment slot="thumbnail">
				<img class="lazy h-48 w-full object-cover" data-src="{toLowRes(post.img || "")}"  alt="">
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
				<a href="/articles?thematique={post.thematique}" class="hover:underline" on:click|preventDefault={refreshPage(`/articles/?thematique=${ post.thematique }`)}>
					{post.thematique || ""}
				</a>
			</svelte:fragment>
		</Card>
		</div>
		{/if}
		{/each}
	</CardWrapper>
{:else}
	<p>No { postType } were found.</p>
{/if}