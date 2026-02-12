<script lang="ts">
    import { onMount } from "svelte";
    import { initGlobe } from "$lib/map/globe";
    import OverlayText from "$lib/ui/OverlayText.svelte";

    let container: HTMLElement;

    onMount(() => {
        const map = initGlobe(container);
        // startSpin();
        // plotPhotos(photoStore);
    });
</script>

<div bind:this={container} class="map"></div>
<OverlayText />

<style>
    .map {
        position: fixed;
        inset: 0;
    }
</style>
