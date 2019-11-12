// Variaveis Globais 

var scene;          //representa um container onde vai ser colocado todos os objetos que queremos renderizar.
var camera;         //representa o campo de visão da cena.
var renderer;       //será nosso renderizador dos objetos contidos na cena.
var container;      //referencia ao elemento que apresentara a scene


// Variaveis Globais para este Projecto

var torus1, torus1w;
var dodecaedrow;
var plano;
var recorte;

function init(){

    //1. referencia ao elemento que apresentara a scene

    container = document.querySelector('#scene-container'); 

    //2. Criar a Cena e definir plano de fundo
    scene = new THREE.Scene();
    scene.backgroud = new THREE.Color(0x000000);

    //3. Campo Visao da Cena
    criarCamera();

    //4. Criar Objectos antes de rendererizar cena.
    var dodecaedro = criardodecaedro();
    scene.add( dodecaedro );
    criardodecaedrow();
    criarPlano();

    criarTorus1();
    criarTorus1w();
    
    //5.  Adicionar Luz
    adicionarLuz();

    //6. Renderizador
    renderizador();

    // Auxiliar para eixos
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    animate();

}

    //3. Campo Visao da Cena
function criarCamera(){

        //3.1 Criar Camera
        var fov = 45;   // angulo (fiel of view)
        var aspect = container.clientWidth / container.clientHeight; // aspect ratio
        var near = 0.1; // plano de corte proximo 
        var far = 1000;  // plano de corte afastado
    
        camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    


        //3.2 Posicionar camera
        camera.position.set(00,00,20);
        camera.lookAt(0,0,0);

       

}

//4. Criar Objectos antes de rendererizar cena.

function criardodecaedro(){
    var geometry = new THREE.DodecahedronBufferGeometry( 2 ); 
    var material = new THREE.MeshBasicMaterial( { color: 0xCC3299, wireframe: false } ); 
    dodecaedro = new THREE.Mesh( geometry, material );
    dodecaedro.position.set(0,0,0);
    return dodecaedro;
    

}

function criardodecaedrow(){  
    var geometry = new THREE.DodecahedronBufferGeometry( 2 ); 
    var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } );
    dodecaedrow = new THREE.Mesh( geometry, material );
    dodecaedrow.position.set( 0, 0, 0);
    scene.add( dodecaedrow );
    
}

// Plano
function criarPlano(){

    var geometry = new THREE.PlaneGeometry(5, 5);       
    var material = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    plano = new THREE.Mesh(geometry, material);       
    plano.position.set(0,0,0);
    scene.add( plano );
;}


/* TorusBufferGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
 https://threejs.org/docs/#api/en/geometries/TorusGeometry
 radius - Radius of the torus, from the center of the torus to the center of the tube. Default is 1.
        tube — Radius of the tube. Default is 0.4.
        radialSegments — Default is 8
        tubularSegments — Default is 6.
        arc — Central angle. Default is Math.PI * 2. */

/* https://threejs.org/docs/#api/en/geometries/TorusKnotBufferGeometry

TorusKnotBufferGeometry(radius : Float, tube : Float, tubularSegments : Integer, radialSegments : Integer, p : Integer, q : Integer)
        radius - Radius of the torus. Default is 1.
        tube — Radius of the tube. Default is 0.4.
        tubularSegments — Default is 64.
        radialSegments — Default is 8.
        p — This value determines, how many times the geometry winds around its axis of rotational symmetry. Default is 2.
        q — This value determines, how many times the geometry winds around a circle in the interior of the torus. Default is 3.


*/

function criarTorus1(){
    var geometry = new THREE.TorusKnotBufferGeometry(3, 0.9, 128, 16 );
    var material = new THREE.MeshBasicMaterial({color: 0xFF0000});
    var torus1 = new THREE.Mesh (geometry,material);
    torus1.position.set(-5,0,-5);
/*    torus1.rotation.x = Math.PI/6;
    torus1.rotation.y = -Math.PI/8;
    torus1.rotation.z = -Math.PI/2;     */
    scene.add(torus1);
}

function criarTorus1w(){
    var geometry = new THREE.TorusKnotBufferGeometry(3, 0.9, 128, 16);
    var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
    var torus1w = new THREE.Mesh (geometry,material);
    torus1w.position.set(-5,0,-5);
/*    torus1w.rotation.x = Math.PI/6;
    torus1w.rotation.y = -Math.PI/8;
    torus1w.rotation.z = -Math.PI/2;    */
    scene.add(torus1w);
}




//5.  Adicionar Luz
function adicionarLuz(){
    var light = new THREE.SpotLight(0xFFFFFF, 4);
    light.position.set( 0, 0, 50 );
    scene.add( light );
}

//6. Renderizador
function renderizador(){
    //6.1 Criar um WebGLRenderer
    renderer = new THREE.WebGLRenderer({ antialias: true });

    //6.2 Definir dimensao
    renderer.setSize( container.clientWidth, container.clientHeight );

    //6.3 definir proporção correta de pixels para o dispositivo em que está sendo executado
    renderer.setPixelRatio(window.devicePixelRatio);
    
    //6.4 Adicionar Canvas Element à pagina
    container.append(renderer.domElement); 
   
}



function animate() {


    //animacao recursiva
    requestAnimationFrame( animate );

    var conjunto = [dodecaedro, dodecaedrow,plano];
   

    for(i=0;i<conjunto.length;i++){
        conjunto[i].rotation.x += 0.005;
        conjunto[i].rotation.y += 0.005;
    }

    renderer.render( scene, camera );
};


function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight; // aspect ratio
    camera.updateProjectionMatrix();

    renderer.setSize(  container.clientWidth, container.clientHeight );

}

window.addEventListener('resize', onWindowResize, false);





// https://threejs.org/examples/#webgl_clipping

document.getElementById("clipping").onclick = function() {
    
    //recortar na horizontal
    if(recorte == 1) {
        var clippingPlane = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 1 );        
        recorte = 2;
    }

    //recortar na vertical
    else{        
        var clippingPlane = new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 1 );       
        recorte = 1;
    }

    renderer.clippingPlanes = [ clippingPlane ];
    renderer.localClippingEnabled = true;
}

/*
document.getElementById("reset").onclick = function() {
    
     var clippingPlane = new THREE.Plane( new THREE.Vector3( 0, 0, 0 ) );
    renderer.clippingPlanes = [ clippingPlane ];
    renderer.localClippingEnabled = false;
    recorte = 1;
}*/


// Alterna Camera

var cam  = eval(document.getElementById("cam").value);
document.getElementById("cam").onclick = function() {
console.log(cam);
   if(cam==1){
    camera.position.set(10,0,20);
    camera.lookAt(0,0,0);
    cam=2;
   }
   else {
       switch (cam) {
         case 2:
           camera.position.set(20, 0, 20);
           camera.lookAt(0, 0, 0);
           cam++;
           break;
         case 3:
           camera.position.set(30, 0, 20);
           camera.lookAt(0, 0, 0);
           cam++;
           break;
         case 4:
           camera.position.set(-30, 20, 20);
           camera.lookAt(0, 0, 0);
           cam++;
           break;
         case 5:
           camera.position.set(-20, 20, 20);
           camera.lookAt(0, 0, 0);
           cam++;
           break;
         default:
           camera.position.set(0, 0, 20);
           camera.lookAt(0, 0, 0);
           cam = 1;
       }
   }
    

}



init();