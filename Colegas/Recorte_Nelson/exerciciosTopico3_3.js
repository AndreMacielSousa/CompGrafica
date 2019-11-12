/*
    21020 - Computação gráfica 2019-2020
    Tópico 3 - Preenchimento e Recorte 2D

    Nelson Russa - 1401826
*/

function main() 
{
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight , 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var spotLight1 = new THREE.SpotLight( 0xffffff, 1);
    spotLight1.position.set( 50, 50, 20 );
    scene.add(spotLight1);

    var spotLight2 = new THREE.SpotLight( 0xffffff, 1);
    spotLight2.position.set( -50, -50, -20 );
    scene.add(spotLight2);

    camera.position.x = 5;
    camera.position.y = 0;
    camera.position.z = 50;
    camera.lookAt(scene.position);

    // --

    var dodecahedronGeometry = new THREE.DodecahedronBufferGeometry(4);
    var dodecahedronMaterial = new THREE.MeshBasicMaterial({color: 0xE55CFF, side: THREE.DoubleSide});
    var dodecahedron = new THREE.Mesh(dodecahedronGeometry,dodecahedronMaterial);
    dodecahedron.position.x = 0;
    dodecahedron.position.y = 0;
    dodecahedron.position.z = 0;
    scene.add(dodecahedron);
    
    var dodecahedronEdges = new THREE.EdgesGeometry( dodecahedronGeometry );
    var dodecahedronline = new THREE.LineSegments( dodecahedronEdges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    scene.add(dodecahedronline);

    //
    var planeGeometry = new THREE.PlaneGeometry(15,15);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    var torusGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    var torusMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});
    var torus = new THREE.Mesh(torusGeometry,torusMaterial);
    torus.position.x = -25;
    torus.position.y = 0;
    torus.position.z = -40;
    scene.add(torus);

    var torusMaterial2 = new THREE.MeshBasicMaterial({color: 0xffffff});
    var torus2=new THREE.LineSegments(torusGeometry,torusMaterial2)
    torus2.position.x = torus.position.x;
    torus2.position.y = torus.position.y;
    torus2.position.z = torus.position.z;
    scene.add(torus2);
  
    //
    var rotationObjects=[dodecahedron, dodecahedronline, plane];

    var globalPlane = new THREE.Plane(new THREE.Vector3( 0, 0, 0 ), 1);
    renderer.clippingPlanes = [globalPlane];

    document.getElementById("SELECTClipping").selectedIndex=0;
    
    // --
    $("#WebGL-output").append(renderer.domElement);

    // --
    renderScene();

    //
    function renderScene()
    {
        requestAnimationFrame(renderScene);

        for(o=0; o<rotationObjects.length; o++)
        {
            rotationObjects[o].rotation.x+=0.01;
            rotationObjects[o].rotation.y+=0.01;
        }

        renderer.render(scene, camera);
    }
}

function onResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function refresh()
{
    switch(document.getElementById("SELECTClipping").selectedIndex)
    {
        case 0:
            renderer.clippingPlanes[0].normal=new THREE.Vector3( 0, 0, 0 );
            break;
        case 1:
            renderer.clippingPlanes[0].normal=new THREE.Vector3( 0, 1, 0 );
            break;
        case 2:
            renderer.clippingPlanes[0].normal=new THREE.Vector3( 1, 0, 0 );
            break;
        case 3:
            renderer.clippingPlanes[0].normal=new THREE.Vector3( 0, 0, 1 );
            break;
        }
}

//
window.addEventListener('resize', onResize, false);


