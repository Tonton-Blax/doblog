<script>
    export let contenu;
</script>
{#if !!contenu}
<div class="relative text-base mx-auto max-w-prose lg:max-w-none">
    <figure>
    {#if contenu.images[0]?.image_section}	
    <div class="aspect-w-12 aspect-h-7 lg:aspect-none">
        <slot name="imageslot"></slot>
    </div>
    <figcaption class="mt-3 flex text-sm text-gray-500">
        <!-- Heroicon name: solid/camera -->
        <svg class="flex-none w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
        <span class="ml-2">{contenu.images[0].legend_section}</span>
    </figcaption>
    {/if}
    </figure>
  </div>
{/if}