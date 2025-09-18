import * as THREE from "three";

/** Create a basic scene, camera and renderer, with resize & dispose helpers. */
export function createSceneSetup(container: HTMLElement) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("#3e3f7e", 40, 80);

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 49;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  function resizeToContainer() {
    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height || 1;
    camera.updateProjectionMatrix();
  }

  function disposeRenderer() {
    // remove canvas
    const canvas = renderer.domElement;
    if (canvas?.parentElement) canvas.parentElement.removeChild(canvas);
    // try to lose GL context
    try {
      const gl: any =
        (renderer as any).getContext?.() ||
        (renderer as any).domElement?.getContext?.("webgl");
      const ext = gl?.getExtension?.("WEBGL_lose_context");
      ext?.loseContext?.();
    } catch {}
    try {
      (renderer as any).forceContextLoss?.();
    } catch {}
    // dispose three renderer
    renderer.dispose();
  }

  return { scene, camera, renderer, resizeToContainer, disposeRenderer };
}
