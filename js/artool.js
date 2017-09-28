;(function(window) {
  function Ar(camera, scene, params) {
    //THREEx.ArToolkitContext.baseURL = './../data';
    THREEx.ArToolkitContext.baseURL = '/arjs-examples/data';
    var self = this;
    self.params = params;
    self.context = params.context;
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
      self.renderer.setClearColor(new THREE.Color('lightgrey'), 0);
      self.renderer.setSize( window.innerWidth, window.innerHeight );
      //renderer.setPixelRatio( window.devicePixelRatio ); //bug
      self.renderer.domElement.style.position = 'absolute';
      self.renderer.domElement.style.top = '0px';
      self.renderer.domElement.style.zIndex = 1;
      self.renderer.domElement.style.left = '0px';
      document.body.appendChild( self.renderer.domElement );
    } else {

      self.renderer = self.params.renderer;
      self.renderer.setClearColor(new THREE.Color('lightgrey'), 0);
      self.renderer.setSize( window.innerWidth, window.innerHeight );
      //renderer.setPixelRatio( window.devicePixelRatio ); //bug
      self.renderer.domElement.style.position = 'absolute'
      self.renderer.domElement.style.top = '0px'
      self.renderer.domElement.style.zIndex = 1
      self.renderer.domElement.style.left = '0px'

    }

    self.onRenderFcts = self.params.renderFcts || [];
    if (self.params.runRender) {
      self.onRenderFcts.push(function(){
        self.renderer.render( scene, camera );
      })
    }

    console.log('prev!');
    if (!self.params.AR) {
      return ;
    }

    console.log('lllol');

    var paramS = {sourceType: 'webcam'};
    if (self.params.fromImage) {
            paramS = {
              sourceType: 'image',
              sourceUrl: self.params.fromImage
            };
    }
    var arToolkitSource = new THREEx.ArToolkitSource(paramS);

    arToolkitSource.init(function onReady(){
      onResize()
    })

    // handle resize
    window.addEventListener('resize', function(){
      onResize()
    })

    function onResize(){
      console.log('onresize');
      arToolkitSource.onResizeElement()	
      arToolkitSource.copyElementSizeTo(self.renderer.domElement)	
      if( arToolkitContext.arController !== null ){
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)	
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
      //canvas: self.params.context.canvas, 
      //ctx: self.params.context 
    });
    // initialize it
    arToolkitContext.init(function onCompleted(){
	    // copy projection matrix to camera
	    camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
    });

    // update artoolkit on every frame
    var cameraFake = new THREE.PerspectiveCamera();
    self.onRenderFcts.push(function(){
	    if( arToolkitSource.ready === false )	return
	    arToolkitContext.update( arToolkitSource.domElement )
	    // update scene.visible if the marker is seen

      //por alguna razon no lo hace si le paso el que viene de mathbox.
      var car = self.params.mathbox.select('cartesian');
      camera.matrix.copy(cameraFake.matrix);
      camera.matrix.decompose(camera.position, camera.quaternion, camera.scale)
      //self.params.mathbox.select('cartesian').set('position', [cameraFake.position.x, cameraFake.position.y, cameraFake.position.z]);
      //self.params.mathbox.inspect();
      camera.visible = cameraFake.visible;
	    scene.visible = camera.visible

      /*
      //por alguna razon no lo hace si le paso el que viene de mathbox.
      camera.matrix.copy(camerafake.matrix);
      //camera.matrix.getinverse( camera2.matrix )
      camera.matrix.decompose(camera.position, camera.quaternion, camera.scale)
      //camera.matrix.copyposition(camerafake.matrix);//deshaparece por completo...
      camera.visible = cameraFake.visible;
	    scene.visible = camera.visible
      */

    });

    // init controls for camera
    var markerControls = new THREEx.ArMarkerControls(arToolkitContext, cameraFake, {
	    type : 'pattern',
	    patternUrl : THREEx.ArToolkitContext.baseURL + '/markers/patt.hiro',
	    // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
	    // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
	    changeMatrixMode: 'cameraTransformMatrix'//'modelViewMatrix'//,
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
