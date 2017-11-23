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
    id: 'mainCartesian',
    range: [[-6, 6], [-3, 3], [-1, 1]],
    scale: [1, 1, 1],
  });

    colors = {
      x: new THREE.Color(0xFF4136),
      y: new THREE.Color(0x2ECC40),
      z: new THREE.Color(0x0074D9)
    };

    view.axis({
      color: colors.x,
    });
    view.axis({
      axis: 2, // "y" also works
      color: colors.y,
    });
    view.axis({
      axis: 3,
      color: colors.z,
    });



  view.interval({
    width: 300,
    centered: true,
    //expr: function (emit, x, y, z, i, j, k, time) {
    live: false,
    expr: function (emit, x, i, time, delta) {
      var theta = x + time;
      var w1 = 1; //a
      var w2 = 2; //b
      var w3 = 1; //c
      var w4 = 3; //d
      var j = 3;
      var k = 3;
      var r = 3;
      var a = Math.cos(w1*theta)-Math.pow(Math.cos(w2*theta), j);
      var b = Math.sin(w3*theta)-Math.pow(Math.sin(w4*theta), k);
      var c = 0.1*theta;
      emit(a, b, c);
    },
    items: 1,
    channels: 3,
  });

  view.line({
    color: 0x3090FF,
    width: 2,
    size: 2.5,
    //start: true,
    //end: true,
    depth: 1,
    closed: true,
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


  window.onload = function() {
    var  arTool = new window.Ar(mathbox.three.camera, mathbox.three.scene, params);
    arTool.animate();
    window.activeButtons(mathbox);
  };
  //window.scene = mathbox.three.scene;
  //window.math = mathbox;

})();
