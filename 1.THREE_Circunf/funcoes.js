// Variaveis Globais

var scene;
var camera;
var renderer;
var container;

// variavel do projecto

var altura = 650;       
var largura = 650;
var dim = 1;
var operacoes ="<br/>Apresenta Calculos (dim="+dim+"): <br/>";

//var cubo;

function init(){
    
    //Variaveis do Formulario
    
    var x0  = eval(document.getElementById("x0").value);
    var y0  = eval(document.getElementById("y0").value);
    var r  = eval(document.getElementById("r").value);
    var cor  = document.getElementById("corselect").options[document.getElementById("corselect").selectedIndex].value;
    
    //1. Referencia ao elemento que contem scene

    container = $("#output");      //console.log(container);
    //container = document.querySelector( '#output' );


    //2. criar Cena e fundo
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x333333  );

    //3. Campo Visao
    criarcamera();

    //4. Criar objectos
    operacoes+="<br/>Circulo "+cor+" [("+x0+","+y0+")](R="+r+")<br />"
    MidPointCircle(x0,y0,9,cor);

    //5. Adicionar Luz
    adicionarLuz();

    //6. Renderizar
    renderizador();

    // Auxiliar para eixos
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    renderer.render(scene,camera);

    document.getElementById("operacoesA").innerHTML=operacoes;

}

function criarcamera() {
    var fov = 40;
    // var aspect = container.clientWidth / container.clientHeight; // aspect ratio

    var aspect = largura / altura ;
    var near = 0.1;
    var far = 1000;

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

    camera.position.set(40,20,50);
    camera.lookAt(-10,0,0);  // apontar para o centro da cena 
    
}

// Função para Geração de Circunferencia
function MidPointCircle(x0,y0,r,cor){
    var x = 0
    var y = r;
    var d = 5.0/4.0 - r;
    
    CirclePoints(x0,y0,x,y,cor);
         
    while(y>x){

        operacoes+="x= "+x+" y= "+y+ " d= "+d+"<br/>";

        if(d<=0) {
            d+=2.0*x+3.0;

            operacoes+="d <= 0, então d= 2.0*"+x+"+3.0= "+d+" <br/>";
        }
        else {
            d+=2.0*(x-y)+5.0;
            operacoes+="d = 0, então d= 2.0*("+x+"-"+y+")= "+d+" <br/>";
            y--;;
        }
    x++;
    CirclePoints(x0,y0,x,y,cor);
    
    }

}

function adicionarLuz(){
   
    var light = new THREE.SpotLight( 0xffffff );
    light.position.set( -20, 10, 70 );   
    scene.add( light );

}

function renderizador(){

    // Criar WebGLrenderer

    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Dimensao
   // renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    renderer.setSize(largura, altura);

    // proporção para outros dispositivos
    renderer.setPixelRatio(window.devicePixelRatio);

    // Adicionar Canvas Elelemnt a pagina
    container.append(renderer.domElement);          // Memoria futura cuidado com o appendChild

}


function criarCubo(x,y,cor){

    // Criar Geometria
    var geometry = new THREE.CubeGeometry(dim,dim,dim);   //// largura, altura, profundidade.

    // Material
    //  MeshBasicMaterial + performance 
    //  MeshStandardMaterial - performance + real e ncessário  tratar luz
    //  The MeshLambertMaterial computes lighting only at the vertices vs the 
    //  MeshPhongMaterial which computes lighting at every pixel. 
    //  The MeshPhongMaterial also supports specular highlights.
    var material = new THREE.MeshStandardMaterial( {
            color: cor,
            //wireframe: true
            //transparent: true,
            //opacity: 0.5,

        } );

    // Combinar

    var cubo = new THREE.Mesh(geometry,material);

    // Posicionar

    cubo.position.set(x*dim, y*dim,0);
    
    // Adicionar

    scene.add(cubo);

}



//Processamento das simetrias
function CirclePoints(x0,y0,x,y,cor){

    // Se (x,y) pertence à circunferencia, então os ponto seguintes também
    // (y,x) (y,-x) (x,-y) (-x,-y) (-y,-x) (-y,x) (-x,y)
  
    criarCubo(x0+x,y0+y,cor); //(x,y)
    criarCubo(x0+y,y0+x,cor); //(y,x)
    criarCubo(x0+y,y0-x,cor); //(y,-x)
    criarCubo(x0+x,y0-y,cor); // (x,-y)
    criarCubo(x0-x,y0-y,cor); // (-x,-y) 
    criarCubo(x0-y,y0-x,cor); // (-y,-x) 
    criarCubo(x0-y,y0+x,cor); // (-y,x)
    criarCubo(x0-x,y0+y,cor); //(-x,y)

}


//init();
