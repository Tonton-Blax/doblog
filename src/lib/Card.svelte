<script>
	export let date;
	export let auteur = "Dorothée Redval"
</script>

<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
	<div class="flex-shrink-0">
	<slot name="thumbnail"></slot>
	</div>
	<div class="flex-1 bg-white p-6 flex flex-col justify-between">
	<div class="flex-1">
		<p class="text-sm font-medium text-indigo-600">
		<slot name="thematique"></slot>
		</p>
		<slot name="bloglink"></slot>
	</div>
	<div class="mt-6 flex items-center">
		<div class="flex-shrink-0">
			<span class="sr-only">Dorothée Redval</span>
			<img class="h-10 w-10 rounded-full" src="/img/minido.jpg" alt="">
		</div>
		<div class="ml-3">
		<p class="text-sm font-medium text-gray-900">
			{auteur}
		</p>
		<div class="flex space-x-1 text-sm text-gray-500">
			<time datetime="2020-02-12">
			{date && new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
			</time>
			<span aria-hidden="true">
			&middot;
			</span>
		</div>
		</div>
	</div>
	</div>
</div>