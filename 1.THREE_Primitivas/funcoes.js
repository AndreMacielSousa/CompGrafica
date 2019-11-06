// Variaveis Globais 

var scene;          //representa um container onde vai ser colocado todos os objetos que queremos renderizar.
var camera;         //representa o campo de visão da cena.
var renderer;       //será nosso renderizador dos objetos contidos na cena.
var container;      //referencia ao elemento que apresentara a scene


// Variaveis Globais para este Projecto

var cube, cube2;
var dodecaedro, dodecaedro2;
var cone, cone2;
var linhaTopo, linhaDiag, linhaBaixo;


// Instaciamento dos elementos

function init(){

    //1. referencia ao elemento que apresentara a scene
    container = document.querySelector( '#scene-container' );     //console.log(container);

    //2. Criar a Cena e definir plano de fundo
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

    //3. Campo Visao da Cena
    criarCamera();

    //4. Criar Objectos antes de rendererizar cena.

    criarcube();
    criarcube2();
    criardodecaedro();
    criardodecaedro2();
    criarcone();
    criarcone2();
    criarlinhaTopo();
    criarlinhaDiag();
    criarlinhaBaixo();

    loaderFont();           //textos
    

    //5.  Adicionar Luz
    adicionarLuz();

    //6. Renderizador
    renderizador();

    // Auxiliar para eixos
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);
    
    animar();
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
    camera.position.set(0,0,50);
    camera.lookAt(0,0,0);
}

//4. Criar Objectos para a Cena

// Cubos

function criarcube(){
    var geometry = new THREE.BoxBufferGeometry( 6, 6, 6 ); 
    var material = new THREE.MeshBasicMaterial( { color: 0x00FF00, wireframe: false } ); 
    cube = new THREE.Mesh( geometry, material );
    cube.position.set(10,0,0);
    scene.add( cube );
}


function criarcube2(){
    var geometry = new THREE.BoxBufferGeometry( 6, 6, 6 ); 
    var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } );
    cube2 = new THREE.Mesh( geometry, material );
    cube2.position.set( 10, 0, 0);
    scene.add( cube2 );
}

// Cones

function criarcone(){
    var geometry = new THREE.ConeBufferGeometry( 6, 6, 10 ); 
    var material = new THREE.MeshBasicMaterial( { color: 0xCC3299, wireframe: false } ); 
    dodecaedro = new THREE.Mesh( geometry, material );
    dodecaedro.position.set(-8,0,0);
    scene.add( dodecaedro );

}

function criarcone2(){
    var geometry = new THREE.ConeBufferGeometry( 6, 6, 10 ); 
    var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } );
    dodecaedro2 = new THREE.Mesh( geometry, material );
    dodecaedro2.position.set( -8, 0, 0);
    scene.add( dodecaedro2 );
}

//dodecaedros

function criardodecaedro(){
    var geometry = new THREE.DodecahedronBufferGeometry( 2 ); 
    var material = new THREE.MeshBasicMaterial( { color: 0xFF7F00, wireframe: false } ); 
    cone = new THREE.Mesh( geometry, material );
    cone.position.set(-17,-10,0);
    scene.add( cone );

}

function criardodecaedro2(){
    var geometry = new THREE.DodecahedronBufferGeometry( 2 ); 
    var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } );
    cone2 = new THREE.Mesh( geometry, material );
    cone2.position.set( -17, -10, 0);
    scene.add( cone2 );

}


// Linhas

function criarlinhaTopo(){

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { color: 0xFF0000 } );
    geometry.vertices.push(new THREE.Vector3( -20, 20, 0) );
    geometry.vertices.push(new THREE.Vector3(  20, 20, 0) );
    linhaTopo = new THREE.Line(geometry, material);
    scene.add(linhaTopo);
}

function criarlinhaDiag(){

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { color: 0x0000FF } );
    geometry.vertices.push(new THREE.Vector3(  20, 20, 0) );
    geometry.vertices.push(new THREE.Vector3(  -20, -20, 0) );
    linhaDiag = new THREE.Line(geometry, material);
    scene.add(linhaDiag);
}

function criarlinhaBaixo(){

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { color: 0xFFFF00 } );
    geometry.vertices.push(new THREE.Vector3(  20, -20, 0) );
    geometry.vertices.push(new THREE.Vector3(  -20, -20, 0) );
    linhaBaixo = new THREE.Line(geometry, material);
    scene.add(linhaBaixo);
}

// Texto




function loaderFont(){

    var loader = new THREE.FontLoader();
    
    loader.load('fonts/VW Head Office_Regular.json', function (font) {
        
        var material = new THREE.MeshBasicMaterial({color: 0xFF0000});
        var shapes = font.generateShapes("Canto Direito",0.8);
        var geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        var texto1 = new THREE.Mesh(geometry, material);
        texto1.position.set(-25,19.5,0);
        scene.add(texto1);


        var material = new THREE.MeshBasicMaterial({color: 0xFFFF00});
        var shapes = font.generateShapes("Canto Direito",0.8);
        var geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        var texto1 = new THREE.Mesh(geometry, material);
        texto1.position.set(-25,-15,0);
        scene.add(texto1);

        var material = new THREE.MeshBasicMaterial({color: 0xFF0000});
        var shapes = font.generateShapes("Canto Esquerdo",1.6);
        var geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        var texto1 = new THREE.Mesh(geometry, material);
        texto1.position.set(20.5,18.5,0);
        scene.add(texto1);


        var material = new THREE.MeshBasicMaterial({color: 0xFFFF00});
        var shapes = font.generateShapes("Canto Esquerdo",1.6);
        var geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        var texto1 = new THREE.Mesh(geometry, material);
        texto1.position.set(20.5,-16,0);
        scene.add(texto1);
      
    } );
}


//5.  Adicionar Luz
function adicionarLuz(){
    var light = new THREE.SpotLight(0xFFFFFF, 4);
    light.position.set( -10, 0, 50 );
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

//Funcao para testes de movimentos que inclui a renderização final
//Acrescentado para o texto, que necessita de chamar recursivamente a renderização
function animar(){   

        //animacao recursiva
        requestAnimationFrame( animar );

        //adicionar movimento a cada frame
        //cube.rotation.x += 0.005;
        //cube.rotation.y += 0.005;
        //cube.rotation.z += 0.005;
      
        renderer.render( scene, camera );

}

//Start
init();