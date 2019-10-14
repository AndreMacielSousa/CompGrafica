// Variaveis Globais 

var scene;          //representa um container onde vai ser colocado todos os objetos que queremos renderizar.
var camera;         //representa o campo de visão da cena.
var renderer;       //será nosso renderizador dos objetos contidos na cena.
var container;      //referencia ao elemento que apresentara a scene


// Variaveis Globais para este Projecto

var cube;

// Instaciamento dos elementos

function init() {

    //1. referencia ao elemento que apresentara a scene
    container = document.querySelector( '#scene-container' );

    //2. Criar a Cena e definir plano de fundo
    scene = new THREE.Scene();  
    scene.background = new THREE.Color( 0x87CEEB  );

    //3. Campo Visao da Cena
    this.criarcamera();
    
    //4. Criar Objectos antes de rendererizar cena.
    this.createACube(); 

    //5.  Adicionar Luz
    this.adicionarLuz();

    //6. Renderizador
    this.renderizador();
 
};

//3. Campo Visao da Cena
    function criarcamera() {

    //3.1  Criar Camera
    var fov = 35;   // angulo (fiel of view)
    var aspect = container.clientWidth / container.clientHeight; // aspect ratio
    var near = 0.1; // plano de corte proximo 
    var far = 100;  // plano de corte afastado

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

    //3.2  Posicionar Camera  (x,y,z)
    camera.position.set(0,0,5); // caso (0,0,0) pode ser omitido
};

//4. Criar Objectos para a Cena
function createACube() {

    //4.1 Criar a Geometria (forma)
    var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );     // largura, altura, profundidade.

    //4.2 Definir o Material para a forma
    //  MeshBasicMaterial + performance 
    //  MeshStandardMaterial - performance + real e ncessário  tratar luz
    //  The MeshBasicMaterial is not affected by lights. 
    //  The MeshLambertMaterial computes lighting only at the vertices vs the 
    //  MeshPhongMaterial which computes lighting at every pixel. 
    //  The MeshPhongMaterial also supports specular highlights.
    var material = new THREE.MeshStandardMaterial( { 
        color: 0x008000,
        transparent: false,
        opacity: 1,
     } ); 
    
    //4.3 combinar a Forma e o Material
    cube = new THREE.Mesh( geometry, material );

    //4.4 Adicionar à Cena
    scene.add( cube );
};

    //5.  Adicionar Luz
    function adicionarLuz(){
    var light = new THREE.DirectionalLight( 0xffffff, 5.0 );
    light.position.set( 10, 10, 10 );
    scene.add( light );
};

//6. Renderizador
function renderizador() {

    //6.1 Criar um WebGLRenderer
    renderer = new THREE.WebGLRenderer({ antialias: true });

    //6.2 Definir dimensao
    renderer.setSize( container.clientWidth, container.clientHeight );

    //6.3 definir proporção correta de pixels para o dispositivo em que está sendo executado
    renderer.setPixelRatio(window.devicePixelRatio);
    
    //6.4 Adicionar Canvas Element à pagina
    container.appendChild( renderer.domElement );

};


// 7. Método para renderizar cena criada

function animate() {

    //animacao recursiva
    requestAnimationFrame( animate );

    //adicionar movimento a cada frame
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    cube.rotation.z += 0.005;
  
    renderer.render( scene, camera );
};


// chama funcao init para configurar tudo
init();

//chama funcao animate para redenderizar a cena
animate();
