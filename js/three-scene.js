/* ==========================================================================
   ASAD RAZA PORTFOLIO — THREE.JS 3D BACKGROUND v2.0
   Interactive 3D Geometric Nodes, Starfield Particles & Scroll Color Shift
   ========================================================================== */

(function initThreeScene() {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  let scene, camera, renderer;
  let particlesMesh, geometryGroup;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  function init() {
    // 1. Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060a13, 0.0013);

    // 2. Camera setup
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 400;

    // 3. Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 4. Create Geometry Cloud Group (5 Floating Shapes)
    geometryGroup = new THREE.Group();

    // Gold Icosahedron Wireframe
    const icoGeo = new THREE.IcosahedronGeometry(60, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xf0c45a,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(-150, 80, -100);
    geometryGroup.add(icoMesh);

    // Blue Torus Knot
    const torusGeo = new THREE.TorusKnotGeometry(45, 12, 100, 16);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(180, -100, -150);
    geometryGroup.add(torusMesh);

    // Violet Octahedron
    const octGeo = new THREE.OctahedronGeometry(50, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    octMesh.position.set(220, 150, -200);
    geometryGroup.add(octMesh);

    // NEW: Rose Dodecahedron (back-right)
    const dodecGeo = new THREE.DodecahedronGeometry(40, 0);
    const dodecMat = new THREE.MeshBasicMaterial({
      color: 0xfb7185,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const dodecMesh = new THREE.Mesh(dodecGeo, dodecMat);
    dodecMesh.position.set(-220, -160, -250);
    geometryGroup.add(dodecMesh);

    // NEW: Emerald Ring/Torus (mid-left)
    const ringGeo = new THREE.TorusGeometry(35, 8, 16, 50);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(50, 200, -180);
    ringMesh.rotation.x = Math.PI * 0.4;
    geometryGroup.add(ringMesh);

    scene.add(geometryGroup);

    // 5. Starfield Particles (Increased count)
    const particlesCount = 1200;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    const goldColor = new THREE.Color(0xf0c45a);
    const blueColor = new THREE.Color(0x3b82f6);
    const violetColor = new THREE.Color(0xa78bfa);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 1400;
      posArray[i + 1] = (Math.random() - 0.5) * 1400;
      posArray[i + 2] = (Math.random() - 0.5) * 1400;

      const rand = Math.random();
      const mixedColor = rand > 0.66 ? goldColor : rand > 0.33 ? blueColor : violetColor;
      colorArray[i] = mixedColor.r;
      colorArray[i + 1] = mixedColor.g;
      colorArray[i + 2] = mixedColor.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // 6. Listeners
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);

    // 7. Start Loop
    animate();
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.5;
    mouseY = (event.clientY - windowHalfY) * 0.5;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Rotate geometries subtly with varied speeds
    if (geometryGroup) {
      geometryGroup.rotation.y += 0.002;
      geometryGroup.rotation.x += 0.001;

      // Individual floating motions
      geometryGroup.children.forEach((mesh, i) => {
        mesh.rotation.y += 0.003 + i * 0.0008;
        mesh.rotation.x += 0.002 + i * 0.0005;
        mesh.position.y += Math.sin(time + i * 1.5) * 0.08;
      });
    }

    if (particlesMesh) {
      particlesMesh.rotation.y -= 0.0006;
      
      // Particle size pulsing
      particlesMesh.material.size = 2.5 + Math.sin(time * 0.5) * 0.6;
    }

    // Scroll-based color shift for the icosahedron
    const scrollPercent = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
    if (geometryGroup && geometryGroup.children[0]) {
      const hue = (30 + scrollPercent * 200) / 360;
      geometryGroup.children[0].material.color.setHSL(hue, 0.7, 0.55);
    }

    // Parallax camera movement
    camera.position.x += (targetX * 0.3 - camera.position.x) * 0.05;
    camera.position.y += (-targetY * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  // Defer init until main thread is idle
  if (window.requestIdleCallback) {
    window.requestIdleCallback(init);
  } else {
    setTimeout(init, 200);
  }
})();
