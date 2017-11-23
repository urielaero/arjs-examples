;(function() {

  var mathbox = window.instanceMathBox();

  view = mathbox
  .set({
    scale: 900,
    focus: 3,
  })
  .camera({
    proxy: true,
    //position: [-6.320009229020089, 3.3489745289281054, -0.2872281859469791]
    //position: [-0.41368015646357165, -0.4799616153530467, 9.979905088523493]
     // position: [0.03873908969484122, 6.185452745368619, 10.525684942183485]
    position: [0.41035287236906653, 121.3604305884754, 18.57113163425204]
  }).cartesian({
    id: 'mainCartesian',
    range: [[-10, 10], [-10, 10], [-10, 10]],
    scale: [0.2, 0.2, 0.2],
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
    range: [-50, 50],
    width: 1000,
    centered: true,
    //expr: function (emit, x, y, z, i, j, k, time) {
    expr: function (emit, x, i, time, delta) {
      var theta = x + delta;
      var a = theta*10*Math.cos(theta);
      var b = theta*Math.sin(theta);
      emit(a, b, theta);
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

  //if (!params.AR) mathbox.three.camera.position.set(1.9235285045174615, 0.7048641117795541, -0.10372284520330993);


  //window.scene = mathbox.three.scene;

  window.onload = function() {
    var  arTool = new window.Ar(mathbox.three.camera, mathbox.three.scene, params);
    arTool.animate();
    window.activeButtons(mathbox);
  };

})();
