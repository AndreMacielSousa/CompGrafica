/*
    21020 - Computação gráfica 2019-2020
    Tópico 3 - Preenchimento e Recorte 2D

    Nelson Russa - 1401826
*/

//
function drawPixel(info, coord, color)
{
    if(!color)
        color="#000000";

    let y=coord.y;
    if(info.invertY)
        y=info.grid.height-coord.y-1;

    info.context.beginPath();
    info.context.fillStyle = color;
    info.context.fillRect(coord.x*info.zoom, y*info.zoom, info.zoom, info.zoom);
    info.context.closePath();
}

//
function line(info, coord0, coord1, color)
{
    if(coord0.x==coord1.x && coord0.y==coord1.y)
    {
        drawPixel(info, coord0, color);
        return;
    }

    let dx=Math.abs(coord1.x-coord0.x);
    let dy=Math.abs(coord1.y-coord0.y);

    if(dx>=dy)
    {
        // Se a linha for para a esquerda, inverter
        if(coord0.x>coord1.x)
        {
            aux=coord0.x;
            coord0.x=coord1.x;
            coord1.x=aux;
            aux=coord0.y;
            coord0.y=coord1.y;
            coord1.y=aux;
        }

        let d=2*dy-dx;
        let incE=2*dy;
        let incNE=2*(dy-dx);
        let direcao=(coord1.y>=coord0.y?1:-1);

        for(x=coord0.x, y=coord0.y; x<=coord1.x;x++)
        {
            drawPixel(info, {x, y},color);

            if(d<0)
            {
                d+=incE;
            }
            else
            {
                d+=incNE;
                y+=direcao;
            }
        }
    }
    else
    {
        // Se a linha for de baixo para cima, inverter
        if(coord0.y>coord1.y)
        {
            aux=coord0.x;
            coord0.x=coord1.x;
            coord1.x=aux;
            aux=coord0.y;
            coord0.y=coord1.y;
            coord1.y=aux;
        }

        let d=2*dx-dy;
        let incE=2*dx;
        let incNE=2*(dx-dy);
        let direcao=(coord1.x>=coord0.x?1:-1);

        for(x=coord0.x, y=coord0.y; y<=coord1.y; y++)
        {
            drawPixel(info, {x, y}, color);

            if(d<0)
            {
                d+=incE;
            }
            else
            {
                d+=incNE;
                x+=direcao;
            }
        }
    }
}

//
function polygon(info, pointsOrlines, lineColor)
{
    if(pointsOrlines.length>0 && pointsOrlines[0].p0)
    {
        for(i=0; i<pointsOrlines.length; i++)
        {
            let l=pointsOrlines[i];
            line(info, l.p0, l.p1, lineColor);
        }
    }
    else if(pointsOrlines.length>1)
    {
        let points=pointsOrlines;
        p0=points[0];
        for(i=1; i<points.length; i++)
        {
            p1=points[i];
            line(info, {x: p0.x, y: p0.y}, {x: p1.x, y: p1.y}, lineColor);
            p0=p1;
        }
        // Fechar o poligono
        line(info, {x: p0.x, y: p0.y}, {x: points[0].x, y: points[0].y}, lineColor);
    }
}
