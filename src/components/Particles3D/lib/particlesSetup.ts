import * as THREE from "three";

export type ParticleSystem = {
  instancedMesh: THREE.InstancedMesh;
  shapeGroup: THREE.Group;
  basePositions: THREE.Vector3[];
  positions: Float32Array;
  velocities: Float32Array;
  hoverIntensity: Float32Array;
  baseSizes: Float32Array;
  baseColors: THREE.Color[];
  offsetVectors: THREE.Vector3[];
  particleCount: number;
  dispose?: () => void; // added for cleanup
};

export function createParticleSystem(opts: {
  particleCount: number;
  texturePath: string;
  radius?: number;
  baseColor: THREE.ColorRepresentation;
}): ParticleSystem {
  const particleCount = opts.particleCount;
  const radius = opts.radius ?? 20;

  const icoGeo = new THREE.IcosahedronGeometry(radius, 15);
  const icoPos = icoGeo.attributes.position.array as Float32Array;

  const basePositions: THREE.Vector3[] = [];
  const positions = new Float32Array(particleCount * 3);
  const hoverIntensity = new Float32Array(particleCount);
  const baseSizes = new Float32Array(particleCount);
  const baseColors: THREE.Color[] = [];
  const velocities = new Float32Array(particleCount * 3);
  const offsetVectors: THREE.Vector3[] = [];

  const baseColor = new THREE.Color(opts.baseColor);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const vertexIndex =
      (Math.floor(Math.random() * (icoPos.length / 3)) * 3) | 0;

    const x = icoPos[vertexIndex];
    const y = icoPos[vertexIndex + 1];
    const z = icoPos[vertexIndex + 2];

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    basePositions.push(new THREE.Vector3(x, y, z));

    velocities[i3] = velocities[i3 + 1] = velocities[i3 + 2] = 0;
    hoverIntensity[i] = 0;
    baseSizes[i] = 0.5 + Math.random() * 0.5;
    baseColors.push(new THREE.Color(baseColor));

    offsetVectors.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      )
    );
  }

  const geometry = new THREE.PlaneGeometry(1, 1);
  const texture = new THREE.TextureLoader().load(opts.texturePath);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.01,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const instancedMesh = new THREE.InstancedMesh(
    geometry,
    material,
    particleCount
  );

  const dummy = new THREE.Object3D();
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
    dummy.scale.set(baseSizes[i], baseSizes[i], 1);
    dummy.updateMatrix();
    instancedMesh.setMatrixAt(i, dummy.matrix);
    instancedMesh.setColorAt(i, baseColors[i]);
  }
  instancedMesh.instanceMatrix.needsUpdate = true;
  if (instancedMesh.instanceColor)
    instancedMesh.instanceColor.needsUpdate = true;

  const shapeGroup = new THREE.Group();
  shapeGroup.add(instancedMesh);

  const dispose = () => {
    try {
      shapeGroup.remove(instancedMesh);
      geometry.dispose();
      material.dispose();
      (texture as any)?.dispose?.();
      // clear instanced attributes
      (instancedMesh.geometry as any)?.dispose?.();
      (instancedMesh.material as any)?.dispose?.();
    } catch {}
  };

  return {
    instancedMesh,
    shapeGroup,
    basePositions,
    positions,
    velocities,
    hoverIntensity,
    baseSizes,
    baseColors,
    offsetVectors,
    particleCount,
    dispose,
  };
}
