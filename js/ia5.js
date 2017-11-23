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
  });

  var remap = function (v) { return Math.sqrt(0.5 + 0.5 * v); };


  var pi = Math.PI;
  function fn(x, y, t) {
    return remap(t); 
  }

  view = view
  .cartesian({
    id: "mainCartesian",
    //range: [[-1, 1], [-1, 1], [-1, 1]],
    scale: [0.5, 0.5, 0.5],
    position: [0, -1, 0]
  });

  var points = view.area({
    rangeX: [-4, 4],
    rangeY: [-3, 3],
    expr: function (emit, x, y, i, j, t) {
      var theta = x+t;
      var a = Math.cos(theta);
      var b = Math.sin(theta);
      emit(a, b+1, y);
    },
    width:  100,
    height: 100,
    channels: 3,
    axes: [1, 3],
    live: false
  });

  var colors = view.area({
    rangeX: [-3, 3],
    rangeY: [-3, 3],
    expr: function (emit, x, z, i, j, t) {
      var y = fn(x, z, t)-1;

      var r = Math.sin(y * 4) + y * y * y; 
      var g = (.5 - .5 * Math.cos(y * 3) + y * y) * .85;
      var b = y;

      emit(r, g, b, 1);
    },
    width:  100,
    height: 100,
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
    position: [0,1,0]
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
    AR: true,
    renderer: mathbox.three.renderer
  };

  if (!params.AR) three.camera.position.set(-0.15, 0.15, 3.6);
  window.scene = mathbox.three.scene;
  window.mathbox = mathbox;


  window.onload = function(e){
    var  arTool = new window.Ar(mathbox.three.camera, mathbox.three.scene, params);
    arTool.animate();
    window.activeButtons(mathbox);
  };

})();
