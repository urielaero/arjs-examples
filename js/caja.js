;(function(){

  /*
	var camera, scene, renderer;
	var mesh;

	init();
	animate();

	function init() {

		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.z = 400;

		scene = new THREE.Scene();

		var texture = new THREE.TextureLoader().load( 'img/crate.gif' );

		var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
		var material = new THREE.MeshBasicMaterial( { map: texture } );

		mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		//


	}

	function animate() {

		requestAnimationFrame( animate );

		mesh.rotation.x += 0.005;
		mesh.rotation.y += 0.01;

		renderer.render( scene, camera );

	}
  */



  var camera, scene, renderer;
  var mesh;

  /*
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 10, 500 );
	camera.position.z = 400;
  */
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.z = 400;



	scene = new THREE.Scene();

	var texture = new THREE.TextureLoader().load( 'img/crate.gif' );

	var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
	var material = new THREE.MeshBasicMaterial( { map: texture } );

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

  var params = {
    AR: true,
    renderFcts: [function(delta){
			mesh.rotation.x += 0.005;
			mesh.rotation.y += 0.01;

      //this.renderer.render( scene, camera );
    }]
  };

  arTool = new window.ArTool(camera, scene, params)
  arTool.animate();

})(window);
