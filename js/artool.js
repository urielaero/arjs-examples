;(function(window) {
  function Ar(camera, scene, params) {
    THREEx.ArToolkitContext.baseURL = './../data'
    var self = this;
    self.params = params;
    setUp(self, camera, scene);
    self.animate = animate.bind(null, self);
  }

  function setUp(self, camera, scene) {
    // init renderer

    if (!self.params.renderer) {
    self.renderer	= new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      //logarithmicDepthBuffer: true, //bug
    });
      self.renderer.setClearColor(new THREE.Color('lightgrey'), 0)
      self.renderer.setSize( window.innerWidth, window.innerHeight );
      //renderer.setPixelRatio( window.devicePixelRatio ); //bug
      self.renderer.domElement.style.position = 'absolute'
      self.renderer.domElement.style.top = '0px'
      self.renderer.domElement.style.zIndex = 1
      self.renderer.domElement.style.left = '0px'
      document.body.appendChild( self.renderer.domElement );
    } else {

      self.renderer = self.params.renderer;
      self.renderer.setClearColor(new THREE.Color('lightgrey'), 0)
      self.renderer.setSize( window.innerWidth, window.innerHeight );
      //renderer.setPixelRatio( window.devicePixelRatio ); //bug
      self.renderer.domElement.style.position = 'absolute'
      self.renderer.domElement.style.top = '0px'
      self.renderer.domElement.style.zIndex = 1
      self.renderer.domElement.style.left = '0px'

    }

    self.onRenderFcts = self.params.renderFcts || [];
    self.onRenderFcts.push(function(){
      //self.renderer.render( scene, camera );
    })

    console.log('prev!');
    if (!self.params.AR) {
      return ;
    }

    console.log('lllol');

    var arToolkitSource = new THREEx.ArToolkitSource({
      sourceType : 'webcam',
    });

    arToolkitSource.init(function onReady(){
      onResize()
    })

    // handle resize
    window.addEventListener('resize', function(){
      onResize()
    })

    function onResize(){
      console.log('onresize');
      arToolkitSource.onResize()	
      arToolkitSource.copySizeTo(self.renderer.domElement)	
      if( arToolkitContext.arController !== null ){
        arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
      }	
      /*
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix && camera.updateProjectionMatrix();
      self.renderer.setSize( window.innerWidth, window.innerHeight );
      */
    }

    // create atToolkitContext
    var arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '/markers/camera_para.dat',
      detectionMode: 'mono',
    });
    // initialize it
    arToolkitContext.init(function onCompleted(){
	    // copy projection matrix to camera
	    camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
    });

    // update artoolkit on every frame

    var camera2 = new THREE.PerspectiveCamera();
    self.onRenderFcts.push(function(){
	    if( arToolkitSource.ready === false )	return
	    arToolkitContext.update( arToolkitSource.domElement )
	    // update scene.visible if the marker is seen

      
      //por alguna razon no lo hace si le paso el que viene de mathbox.
      camera.matrix.copy(camera2.matrix);
      camera.matrix.decompose(camera.position, camera.quaternion, camera.scale)
      camera.visible = camera2.visible;
	    scene.visible = camera.visible
    });

    // init controls for camera
    var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera2, {
	    type : 'pattern',
	    patternUrl : THREEx.ArToolkitContext.baseURL + '/markers/patt.hiro',
	    // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
	    // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
	    changeMatrixMode: 'cameraTransformMatrix',
      debug: true
    });
    // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
    scene.visible = false
    //scene.visible = true
    //camera.visible = true;
  }

  function animate(self) {
    var lastTimeMsec= null
    requestAnimationFrame(function animate(nowMsec){
	    // keep looping
	    requestAnimationFrame( animate );
	    // measure time
	    lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	    var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	    lastTimeMsec	= nowMsec
	    // call each update function
	    self.onRenderFcts.forEach(function(onRenderFct){
		    onRenderFct.call(self, deltaMsec/1000, nowMsec/1000)
	    })
    })
  }

  window.ArTool = Ar;
})(window);
