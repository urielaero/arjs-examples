;(function() {

  function mPow(b, x) {
    var n = 1;
    if (b<0 && x==1.5) {
      n =-1;
    }
    var p = Math.pow(b*n, x);
    return p*n;
  }

  //p1 -> x = 2, y = 0;
  //p2 -> x = 3, y = 4;
  var Q1 = [[-15, 2, 0], [5, 3, 4]];//[q, x, y]
  var N = 5;
  var Ex = [];
  var Ey = [];

  for (var i=0; i<N; i++) {
    var exs = [];
    var eys = [];
    for (var j=0; j<N; j++) {
      var ex = 0;
      var ey = 0;
      for(var d=0; d<Q1.length;d++) {
        var dat = Q1[d];
        var c = dat[0] * (i-dat[1]) / mPow((mPow((i-dat[1]), 2) + (mPow(j-dat[2], 2))), 1.5);
        ex += c;
        if (i==2 && j == 0) {
          console.log('b', mPow((mPow((i-dat[1]), 2) + (mPow(j-dat[2], 2))), 1.5));
          console.log('c', c);
        }
        ey += dat[0] * (j-dat[1]) / mPow((mPow((i-dat[1]), 2) + (mPow(j-dat[2], 2))), 1.5);
      }
      exs.push(ex);
      eys.push(ey);
    }
    Ex.push(exs);
    Ey.push(eys);
  }

  console.log('Ex', Ex);
  console.log('Ey', Ey);


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
    position: [-6.320009229020089, 3.3489745289281054, -0.2872281859469791]
  }).cartesian({
    range: [[0, 1], [0, 1], [0, 1]],
    scale: [1, 1, 1],
  });

  var vol = view.volume({
    id: 'mainVolume',
    width:  5,
    height: 5,
    depth:  1,
    expr: function (emit, x, y, z, i, j, k, t) {
      var ex = Ex[i][j];
      var ey = Ey[i][j];
      emit(0.5, 0, z); //inicio
      emit(0.5 + ex, 0 + ey, z); // fin
    },
    items: 2, //2*emit
    channels: 3,//emit(1, 2, 3)
  });

  console.log('vol', vol);
  view.vector({
    color: 0x3090FF,
    width: 1,
    size: 4,
    end: true,
    zWrite: false,
    blending: THREE.AdditiveBlending,
  });

 view.volume({
    width:  5,
    height: 5,
    depth:  1,
    expr: function (emit, x, y, z, i, j, k, t) {
      var ex = Ex[i][j];
      var ey = Ey[i][j];
      emit(0.75, 1, z); //inicio
      emit(0.75 + ex, 1 + ey, z); // fin
    },
    items: 2, //2*emit
    channels: 3,//emit(1, 2, 3)
  });

  view.vector({
    color: 0x3090FF,
    width: 1,
    size: 4,
    end: true,
    zWrite: false,
    blending: THREE.AdditiveBlending,
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

  view.volume({
    width: 5,
    height: 5,
    depth: 1,
    expr: function (emit, x, y, z, i, j, k, t) {
      if (i == 2 && j === 0) {
        emit(x, y, z);
      }
    },
    items: 1,
    channels: 3,

  });

  view.point({
    color: 'blue',
    size: 15,
    depth: 0.5,
    shape: 'circle',
    zBias: 50
  });

  view.volume({
    width: 5,
    height: 5,
    depth: 1,
    expr: function (emit, x, y, z, i, j, k, t) {
      if (i== 3 && j == 4) {
        emit(x, y, z);
      }
    },
    items: 1,
    channels: 3,
  });


  view.point({
    color: 'red',
    size: 15,
    depth: 0.5,
    shape: 'circle',
    zBias: 50
  });

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
    AR: false,
    //fromImage: '/img/HIRO.jpg',
    runRender: false,
    renderer: mathbox.three.renderer,
    context: mathbox.mathbox._context,
    mathbox: mathbox
  };

  if (!params.AR) three.camera.position.set(-0.15, 0.15, 3.6);

  var  arTool = new window.Ar(mathbox.three.camera, mathbox.three.scene, params);
  arTool.animate();
  //window.scene = mathbox.three.scene;
  //window.math = mathbox;

})();
