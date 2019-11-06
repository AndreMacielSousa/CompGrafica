// Variaveis Globais
var operacoes;
var scene;
var camera;
var renderer;
var container;

// variavel do projecto


var altura = 800;       
var largura = 800;
var dim = 1;
var operacoes ="<br/>Apresenta Calculos (dim="+dim+"): <br/>";

//var cubo;

function init(){

    
    //Variaveis do Formulario
    
    var xa  = eval(document.getElementById("xa").value);
    var ya  = eval(document.getElementById("ya").value);
    var xb  = eval(document.getElementById("xb").value);
    var yb  = eval(document.getElementById("yb").value);
    var xc  = eval(document.getElementById("xc").value);
    var yc  = eval(document.getElementById("yc").value);
    var xd  = eval(document.getElementById("xd").value);
    var yd  = eval(document.getElementById("yd").value);
    var xe  = eval(document.getElementById("xe").value);
    var ye  = eval(document.getElementById("ye").value);
    var xf  = eval(document.getElementById("xf").value);
    var yf  = eval(document.getElementById("yf").value);
    var xg  = eval(document.getElementById("xg").value);
    var yg  = eval(document.getElementById("yg").value);
    
    //1. Referencia ao elemento que contem scene

    container = $("#output");      //console.log(container);
    //container = document.querySelector( '#output' );


    //2. criar Cena e fundo
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x222222  );

    //3. Campo Visao
    criarcamera();

    //4. Criar objectos
    //PontoMedio(0,0,20,20);

    operacoes+="<br/>Ponto AB [("+xa+","+ya+")("+xb+","+yb+")] <br />"
    PontoMedio(xa,ya,xb,yb);
    
    operacoes+="<br/>Ponto AC [("+xa+","+ya+")("+xc+","+yc+")] <br />"
    PontoMedio(xa,ya,xc,yc);
    
    operacoes+="<br/>Ponto AD [("+xa+","+ya+")("+xd+","+yd+")] <br />"
    PontoMedio(xa,ya,xd,yd);
    
    operacoes+="<br/>Ponto AE [("+xa+","+ya+")("+xe+","+ye+")] <br />"
    PontoMedio(xa,ya,xe,ye);
    
    operacoes+="<br/>Ponto AF [("+xa+","+ya+")("+xf+","+yf+")] <br />"
    PontoMedio(xa,ya,xf,yf);
    
    operacoes+="<br/>Ponto AG [("+xa+","+ya+")("+xg+","+yg+")] <br />"
    PontoMedio(xa,ya,xg,yg);
    
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

    camera.position.set(-20,30,50);
    camera.lookAt(20,0,0);  // apontar para o centro da cena 
}

function PontoMedio (x0,y0,x1,y1) {
    
    //criarCubo(1,1)

    var dx = Math.abs( x1 - x0) ;
    operacoes+="dx=|("+x1+"-"+x0+")|="+dx+"<br/>";

    var dy = Math.abs( y1 - y0);
    operacoes+="dy=|("+y1+"-"+y0+")|="+dy+"<br/>";

    var d = 2 * dy - dx;
    operacoes+="d=2*"+dy+"-"+dx+"="+d+"<br/>";

    var incrE = 2*dy;
    operacoes+="incrE=2*"+dy+"="+incrE+"<br/>";

    var incrNE = 2*(dy - dx);
    operacoes+="incrNE=2*("+dy+"-"+dx+")="+incrNE+"<br/>";


    var x = x0;
    var y = y0;
    criarCubo(x0,y0);
    while(x<x1*dim){
        if (d<=0){
            operacoes+="d<=0, então ";

            d+=incrE;
            operacoes+="d+=incrE (d="+d+") ";
            
            x+=dim;
            operacoes+="x+=dim (x="+x+") <br />";
        }
        else {
            operacoes+="d>0, então ";

            d+=incrNE;
            operacoes+="d+=incrNE (d="+d+") ";

            y+=dim;
            operacoes+="y+=dim (y="+y+") ";

            x+=dim;
            operacoes+="x+=dim (x="+x+") <br />";
        }
    criarCubo(x,y);
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
   //renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    renderer.setSize(largura, altura);

    // proporção para outros dispositivos
    renderer.setPixelRatio(window.devicePixelRatio);

    // Adicionar Canvas Elelemnt a pagina
    container.append(renderer.domElement);          // Memoria futura cuidado com o appendChild

}


function criarCubo(x,y){

    // Criar Geometria
    var geometry = new THREE.CubeGeometry(dim,dim,dim);   //// largura, altura, profundidade.

    // Material
    //  MeshBasicMaterial + performance 
    //  MeshStandardMaterial - performance + real e ncessário  tratar luz
    //  The MeshLambertMaterial computes lighting only at the vertices vs the 
    //  MeshPhongMaterial which computes lighting at every pixel. 
    //  The MeshPhongMaterial also supports specular highlights.
    var material = new THREE.MeshStandardMaterial( {
            color: 0xFF0000,
            //transparent: true,
            //opacity: 0.5,
            //Wireframe
        } );

    // Combinar

    var cubo = new THREE.Mesh(geometry,material);

    // Posicionar

    cubo.position.set(x*dim, y*dim,0);
    
    // Adicionar

    scene.add(cubo);

}



//init();
//console.log(scene.background);