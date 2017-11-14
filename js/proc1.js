;(function(){

  mathbox = mathBox({
    plugins: ['core', 'controls', 'cursor'],
    controls: {
      klass: THREE.OrbitControls
    },
  });
  three = mathbox.three;

  //three.camera.position.set(3.5, 1.4, 3.6);
  three.camera.position.set(6, 1, 1);
  three.renderer.setClearColor(new THREE.Color(0x204060), 1.0);

  time = 0
  three.on('update', function () {
    clock = three.Time.clock
    time = clock / 4

    t = Math.max(clock - 1, 0) / 12
    t = t < .5 ? t * t : t - .25

    o = .5 - .5 * Math.cos(Math.min(1, t) * π)

    c = Math.cos(t);
    s = Math.sin(t);
    //view.set('quaternion', [0, -s, 0, c]);
    surface.set('opacity', 1 - o * .25);

    f = 1 + o;
    //view.set('range', [[-3 * f, 3 * f], [0, 6], [-3 * f, 3 * f]]);
    //view.set('scale', [2*f, 2, 2*f]);
  });

  view = mathbox
    .unit({
      scale: 720,
    })
    .cartesian({
      range: [[-3, 3], [0, 6], [-3, 3]],
      scale: [2, 2, 2],
    });
  
  setInterval(function() {
    console.log('11'); 
  }, 6000);

  view.grid({
    width: 5,
    opacity: 0.5,
    axes: [1, 3],
  });

  view.area({
    width: 36,
    height: 36,
    items: 2,
    axes: [1, 3],
    expr: function (emit, x, y, i, j) {
      a = (Math.sin(i * 31.718 - time) * Math.sin(j * 21.131 + time))
      b = (Math.sin(i * 27.41 + time) * Math.sin(j * 11.91 + 5 * Math.cos(i * 4.1) + time))
      emit(x, 3 * (1 + a), y);
      emit(x, 3 * (1 + a + b * .25), y);
    },
    channels: 3,
  });
  view.vector({
    color: 0xA0D0FF,
    width: 5,
    start: false,
    end: true,
  });

  view.area({
    id: 'sampler',
    width: 83,
    height: 83,
    axes: [1, 3],
    expr: function (emit, x, y, i, j) {
      emit(x, 3 * (.5 + .5 * (Math.sin(x + time) * Math.sin(y + time))), y);
    },
    channels: 3,
  });
  view.surface({
    lineX: true,
    lineY: true,
    shaded: true,
    color: 0x5090FF,
    width: 5,
  });

  surface = mathbox.select('surface')
  vector = mathbox.select('vector')
  window.mathbox = mathbox;

  var params = {
    AR: false,
    //fromImage: '/img/HIRO.jpg',
    runRender: false,
    renderer: mathbox.three.renderer,
    context: mathbox.mathbox._context,
    mathbox: mathbox
  };

  //if (!params.AR) three.camera.position.set(-0.15, 0.15, 3.6);

  var  arTool = new window.Ar(mathbox.three.camera, mathbox.three.scene, params);
  arTool.animate();


})();
