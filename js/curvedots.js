;(function(){
    mathbox = mathBox({
      plugins: ['core', 'controls', 'cursor'],
      controls: {
        klass: THREE.OrbitControls
      },
    });
    three = mathbox.three;

    three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

    view = mathbox
    .set({
      scale: 520,
      focus: 3,
    })
    .camera({
      proxy: true,
      position: [-6.320009229020089, 3.3489745289281054, -0.2872281859469791]
    }).cartesian({
      range: [[-2, 2], [-1, 1], [-1, 1]],
      scale: [2, 1, 1],
    });


    view.interval({
      id: 'sampler',
      width: 32,
      expr: function (emit, x, i, time) {
        y = Math.sin(x + time) + (i%2)*Math.sin(x * 400000 + time * 5 + x * x * 10000)*.05;
        emit(x, y);
      },
      channels: 2,
    });

    view.spread({
      unit: 'absolute',
      height: [0, .05, 0, 0],
    });

    view.split({
      axis:    'x',
      length:  3,
      overlap: 0,
    });


    view.line({
      color: 0x3090FF,
      width: 5,
    });
    view.point({
      color: 0x3090FF,
      size: 30,
    });

    // presentation integration
    messageHandler = function (event) {
      d = event.data;
      if (d && (d = d.mathBoxDirector) && d.method == 'go') {
        v = Math.max(0, Math.min(1, d.args[0] - 3))
        mathbox.select('#sampler').set({ history: v * 25 })
      }
    }.bind(this);
    window.addEventListener('message', messageHandler);

    var params = {
      AR: false,
      fromImage: '/img/HIRO.jpg',
      renderer: mathbox.three.renderer
    }

    var  arTool = new window.ArTool(mathbox.three.camera, mathbox.three.scene, params);
    arTool.animate();

})();
