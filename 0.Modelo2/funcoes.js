// Variaveis Globais

var camera, scene, renderer, container;

//

var conjunto, dodecaedro, plano, torus;

function initial() {
	//1.

	container = document.querySelector("#mycanvas");

	//2.

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

	// Auxiliar para eixos
	var axes = new THREE.AxesHelper(20);
	scene.add(axes);

	//3.

	camera = new THREE.PerspectiveCamera(
		45,
		container.clientWidth / container.clientHeight,
		0.1,
		1000
	);
	camera.position.set(0, 0, 20);
	camera.lookAt(0, 0, 0);

	//4. Criar Objectos

	createToys();

	//5. Luz necessario se material != basic

	var light = new THREE.SpotLight(0xffffff, 4);
	light.position.set(0, 0, 30);
	scene.add(light);

	//6. Renderizador

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(container.clientWidth, container.clientHeight);
	container.append(renderer.domElement);

	// Movimentos
	controls = new THREE.OrbitControls (camera, renderer.domElement);

	//Backgound
	const loader = new THREE.TextureLoader();
	const bgTexture = loader.load('img/earth_specular_2048.jpg');
	scene.background = bgTexture;

	// FPS
	fps();
		
	// Renderizacao
	animate();
}

/* Para construir Objectos, é necessário:
 * Geometria
 * Material
 * Mesh 'er
 */
function createToys() {
	var mat = new THREE.LineBasicMaterial({ color: "white" });

	var geoPlano = new THREE.PlaneGeometry(7, 7);
	var matPlano = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/uab.jpg'), side: THREE.DoubleSide });
	plano = new THREE.Mesh(geoPlano, matPlano);
	// plano.position.set(0,0,0);
	scene.add(plano);

	var geoDode = new THREE.DodecahedronBufferGeometry(2.5);
	var matDode = new THREE.MeshBasicMaterial({ color: "purple" });
	dodecaedro = new THREE.Mesh(geoDode, matDode);
	// dodecaedro.position.set(0,0,0);
	var geoDodeEdge = new THREE.EdgesGeometry(dodecaedro.geometry);
	var wireframe = new THREE.LineSegments(geoDodeEdge, mat);
	dodecaedro.add(wireframe);
	scene.add(dodecaedro);

	var geoTorus = new THREE.TorusKnotBufferGeometry(5, 1.5);
	var matTorus = new THREE.MeshBasicMaterial({ color: "red" });
	torus = new THREE.Mesh(geoTorus, matTorus);
	var geoTorusEdge = new THREE.EdgesGeometry(torus.geometry);
	var wireframe = new THREE.LineSegments(geoTorusEdge, mat);
	torus.add(wireframe);
	torus.position.set(-10, 0, -10);
	scene.add(torus);
}

function animate() {
	requestAnimationFrame(animate);

	var conjunto = [dodecaedro, plano];

	conjunto.forEach(element => {
		element.rotation.x += 0.008;
		element.rotation.y += 0.008;
	});

	renderer.render(scene, camera);
}

// Recorte

// document.getElementById("clipping").onclick =  recort();

var planos = [
	new THREE.Vector3(1, 0, 0),
	new THREE.Vector3(0, 1, 0),
	new THREE.Vector3(0, 0, 1),
	new THREE.Vector3(0, 0, 0)
];
var op = 0;

function recort() {
	// Clipping Plane

	var localPlane = new THREE.Plane(planos[op], 1);
	renderer.clippingPlanes = [localPlane];

	op++;
	op %= 4;   // op = op%4
}


// Resize

function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight; // aspect ratio
    camera.updateProjectionMatrix();

    renderer.setSize(  container.clientWidth, container.clientHeight );

}

window.addEventListener('resize', onWindowResize, false);

//FPS

function fps(){
	var script=document.createElement('script');
	script.onload=function(){
		var stats=new Stats();
		document.body.appendChild(stats.dom);
		requestAnimationFrame(function loop(){
			stats.update();
			requestAnimationFrame(loop)
			});
		};
		script.src='js/stats.js';
		document.head.appendChild(script);
}