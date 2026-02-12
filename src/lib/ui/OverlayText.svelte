<script lang="ts">
    import { setStyle } from "$lib/map/globe";
    import { onMount } from "svelte";

    let currentMode: "dark" | "light" = $state("dark");
    let visible = $state(false);
    let subtitleVisible = $state(false);

    function toggleStyle() {
        currentMode = currentMode === "dark" ? "light" : "dark";
        setStyle(currentMode);
    }

    onMount(() => {
        // Trigger fade-in animation after component mounts
        setTimeout(() => {
            visible = true;
        }, 500);

        // Fade in subtitle 0.5s after title
        setTimeout(() => {
            subtitleVisible = true;
        }, 1000);
    });
</script>

<div class="title-container">
    <h1 class:visible>Where was this?</h1>
    <p class:visible={subtitleVisible}>
        Turn your travel photos into a cinematic video.
    </p>
</div>

<button onclick={toggleStyle}>
    Toggle to {currentMode === "dark" ? "Light" : "Dark"} Mode
</button>

<style>
    .title-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 5;
        pointer-events: none;
        max-width: 90vw;
        padding: 0 1rem;
    }

    h1 {
        font-size: clamp(2rem, 6vw, 5rem);
        font-weight: 300;
        letter-spacing: 0.02em;
        color: #ffffff;
        margin: 0 0 0.75rem 0;
        text-shadow:
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 40px rgba(255, 255, 255, 0.2),
            0 4px 20px rgba(0, 0, 0, 0.8);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.2;
        opacity: 0;
        transition: opacity 2s ease-in;
    }

    h1.visible {
        opacity: 1;
    }

    p {
        font-size: clamp(0.875rem, 2.5vw, 1.5rem);
        font-weight: 300;
        letter-spacing: 0.015em;
        color: rgba(255, 255, 255, 0.85);
        margin: 0;
        text-shadow:
            0 2px 10px rgba(0, 0, 0, 0.9),
            0 0 15px rgba(255, 255, 255, 0.15);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.5;
        opacity: 0;
        transition: opacity 2s ease-in;
    }

    p.visible {
        opacity: 1;
    }

    button {
        position: fixed;
        top: 1rem;
        right: 1rem;
        padding: 0.5rem 1rem;
        background-color: rgba(255, 255, 255, 0.9);
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        z-index: 10;
    }

    button:hover {
        background-color: rgba(255, 255, 255, 1);
    }

    @media (max-width: 768px) {
        h1 {
            font-weight: 400;
            letter-spacing: 0.01em;
            margin: 0 0 0.5rem 0;
        }

        p {
            font-weight: 400;
            letter-spacing: 0.005em;
        }
    }

    @media (max-width: 480px) {
        .title-container {
            padding: 0 0.75rem;
        }

        h1 {
            font-weight: 500;
        }
    }
</style>
