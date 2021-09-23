<script context="module">

	export async function load({ page, fetch }) {
		const { postType } = page.params;
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
				status: res.status,
				error: new Error(`There was an error while loading the ${ postType }`)
			}
		};
	}
</script>

<script>
	export let posts;
	export let postType;
</script>

<svelte:head>
	<title> TEST</title>
</svelte:head>

<h1 class="text-2xl">ARTICLES</h1>
{JSON.stringify(posts, null,2)}
{#if posts.length != 0}
	<ul>
		{#each posts as post}
			<li>
				<a sveltekit:prefetch
				   class="text-blue-600 underline"
				   href="articles/{ post.slug }"
				   >{ post.title }</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No { postType } were found.</p>
{/if}