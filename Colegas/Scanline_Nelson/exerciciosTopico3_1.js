/*
    21020 - Computação gráfica 2019-2020
    Tópico 3 - Preenchimento e Recorte 2D

    Nelson Russa - 1401826
*/

var info={
        canvas:null,
        context:null, 
        zoom:20,
        invertY:true
    };

let listOfPoints=[
        [
            {name: 'A', x:3, y:1},
            {name: 'B', x:6, y:5},
            {name: 'C', x:3, y:8},
            {name: 'D', x:3, y:4},
            {name: 'E', x:0, y:4}
        ],
        [
            {name:'A', x:2, y:3},
            {name:'B', x:7, y:1},
            {name:'C', x:13, y:5},
            {name:'D', x:13, y:11},
            {name:'E', x:7, y:7},
            {name:'F', x:2, y:9},
        ],
        [
            {name: 'A', x:3, y:3},
            {name: 'B', x:10, y:10},
            {name: 'C', x:17, y:3},
            {name: 'D', x:25, y:13},
            {name: 'E', x:17, y:18},
            {name: 'F', x:3, y:18},
        ]
];

//
function init()
{
    sObj = document.getElementById("SELECTPoints");
    for(i=0; i<listOfPoints.length; i++)
    {
        var option = document.createElement("option");
        option.text = getPointsInfo(listOfPoints[i]);
        sObj.add(option)
    }
    sObj.selectedIndex=0;

    info.canvas = document.getElementById("tela"); 
    info.context = info.canvas.getContext("2d");
 
    refresh();
}

//
function background()
{
    if(info.zoom>1)
    {
        let startEven=true;
        for(y=0; y<info.canvas.height/info.zoom; y++)
        {
            even=startEven;
            for(x=0; x<info.canvas.width/info.zoom; x++)
            {
                drawPixel(info, {x, y}, even?"#BABABA":"#FFFFFF");
                even=!even;
            }
            startEven=!startEven;
        }
    }
}

//
function refresh()
{
    clearTable("TABLE_ET", 1);
    clearTable("TABLE_EAT_ET", 1);

    points = listOfPoints[document.getElementById("SELECTPoints").selectedIndex];

    info.grid = getGridSizeFromPoints(points);
    info.canvas.width=info.grid.width*info.zoom;
    info.canvas.height=info.grid.height*info.zoom;

    //
    let lines=getLinesFromPoints(points);
    document.getElementById("DIVLines").innerHTML=getLinesInfo(lines);

    //
    background();

    // a)

    // a.1)
    let ET=createET(lines);
    showETTable(ET, "TABLE_ET");

    // a.2)
    scanLineFill(
            ET, 
            function(y, EAT, ET, drawLog)
            {
                tableSteps(y, EAT, ET, drawLog, "TABLE_EAT_ET");
            },
            function(y, xmin, xmax)
            {
                line(info, {x: Math.round(xmin), y}, {x: Math.floor(xmax), y}, "#FF0000");
            });

    //
    if(document.getElementById("cbDrawPolygon").checked)
        polygon(info, lines, "#000000");

}

//
function getGridSizeFromPoints(points)
{
    let maxX=0, maxY=0;

    for(p=0; p<points.length; p++)
    {
        if(points[p].x>maxX)
            maxX=points[p].x;
        if(points[p].y>maxY)
            maxY=points[p].y;
    }

    return {width: maxX+2, height: maxY+2};
}

//
function tableSteps(y, EAT, ET, drawLog, tableID)
{
    let t=document.getElementById(tableID);
    let tr = document.createElement('tr');

    // y
    addCellText(tr, y, "padding:5px");

    // EAT
    addCell(tr, getHTMLTableForEdgeTableContent(EAT, false));

    // ET
    addCellText(tr, getEdgeTableNames(ET), "font-size:10px;");

    // Draw log
    addCellText(tr, drawLog, "font-size:12px;");

    t.appendChild(tr);
}

//
function addCellText(tr, content, style)
{
    let td = document.createElement('td');
    td.style=style;
    td.appendChild(document.createTextNode(content));
    tr.appendChild(td);
    return td;
}

//
function addCell(tr, content, style)
{
    let td = document.createElement('td');
    td.style=style;
    td.appendChild(content);
    tr.appendChild(td);
    return td;
}

//
function clearTable(tableID, rowsToLeave)
{
    let t=document.getElementById(tableID);
    for(rowCount = t.rows.length-rowsToLeave; rowCount>0; rowCount--)
        t.deleteRow(rowCount); 

}

//
function showETTable(ET, tableID)
{
    let  t = document.getElementById(tableID);
    
    let keys = Array.from(ET.keys());
    let ymin=keys[0];
    let ymax=keys[0];
    for(k=1; k<keys.length; k++)
    {
        if(keys[k]<ymin)
            ymin=keys[k];
        if(keys[k]>ymax)
            ymax=keys[k];
    }    

    //
    for(y=ymax; y>=ymin; y--)
    {
        let tr = document.createElement('tr');

        // y
        addCellText(tr, y, "padding:5px");

        //
        if(ET.has(y))
            addCell(tr, getHTMLTableForEdgeTableContent(ET.get(y), true));
        else
            addCellText(tr, "Nil");
        
        //
        t.appendChild(tr);
    }
}

//
function getHTMLTableForEdgeTableContent(e, addInitialArrow)
{
    let  st = document.createElement('table');
    let tr2 = document.createElement('tr');

    if(e.length>0)
    {
        for(i=0; i<e.length; i++)
        {
            if(addInitialArrow || i>0)
                addCellText(tr2, "-->");
            addCell(tr2, getTableForETInfo(e[i]));
        }
    }
    else
        addCellText(tr2, "vazia","font-size:10px;width:50px;text-align:center");
    st.appendChild(tr2);

    return st;
}

//
function getEdgeTableNames(ET)
{
    if(ET.size>0)
    {
        let arrNames=[];
        let keys = Array.from(ET.keys());
        keys.sort();
        for(i=0; i<keys.length; i++)
        {
            let e=ET.get(keys[i]);

            for(j=0; j<e.length; j++)
                arrNames.push(e[j].name);
        }

        return arrNames.join(", ");
    }

    return "vazia";
}

//
function getTableForETInfo(e)
{
    let t = document.createElement('table');
    t.setAttribute("cellpadding","0");
    t.setAttribute("cellspacing","0");
    //
    let tr1= document.createElement('tr');
    let td=addCellText(tr1, e.name, "font-size:10px");
    td.setAttribute("colspan","3");
    t.appendChild(tr1);

    let tr2= document.createElement('tr');
    addCellText(tr2, e.ymax, "border-style: solid; border-width:1px 0px 1px 1px;width:25px;text-align:center;font-size:11px");
    addCellText(tr2, e.xmin, "border-style: solid; border-width:1px 0px 1px 1px;;width:25px;text-align:center;font-size:11px");
    addCellText(tr2, e._1mInfo, "border: solid 1px;width:25px;text-align:center;font-size:11px");
    t.appendChild(tr2);

    let tr3= document.createElement('tr');
    addCellText(tr3, "ymax", "text-align:center;font-size:11px");
    addCellText(tr3, "xmin", "text-align:center;font-size:11px");
    addCellText(tr3, "1/m", "text-align:center;font-size:11px");
    t.appendChild(tr3);

    return t;
}

//
function getPointsInfo(points)
{
    let info="";
    for(p=0; p<points.length; p++)
    {
        if(p>0)
            info+=", ";
        info+=points[p].name+"("+points[p].x+","+points[p].y+")";
    }
    return info;
}

//
function getLinesInfo(lines)
{
    let info="";
    for(l=0; l<lines.length; l++)
    {
        if(l>0)
            info+=", ";
        info+=lines[l].name+"=[("+lines[l].p0.x+","+lines[l].p0.y+"),("+lines[l].p1.x+","+lines[l].p1.y+")]";
    }
    return info;
}

//
function getLinesFromPoints(points)
{
    let lines=[];

    if(points.length>1)
    {
        p0=points[0];
        for(i=1; i<points.length; i++)
        {
            p1=points[i];
            let name='';
            if(p0.name)
                name+=p0.name;
            if(p1.name)
                name+=p1.name;

            lines.push({name, p0: {x: p0.x, y: p0.y}, p1: {x: p1.x, y: p1.y}});
            p0=p1;
        }
        let name='';
        if(p0.name)
            name+=p0.name;
        if(points[0].name)
            name+=points[0].name;
        lines.push({name, p0: {x: p0.x, y: p0.y}, p1: {x: points[0].x, y: points[0].y}});
    }

    return lines;
}