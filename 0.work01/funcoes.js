// Variaveis Globais 

var scene;          //representa um container onde vai ser colocado todos os objetos que queremos renderizar.
var camera;         //representa o campo de visão da cena.
var renderer;       //será nosso renderizador dos objetos contidos na cena.
var container;      //referencia ao elemento que apresentara a scene


// Variaveis Globais para este Projecto

var plane;
var cube;
var sphere;

// Instaciamento dos elementos

function init() {

    //1. referencia ao elemento que apresentara a scene
    container = document.querySelector( '#scene-container' );

    //2. Criar a Cena e definir plano de fundo
    scene = new THREE.Scene();  
    scene.background = new THREE.Color( 0xFFFFFF  );

    //3. Campo Visao da Cena
    this.criarcamera();
    
    //4. Criar Objectos antes de rendererizar cena.
    this.createACube(); 
    this.createACube2();
    this.createPlane();
    this.creatSphere();

    //5.  Adicionar Luz
    this.adicionarLuz();

    //6. Renderizador
    this.renderizador();

    // Auxiliar para eixos
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);
 
};

//3. Campo Visao da Cena
    function criarcamera() {

    //3.1  Criar Camera
    var fov = 45;   // angulo (fiel of view)
    var aspect = container.clientWidth / container.clientHeight; // aspect ratio
    var near = 0.1; // plano de corte proximo 
    var far = 1000;
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

    //3.2  Posicionar Camera  (x,y,z)
    camera.position.set(-30,40,30); // caso (0,0,0) pode ser omitido
    camera.lookAt(scene.position);  // apontar para o centro da cena
};

//4. Criar Objectos para a Cena
// Cubo
function createACube() {

    //4.1 Criar a Geometria (forma)
    var geometry = new THREE.BoxBufferGeometry( 4, 4, 4 );     // largura, altura, profundidade.

    //4.2 Definir o Material para a forma
    //  MeshBasicMaterial + performance 
    //  MeshStandardMaterial - performance + real e ncessário  tratar luz
    //  The MeshBasicMaterial is not affected by lights. 
    //  The MeshLambertMaterial computes lighting only at the vertices vs the 
    //  MeshPhongMaterial which computes lighting at every pixel. 
    //  The MeshPhongMaterial also supports specular highlights.
    var material = new THREE.MeshLambertMaterial( {               //wireframe - para limites
        color: 0xFFFFFF,
        wireframe: true
     } ); 
    
    //4.3 combinar a Forma e o Material
    cube = new THREE.Mesh( geometry, material );

    //4.4 Adicionar à Cena
    cube.position.set(-4,3,0)
    cube.castShadow = true;                                    //projecta sombra
    scene.add( cube );
};


function createACube2() {

    //4.1 Criar a Geometria (forma)
    var geometry = new THREE.BoxBufferGeometry( 4, 4, 4 );     // largura, altura, profundidade.

    //4.2 Definir o Material para a forma
    //  MeshBasicMaterial + performance 
    //  MeshStandardMaterial - performance + real e ncessário  tratar luz
    //  The MeshBasicMaterial is not affected by lights. 
    //  The MeshLambertMaterial computes lighting only at the vertices vs the 
    //  MeshPhongMaterial which computes lighting at every pixel. 
    //  The MeshPhongMaterial also supports specular highlights.
    var material = new THREE.MeshLambertMaterial( {               //wireframe - para limites
        color: 0xFF0000,
        //wireframe: true
     } ); 
    
    //4.3 combinar a Forma e o Material
    cube = new THREE.Mesh( geometry, material );

    //4.4 Adicionar à Cena
    cube.position.set(-4,3,0)
    cube.castShadow = true;                                    //projecta sombra
    scene.add( cube );
};



// Plano
function createPlane(){

    var planeGeometry = new THREE.PlaneGeometry(60, 20);          //4.1
    var planeMaterial = new THREE.MeshLambertMaterial({           //4.2
        color: 0xFFFFFF
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);       //4.3
    plane.rotation.x = -0.5 * Math.PI;                          //4.4
    
    plane.receiveShadow = true;                                 //recebe sombra
    plane.position.set(15,0,0);
 
    scene.add( plane );
;}

// Esfera
function creatSphere() {
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);   //4.1
    var sphereMaterial = new THREE.MeshLambertMaterial({          //4.2
        color: 0x7777FF,
       // wireframe: true
    });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);    //4.3
    sphere.position.set(20,4,2);                                //4.4

    sphere.castShadow = true;                                   //projecta sombra

    scene.add( sphere );
;}


    //5.  Adicionar Luz
    function adicionarLuz(){
    //var light = new THREE.DirectionalLight( 0xffffff, 5.0 );
    var light = new THREE.SpotLight( 0xffffff );
    light.position.set( -40, 60, -10 );
    light.castShadow = true;                            //ativar sombras
    light.shadow.mapSize.set( 4096,4096 );              //melhorar sombra
    scene.add( light );
};

//6. Renderizador
function renderizador() {

    //6.1 Criar um WebGLRenderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
   
    //6.2 Definir dimensao
    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    renderer.setSize( container.clientWidth, container.clientHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;   //melhorar sombra


    //6.3 definir proporção correta de pixels para o dispositivo em que está sendo executado
    renderer.setPixelRatio(window.devicePixelRatio);
    
    //6.4 Adicionar Canvas Element à pagina
    container.append( renderer.domElement );

};


// 7. Método para renderizar cena criada

function animate() {

    //animacao recursiva
    requestAnimationFrame( animate );

    //adicionar movimento a cada frame
  //  cube.rotation.x += 0.005;
  //  cube.rotation.y += 0.005;
 //   cube.rotation.z += 0.005;
  
    renderer.render( scene, camera );
};


// chama funcao init para configurar tudo
init();

//chama funcao animate para redenderizar a cena
animate();
