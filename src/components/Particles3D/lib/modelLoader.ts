import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

/**
 * Original API (kept for compatibility).
 */
export function loadModelPoints(
  url: string,
  particleCount: number,
  scale = 1,
  offset = new THREE.Vector3(0, 0, 0)
): Promise<THREE.Vector3[]> {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        try {
          resolve(extractPoints(gltf.scene, particleCount, scale, offset));
        } catch (e) {
          reject(e);
        }
      },
      undefined,
      (err) => reject(err)
    );
  });
}

/**
 * Cancellable variant (preferred in React components).
 * Returns { promise, abort } — abort prevents resolving after unmount.
 */
export function loadModelPointsCancellable(
  url: string,
  particleCount: number,
  scale = 1,
  offset = new THREE.Vector3(0, 0, 0)
): { promise: Promise<THREE.Vector3[]>; abort: () => void } {
  let cancelled = false;
  const promise = new Promise<THREE.Vector3[]>((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        if (cancelled) return;
        try {
          resolve(extractPoints(gltf.scene, particleCount, scale, offset));
        } catch (e) {
          reject(e);
        }
      },
      undefined,
      (err) => {
        if (cancelled) return;
        reject(err);
      }
    );
  });
  return {
    promise,
    abort: () => {
      cancelled = true;
    },
  };
}

function extractPoints(
  root: THREE.Object3D,
  particleCount: number,
  scale = 1,
  offset = new THREE.Vector3(0, 0, 0)
): THREE.Vector3[] {
  const allVerts: number[] = [];
  root.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const posAttr = (mesh.geometry as THREE.BufferGeometry).attributes
        .position;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < arr.length; i++) allVerts.push(arr[i]);
    }
  });

  if (allVerts.length === 0) {
    throw new Error("No vertex positions found in model");
  }

  const pts: THREE.Vector3[] = [];
  const vertexCount = allVerts.length / 3;
  for (let i = 0; i < particleCount; i++) {
    const vi = ((i % vertexCount) * 3) | 0;
    pts.push(
      new THREE.Vector3(
        allVerts[vi] * scale + offset.x,
        allVerts[vi + 1] * scale + offset.y,
        allVerts[vi + 2] * scale + offset.z
      )
    );
  }
  return pts;
}
