;(function() {

	// init scene and camera
	var scene	= new THREE.Scene();
		
	//////////////////////////////////////////////////////////////////////////////////
	//		Initialize a basic camera
	//////////////////////////////////////////////////////////////////////////////////


	// Create a camera
	var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
	camera.position.z = 3;
	window.addEventListener( 'resize', function() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		
		renderer.setSize( window.innerWidth, window.innerHeight );
	}, false );

	// add a torus knot	
	var geometry	= new THREE.CubeGeometry(1,1,1);
	var material	= new THREE.MeshNormalMaterial({
		transparent : true,
		opacity: 0.5,
		side: THREE.DoubleSide
	}); 
	var mesh	= new THREE.Mesh( geometry, material );
	scene.add( mesh );
	
	var geometry	= new THREE.TorusKnotGeometry(0.3,0.1,64,16);
	var material	= new THREE.MeshNormalMaterial(); 
	var mesh	= new THREE.Mesh( geometry, material );
	scene.add( mesh );
	
  
	onRenderFcts = [function(delta){
		mesh.rotation.x += Math.PI*delta
	}]

  var params = {
    AR: true,
    renderFcts: onRenderFcts
  };

  arTool = new window.ArTool(camera, scene, params)
  arTool.animate();

})();
