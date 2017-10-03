;(function(){
  var scene	= new THREE.Scene();
  var camera = new THREE.Camera();
  scene.add(camera);
  var geometry	= new THREE.CubeGeometry(1, 1, 1);
  var material	= new THREE.MeshNormalMaterial({
    transparent : true,
	  opacity: 0.5,
	  side: THREE.DoubleSide
  }); 
  var mesh	= new THREE.Mesh( geometry, material );
  mesh.position.y	= geometry.parameters.height/2
  scene.add( mesh );

  var geometry	= new THREE.TorusKnotGeometry(0.2, 0.1, 3, 10);
  var material	= new THREE.MeshNormalMaterial(); 
  var mesh	= new THREE.Mesh( geometry, material );
  mesh.position.y	= 0.5
  scene.add( mesh );

  var params = {
    AR: true,
    renderFcts: [function(delta){
      mesh.rotation.x += Math.PI*delta
    }],
    runRender: true
  };

  arTool = new window.ArTool(camera, scene, params)
  arTool.animate();

})(window);
