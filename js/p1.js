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
    range: [[-6, 6], [-1, 1], [-1, 1]],
    scale: [1, 1, 1],
  });

  view.interval({
    width: 128,
    expr: function (emit, x, i, time) {

      var theta = x + time;
      var a = Math.cos(theta);
      var b = Math.sin(theta);
      emit(x, a, b);
    },
    items: 1,
    channels: 3,
  });

  view.line({
    color: 0x3090FF,
    width: 10,
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
  window.math = mathbox;

})();
