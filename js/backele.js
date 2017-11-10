;(function() {

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

    view.volume({
      width:  5,
      height: 5,
      depth:  5,
      expr: function (emit, x, y, z, i, j, k, t) {
        //var u = Math.cos((i + j*j + k*k*k) * 100.681 + t) * .05;
        //var v = Math.cos((i*i*i + j + k*k) * 120.681 + t) * .05;
        //var w = Math.cos((i*i + j*j*j + k) * 140.681 + t) * .05;
        var u = 0.1;
        var v = 0.1;
        var w = 0.1;
        emit(x, y, z); //inicio
        emit(x + u, y + v, z + w); // fin
        // de cada vector
      },
      items: 2,
      channels: 3,
    });
    view.vector({
      color: 0x3090FF,
      width: 1,
      size: 4,
      end: true,
      zWrite: false,
      blending: THREE.AdditiveBlending,
    });

    view.slice({
      height:[1, 2],
      width: [0, 1],
      items: [0, 1],
      depth: [2, 3]
    });

    view.point({
      color: new THREE.Color(0x3090FF),
      size: 15,
      depth: 0.5,
      shape: 'circle',
      zBias: 50
    });


    view.slice({
      source: "<<",
      height:[3, 4],
      width: [4, 5],
      items: [0, 1],
      depth: [2, 3]
    });

    view.point({
      color: 'red',
      size: 15,
      depth: 0.5,
      shape: 'circle',
      zBias: 50
    });


    /*
    var rad = 1000;
    var m = new THREE.Vector3(0, rad, 0);
    view.array({
      width: 2,
      expr: function (emit, i) {
        emit(0, 0, 0);
        emit(m.x / 2000, m.y / 2000, m.z / 2000);
      },
      channels: 3,
    });
    */

    /*
    view.resample({
      height: 1,
      width: 1,
      items: 1,
      depth: 1,
      paddingX: 0.7,
      paddingY: 0.5,
      paddingZ: 5,
    });

    view.point({
      color: new THREE.Color(0x3090FF),
      size: 15,
      depth: 0.5,
      shape: 'circle',
      zBias: 50
    });

    
    view.resample({
      width: 1,
      items: 1,
      depth: 1,
      paddingZ: 5,
      paddingW: 5
    })
    view.point({
      color: 'red',
      size: 15,
      depth: 0.5,
      shape: 'circle',
      zBias: 50
    });
    */

    /*
    view.point({
      // The neat trick: use the same data for position and for color!
      // We don't actually need to specify the points source since we just defined them
      // but it emphasizes what's going on.
      // The w component 1 is ignored as a position but used as opacity as a color.
      points: "#volume",
      colors: "#volume",
      // Multiply every color component in [0..1] by 255
      color: 0xffffff,
      size: 20,
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
