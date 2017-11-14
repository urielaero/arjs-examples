;(function() {

  var mathbox = window.instanceMathBox();

  view = mathbox
  .set({
    scale: 300,
    focus: 3,
  })
  .camera({
    proxy: true,
    position: [-6.320009229020089, 3.3489745289281054, -0.2872281859469791]
  }).cartesian({
    range: [[-6, 6], [-3, 3], [-1, 1]],
    scale: [1, 1, 1],
  });

  view.interval({
    width: 200,
    centered: true,
    //expr: function (emit, x, y, z, i, j, k, time) {
    live: false,
    expr: function (emit, x, i, time, delta) {
      var theta = x + delta;
      var w = 2;
      var r = 3;
      var a = r*Math.cos(w*theta);
      var b = r*Math.sin(w*theta);
      var c = 0.2*theta;
      emit(a, b, c);
    },
    items: 1,
    channels: 3,
  });

  view.line({
    color: 0x3090FF,
    width: 15,
    size: 2.5,
    //start: true,
    //end: true,
  });

  var params = {
    AR: true,
    //fromImage: '/img/HIRO.jpg',
    runRender: false,
    renderer: mathbox.three.renderer,
    context: mathbox.mathbox._context,
    mathbox: mathbox
  };

  if (!params.AR) mathbox.three.camera.position.set(1.9235285045174615, 0.7048641117795541, -0.10372284520330993);

  var  arTool = new window.Ar(mathbox.three.camera, mathbox.three.scene, params);
  arTool.animate();
  //window.scene = mathbox.three.scene;
  //window.math = mathbox;

})();