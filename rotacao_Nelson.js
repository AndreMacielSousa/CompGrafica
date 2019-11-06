/*
    21020 - Computação gráfica 2019-2020
    Tópico 2 - Primitivas em Gráficos Raster
    Exercicio tópico 2 - exercicios.js

    Nelson Russa - 1401826
*/

function main() 
{
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight , 0.1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(scene.position);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xDDDDDD));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var spotLight = new THREE.SpotLight( 0xffffff, 1);
    spotLight.position.set( 0, 0, 100 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.angle = Math.PI / 6.0;
    scene.add(spotLight);

    // --
    var position={x:0, y:10, z: 0};

    var material1 = new THREE.MeshLambertMaterial({color: 0x648499});
    var material2 = new THREE.MeshLambertMaterial({color: 0xB1BFC8});

    var cube1Geometry = new THREE.BoxBufferGeometry(33,19,6);
    var cube1 = new THREE.Mesh(cube1Geometry, material1);
    cube1.castShadow = true;
    cube1.position.set( position.x+0, position.y+0, position.z+0);
    scene.add(cube1);

    var cube2Geometry = new THREE.BoxBufferGeometry(44,19,5.9);
    var cube2 = new THREE.Mesh(cube2Geometry, material2);
    cube2.castShadow = true;
    cube2.position.set( position.x+0, position.y+0, position.z-0.05);
    scene.add(cube2);

    var cube3Geometry = new THREE.BoxBufferGeometry(33,6,5.9);
    var cube3 = new THREE.Mesh(cube3Geometry, material2);
    cube3.castShadow = true;
    cube3.position.set( position.x+0, position.y-12, position.z+0);
    scene.add(cube3);

    var objects=[cube1, cube2, cube3];

    // --
    // URL para converter a fonte: https://gero3.github.io/facetype.js/
    var loader = new THREE.FontLoader();
    loader.load( 'fonts/Bodoni MT_Regular.json', function (font) 
        {
            //
            var shapes = font.generateShapes("UNIVERSIDADE", 1.5);
            var geometry = new THREE.ShapeBufferGeometry( shapes );
            geometry.computeBoundingBox();
            text1 = new THREE.Mesh( geometry, material1 );
            text1.position.set( position.x, position.y-18, position.z+0 );
            scene.add(text1);

            //
            var shapes = font.generateShapes("AbERTA", 6.3);
            var geometry = new THREE.ShapeBufferGeometry( shapes );
            geometry.computeBoundingBox();
            text2 = new THREE.Mesh( geometry, material1 );
            text2.position.set( position.x-18, position.y-26, position.z+0 );
            scene.add(text2);

            //
            var shapes = font.generateShapes("www.univ-ab.pt", 3.7);
            var geometry = new THREE.ShapeBufferGeometry( shapes );
            geometry.computeBoundingBox();
            text3 = new THREE.Mesh( geometry, material1 );
            text3.position.set( position.x-18, position.y-31, position.z+0 );
            scene.add(text3);
        });

    //
    $("#WebGL-output").append(renderer.domElement);

    //
    renderScene();

    //
    function renderScene()
    {
        for(o=0; o<objects.length; o++)
            objects[o].rotation.y+=0.01;

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

}

function onResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//
window.addEventListener('resize', onResize, false);
