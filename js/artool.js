;(function(window) {

  function instanceMathBox() {
    var mathbox = mathBox({
      plugins: ['core', 'controls', 'cursor'],
      controls: {
        klass: THREE.OrbitControls
      }
    });

    return mathbox;
  }

  function activeButtons(mathbox, cartesian4) {
    cartesian4 = cartesian4 || '#mainCartesian';
    document.getElementById('ui').className += " show";
    document.getElementById('incrementScale').addEventListener("click", function(){
      var scale = mathbox.select(cartesian4).get('scale');
      var mag = 0.2;
      mathbox.select('#mainCartesian').set('scale', [scale.x+mag, scale.y+mag, scale.z+mag, scale.w +mag]);
      console.log('scaleUp!');
    });
    document.getElementById('decrementScale').addEventListener("click", function(){
      var scale = mathbox.select(cartesian4).get('scale');
      var mag = -0.2;
      mathbox.select('#mainCartesian').set('scale', [scale.x+mag, scale.y+mag, scale.z+mag, scale.w +mag]);
      console.log('scaleDown!');
    });
    document.getElementById('incrementTop').addEventListener("click", function(){
      var rot = mathbox.select('#mainCartesian').get('rotation');
      var mag = 0.2;
      mathbox.select('#mainCartesian').set('rotation', [rot.x+mag, rot.y+mag, rot.z+mag]);
      console.log('rotate1');
    });
  }

  function Ar(camera, scene, params) {
    if (!THREEx) {
      console.log('failed memory!');
      var reload = document.getElementById('f-reload');
      if (reload) {
        reload.className = 'button reload';
        reload.addEventListener("click", function(){
          location.reload();
        });
      }

      return ;
    }
    THREEx.ArToolkitContext.baseURL = './../data';
    if (window.location.origin.indexOf('github.io') != -1) {
      THREEx.ArToolkitContext.baseURL = '/arjs-examples/data';
    }
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
      detectionMode: 'mono', //'mono',
      maxDetectionRate: 40,
      canvasWidth: 340, //mobile eficience
      //canvasHeight: 280
      canvasHeight: 340
    });
    // initialize it
    arToolkitContext.init(function onCompleted(){
	    // copy projection matrix to camera
      cameraFake.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
	    camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
    });

    // update artoolkit on every frame
    var cameraFake = new THREE.PerspectiveCamera();
    self.onRenderFcts.push(function(){
	    if( arToolkitSource.ready === false )	return
	    arToolkitContext.update( arToolkitSource.domElement )
	    // update scene.visible if the marker is seen

      //por alguna razon no lo hace si le paso el que viene de mathbox.
      //var car = self.params.mathbox.select('cartesian');
      //modelViewMatrix...

      camera.matrix.copy(cameraFake.matrix);
      //console.log('fake.x', cameraFake.matrix.elements[12])
      //camera.matrix.elements[12] *= 2;
      camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);
      //camera.position.setX(camera.position.x*2);

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

  window.Ar = Ar;
  window.instanceMathBox = instanceMathBox;
  window.activeButtons = activeButtons;

})(window);
