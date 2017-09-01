;(function(){
  var scene	= new THREE.Scene();
  var camera = new THREE.Camera();
  scene.add(camera);
  var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  var params = {
    renderFcts: [function(delta){
      cube.rotation.x += Math.PI*delta
    }]
  };

  arTool = new window.ArTool(camera, scene, params)
  arTool.animate();

})(window);
