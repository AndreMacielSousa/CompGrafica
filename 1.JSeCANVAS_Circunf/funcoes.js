var ctx;
var dim = 10; // dimensão do pixel
var operacoes ="Apresenta Calculos (dim="+dim+"): <br/>";


function init(){
    
//Variaveis do Formulario
    
    var x0  = eval(document.getElementById("x0").value);
    var y0  = eval(document.getElementById("y0").value);
    var r  = eval(document.getElementById("r").value);
    var cor  = document.getElementById("corselect").options[document.getElementById("corselect").selectedIndex].value;

    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
   
    operacoes+="<br/>Circulo "+cor+" [("+x0+","+y0+")](R="+r+")<br />"
    
    this.MidPointCircle(x0,y0,r,cor);

    document.getElementById("operacoesA").innerHTML=operacoes;
}

// Função para desenhar pixel
function drawPixel(x,y,cor){
    ctx.beginPath();
    ctx.fillStyle = cor;
    ctx.fillRect(x * dim, y * dim, dim, dim);
    ctx.closePath();
}

// Função para Geração de Circunferencia
function MidPointCircle(x0,y0,r,cor){
    var x = 0
    var y = r;
    var d = 5.0/4.0 - r;

    this.CirclePoints(x0,y0,x,y,cor);
         
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
    this.CirclePoints(x0,y0,x,y,cor);
    
    }

}

//Processamento das simetrias
function CirclePoints(x0,y0,x,y,cor){

    // Se (x,y) pertence à circunferencia, então os ponto seguintes também
    // (y,x) (y,-x) (x,-y) (-x,-y) (-y,-x) (-y,x) (-x,y)

    this.drawPixel(x0+x,y0+y,cor); //(x,y)
    this.drawPixel(x0+y,y0+x,cor); //(y,x)
    this.drawPixel(x0+y,y0-x,cor); //(y,-x)
    this.drawPixel(x0+x,y0-y,cor); // (x,-y)
    this.drawPixel(x0-x,y0-y,cor); // (-x,-y) 
    this.drawPixel(x0-y,y0-x,cor); // (-y,-x) 
    this.drawPixel(x0-y,y0+x,cor); // (-y,x)
    this.drawPixel(x0-x,y0+y,cor); //(-x,y)

}