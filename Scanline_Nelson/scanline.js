/*
    21020 - Computação gráfica 2019-2020
    Tópico 3 - Preenchimento e Recorte 2D

    Nelson Russa - 1401826
*/

// Create table with edges
function createET(lines)
{
    let ET=new Map();

    for(l=0; l<lines.length; l++)
    {
        let line=lines[l];

        // Get the point of the line with the minimum y
        let minp=line.p0;
        let maxp=line.p1;
        if(minp.y>maxp.y)
        {
            minp=line.p1;
            maxp=line.p0;
        }

        // Calculate m and keep 1/m numerator and denominator values
        let dx=(maxp.x-minp.x);
        let dy=(maxp.y-minp.y);
        let numerator=Math.abs(dx);
        let denominator=Math.abs(dy);
        let m=1/(dy/dx);
        let dirX=(dx>=0?1:-1);
        let _1mInfo="";
        if(numerator!=0 && denominator!=0)
        {
            if(dirX<0)
                _1mInfo+="-";

            if(numerator!=denominator)
                _1mInfo+=(numerator+"/"+denominator);
            else
                _1mInfo+="1";
        }
        else if(denominator!=0)
            _1mInfo="0";
        else
            _1mInfo="Inf";
        
        // Keep edge information
        let e={
                name: line.name, 
                xmax:maxp.x,
                ymax:maxp.y, 
                xmin:minp.x, 
                ymin:minp.y, 
                numerator, 
                increment:numerator,
                denominator, 
                dirX, 
                m,
                _1mInfo
            };

        // If there isnt any edge in the tabel for current y
        if(!ET.has(minp.y))
            ET.set(minp.y, [e]);
        else
        {
            // If there is already some edge, add new one, making
            // sure its ordered by ymax
            let added=false;
            let et=ET.get(minp.y);
            for(i=0; i<et.length; i++)
            {
                if(et[i].ymax>e.ymax)
                {
                    et.splice(i,0, e);
                    added=true;
                    break;
                }
            }
            if(!added)
                et.push(e);
        }
    }

    return ET;
}

function scanLineFill(ET, tableStepsCallback, drawCallback)
{
    // 2.
    let EAT=[];

    // 3.
    let keys = Array.from(ET.keys());
    let y=keys[0];
    for(k=1; k<keys.length; k++)
    {
        if(keys[k]<y)
            y=keys[k];
    }

    // 4.
    do
    {
        let drawLog='';

        // 5.
        if(ET.has(y))
        {
            let et=ET.get(y);
            //
            for(i=0; i<et.length; i++)
            {
                if(et[i].ymax!=y)
                    EAT.push(et[i]);
                else
                {
                    drawLog+="Preencheu gráfico com linha "+et[i].name+" no y="+y+" (x entre "+et[i].xmin+" e "+et[i].xmax+")";
                    if(drawCallback)
                        drawCallback(y, et[i].xmin, et[i].xmax);
                }
            }
            
            EAT.sort(function(a, b) 
                    {
                        return a.xmin-b.xmin;
                    }
                );
        }
        ET.delete(y);

        // 6.
        if(EAT.length>0)
        {
            if(drawLog.length==0)
                drawLog+="Preencheu gráfico";
            else
                drawLog+=",";
            for(i=0; i<EAT.length-1; i+=2)
            {
                if(i>0)
                    drawLog+=", ";
                drawLog+=" entre "+EAT[i].name+" e "+EAT[i+1].name+", no y="+y+" (x entre "+EAT[i].xmin+" e "+EAT[i+1].xmin+")";

                if(drawCallback)
                    drawCallback(y, EAT[i].xmin, EAT[i+1].xmin);
            }
        }

        //
        if(tableStepsCallback)
            tableStepsCallback(y, EAT, ET, drawLog);

        // 7.
        for(i=0; i<EAT.length; i++)
        {
            if(y==EAT[i].ymax-1)
            {
                EAT.splice(i,1);
                i--;
            }
        }

        // 8.
        y++;

        //9.
        for(i=0; i<EAT.length; i++)
        {
            EAT[i].xmin+=EAT[i].m;

            // Optimizar o calculo do valor xmin, para não fazer contas
            // Tema-III-Preenchimento2D.pdf pág 10
            // (desligado por não estar a 100%)

            //EAT[i].increment+=EAT[i].numerator;
            //if(EAT[i].increment>EAT[i].denominator)
            //{
            //    EAT[i].xmin+=EAT[i].dirX;
            //    EAT[i].increment-=EAT[i].denominator;
            //}
        }

    } while(EAT.length>0);
    
    if(tableStepsCallback)
        tableStepsCallback(y, EAT, ET, "");
}
