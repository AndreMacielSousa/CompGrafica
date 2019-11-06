var ctx;
var dim = 10; // dimensão do pixel
var operacoes ="Apresenta Calculos (dim="+dim+"): <br/>";


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
    
    var canvas = document.getElementById("myCanvas");
    
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0000000";
    ctx.fillRect(0,0,dim,dim);

    operacoes+="<br/>Ponto AB [("+xa+","+ya+")("+xb+","+yb+")] <br />"
    this.PontoMedio(xa,ya,xb,yb);
    
    operacoes+="<br/>Ponto AC [("+xa+","+ya+")("+xc+","+yc+")] <br />"
    this.PontoMedio(xa,ya,xc,yc);
    
    operacoes+="<br/>Ponto AD [("+xa+","+ya+")("+xd+","+yd+")] <br />"
    this.PontoMedio(xa,ya,xd,yd);
    
    operacoes+="<br/>Ponto AE [("+xa+","+ya+")("+xe+","+ye+")] <br />"
    this.PontoMedio(xa,ya,xe,ye);
    
    operacoes+="<br/>Ponto AF [("+xa+","+ya+")("+xf+","+yf+")] <br />"
    this.PontoMedio(xa,ya,xf,yf);
    
    operacoes+="<br/>Ponto AG [("+xa+","+ya+")("+xg+","+yg+")] <br />"
    this.PontoMedio(xa,ya,xg,yg);
    

    document.getElementById("operacoesA").innerHTML=operacoes;
}

function drawPixel(x,y){
    var imgData = ctx.getImageData(0, 0, dim, dim);
    ctx.putImageData(imgData, x, y);
}

function PontoMedio (x0,y0,x1,y1){

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
    this.drawPixel(x0,y0);
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
    this.drawPixel(x,y);
    }
}