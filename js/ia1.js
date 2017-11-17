;(function() {
  var mathbox = window.instanceMathBox();
  three = mathbox.three;

  three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

  view = mathbox
  .set({
    scale: 720,
    focus: 3,
  })
  .camera({
    proxy: true,
    position: [0.03873908969484122, 6.185452745368619, 9.525684942183485]
  })

  var remap = function (v) { return Math.sqrt(0.1 + 0.1 * v); };

  function fn1(x, z, t) { 
    return remap(Math.sin(x * 5 + t + Math.sin(z * 3.41 + x * 1.48)));
  }

  function fn2(x, z, t) {
    return remap(Math.sin(z * 5 + t + Math.cos(x * 3.22 + z)));
  }

  //20+X**2+Y**2-10*np.cos(2*np.pi*X)-10*np.cos(2*np.pi*Y)

  var pi = Math.PI;
  function rastrigin1(x, z, t) {
    var xPow = Math.pow(x, 2);
    var zPow = Math.pow(z, 2);
    return remap(20+xPow+zPow-10*Math.cos(2*pi*x)-10*Math.cos(2*pi*z));
  }

  function rastrigin2(x, z, t) {
    return x;
  }

  view = view
  .cartesian({
    //range: [[-1, 1], [-1, 1], [-1, 1]],
    scale: [.5, .5, .5],
  });

  var points = view.area({
    rangeX: [-3, 3],
    rangeY: [-3, 3],
    expr: function (emit, x, z, i, j, t) {
      var y = rastrigin1(x, z, t);
      emit(x, y-1, z);
    },
    width:  100,
    height: 100,
    channels: 3,
    axes: [1, 3],
    live: false
  });

  var colors = view.area({
    expr: function (emit, x, z, i, j, t) {
      var y = fn1(x, z, t) * fn2(x, z, t);

      var r = Math.sin(y * 4) + y * y * y; 
      var g = (.5 - .5 * Math.cos(y * 3) + y * y) * .85;
      var b = y;

      emit(r, g, b, 1.0);
    },
    width:  32,
    height: 32,
    channels: 4,
    axes: [1, 3],
    live: false
  });

  view.surface({
    shaded: true,
    points: '<<',
    //colors: '<',
    //color: 0xFFFFFF,
    color: 'red'
  });

  view.surface({
    fill: false,
    lineX: true,
    lineY: true,
    points: '<<',
    colors: '<',
    color: 0xFFFFFF,
    width: 2,
    blending: 'add',
    opacity: .25,
    zBias: 5,
  });
  view = view.cartesian({
    range: [[0, 1], [0, 1], [0, 1]],
    scale: [3, 1, 3],
  });

  view.axis({
    axis: 1,
    width: 3,
  });
  view.axis({
    axis: 2,
    width: 3,
  });
  view.axis({
    axis: 3,
    width: 3,
  });

  view.grid({
    width: 2,
    opacity: 0.5,
    axes: [1, 2],
    zOrder: 1,
  });
  view.grid({
    width: 2,
    opacity: 0.5,
    axes: [2, 3],
    zOrder: 1,
  });
  view.grid({
    width: 2,
    opacity: 0.5,
    axes: [1, 3],
    zOrder: 1,
  });

  var params = {
    AR: false,
    renderer: mathbox.three.renderer
  }

  if (!params.AR) three.camera.position.set(-0.15, 0.15, 3.6);
  window.scene = mathbox.three.scene;
  window.mathbox = mathbox;
  var  arTool = new window.Ar(mathbox.three.camera, mathbox.three.scene, params);
  arTool.animate();

})();
