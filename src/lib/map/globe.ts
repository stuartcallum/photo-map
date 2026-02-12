import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
let map: mapboxgl.Map | null = null;
let spinInterval: number | null = null;
let userInteracting = false;

export function initGlobe(container: HTMLElement) {
  map = new mapboxgl.Map({
    container,
    style: "mapbox://styles/stuartcallum/cmknj8zjo007001sr0fmm1urq", // initial style
    projection: "globe",
    center: [0, 20],
    zoom: 1.5,
  });

  // Set up user interaction listeners
  map.on("mousedown", () => {
    userInteracting = true;
  });
  map.on("mouseup", () => {
    userInteracting = false;
  });
  map.on("dragend", () => {
    userInteracting = false;
  });
  map.on("pitchend", () => {
    userInteracting = false;
  });
  map.on("rotateend", () => {
    userInteracting = false;
  });

  spinGlobe(true);
  return map;
}

export function setStyle(mode: "dark" | "light") {
  if (!map) return;

  if (mode === "light") {
    map.setStyle("mapbox://styles/stuartcallum/cmkzdd1s7003501sr2gbsd0or");
    // map.setStyle("mapbox://styles/mapbox/standard-satellite");
  } else {
    map.setStyle("mapbox://styles/stuartcallum/cmknj8zjo007001sr0fmm1urq");
  }
}

export function spinGlobe(shouldSpin: boolean) {
  if (!map) return;

  if (shouldSpin) {
    // Clear any existing interval
    if (spinInterval !== null) {
      clearInterval(spinInterval);
    }

    const secondsPerRevolution = 120;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    function spinGlobeAnimation() {
      if (!map || userInteracting) return;

      const zoom = map.getZoom();
      if (zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    spinInterval = window.setInterval(spinGlobeAnimation, 1000);
  } else {
    // Stop spinning
    if (spinInterval !== null) {
      clearInterval(spinInterval);
      spinInterval = null;
    }
  }
}
