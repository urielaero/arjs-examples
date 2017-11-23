;(function() {

  function mPow(b, x) {
    var n = 1;
    if (b<0 && x==1.5) {
      n =-1;
    }
    var p = Math.pow(b*n, x);
    return p*n;
  }

  function euclide(q1, q2) { 
    //r
    var x = q1[0] - q2[0];
    var y = q1[1] - q2[1];
    var z = q1[2] - q2[2];
    //console.log(x, y, z);
    x = Math.pow(x, 2);
    y = Math.pow(y, 2);
    z = Math.pow(z, 2);
    return Math.sqrt(x+y+z);
  }

  function vUnitario(q1, q2) {
    var r = euclide(q1, q2);
    var x = (q1[0] - q2[0]);
    var y = (q1[1] - q2[1]);
    var z = (q1[2] - q2[2]);
    return [x/r, y/r, z/r];
  }

  window.vu = vUnitario;


  mathbox = mathBox({
    plugins: ['core', 'controls', 'cursor'],
    controls: {
      klass: THREE.OrbitControls
    },
    camera: {
      fov: 45,
      //type: 'orthographic',
      proxy: true,
      position: [3,3,3]
    }
  });
  mathbox.camera({
    proxy: true,
    position: [0, 0, 0]
  });
  three = mathbox.three;


  view = mathbox
  .set({
    scale: 300,
    focus: 3,
  })
  .camera({
    proxy: true,
    //position: [-6.320009229020089, 3.3489745289281054, -0.2872281859469791]
    position: [0.03873908969484122, 6.185452745368619, 9.525684942183485]
  }).cartesian({
    id: 'mainCartesian',
    position:[-0.5,0,0],
    range: [[-30, 30], [-30, 30], [-3, 3]],
    scale: [1, 1, 1],
  });

  var charges = [
    [10, 10, 0],//q1 -> 10
    [20, 10, 0],//q2 -> -10
  ];
  var vol = view.volume({
    width:  60,
    height: 30,
    depth:  7,
    expr: function (emit, x, y, z, i, j, k, t) {
      /*vecor 1*/
      //z = 0;
      var q = 5;
      var r = euclide(charges[0], [x, y, z]);
      var vu = vUnitario(charges[0], [x, y, z]);
      var nX = (q/Math.pow(r, 2))*vu[0];
      var nY = (q/Math.pow(r, 2))*vu[1];
      var nZ = (q/Math.pow(r, 2))*vu[2];

      /*vector 2*/
      var q2 = -5;
      var r2 = euclide(charges[1], [x, y, z]);
      var vu2 = vUnitario(charges[1], [x, y, z]);
      var nX2 = q2/Math.pow(r2, 2)*vu2[0];
      var nY2 = q2/Math.pow(r2, 2)*vu2[1];
      var nZ2 = q2/Math.pow(r2, 2)*vu2[2];

      emit(x, y, z); //inicio
      emit(x + nX + nX2, y + nY + nY2, z + nZ + nZ2); // fin
    },
    items: 2, //2*emit
    channels: 3,//emit(1, 2, 3)
  });

  console.log('vol', vol);
  view.vector({
    color: 0x3090FF,
    width: 1,
    size: 3,
    end: true,
    //stroke: 'dashed',
    zWrite: false,
    depth: 0.5,
    blending: THREE.AdditiveBlending,
  });

  view.array({
    data: charges[1],
    channels: 3
  });

  view.point({
    color: 'red',
    size: 5,
    depth: 1,
    shape: 'circle',
    zBias: 50
  });

  view.array({
    data: charges[0],
    channels: 3
  });

  view.point({
    color: 'blue',
    size: 5,
    depth: 1,
    shape: 'circle',
    zBias: 50
  });

  //x = 2, y = 0;
  /*
  view.slice({
    source: '#mainVolume',
    height:[2, 3],
    width: [0, 1],
    items: [0, 1],
    //depth: [2, 3]
  });
  */



  // x = 3, y = 4;
  /*
  view.slice({
    source: "<<",
    height:[3, 4],
    width: [4, 5],
    items: [0, 1],
    //depth: [2, 3]
  });
  */
  /*
  view.point({
    color: 'red',
    size: 15,
    depth: 0.5,
    shape: 'circle',
    zBias: 50
  });
  */

  var params = {
    AR: true,
    //fromImage: '/img/HIRO.jpg',
    runRender: false,
    renderer: mathbox.three.renderer,
    context: mathbox.mathbox._context,
    mathbox: mathbox
  };

  if (!params.AR) three.camera.position.set(1.9235285045174615, 0.7048641117795541, -0.10372284520330993);

  //window.scene = mathbox.three.scene;
  //window.math = mathbox;
  window.onload = function() {
    var  arTool = new window.Ar(mathbox.three.camera, mathbox.three.scene, params);
    arTool.animate();
    window.activeButtons(mathbox);
  };

})();
