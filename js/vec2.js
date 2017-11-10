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
    scale: 300,
    focus: 3,
  })
  .camera({
    proxy: true,
    position: [0, 0, 0]
  })
  .cartesian({
      range: [[-10, 10], [-10, 10], [-10, 10]],
      scale: [2, 2, 2],
  });


  view.axis({
    //detail: 20,
    end: true,
    width: 2,
    zIndex: 1
  });
  view.axis({
    axis: 2,
    end: true,
    width: 2,
    zIndex: 1,
  });
  view.axis({
    axis: 3,
    end: true,
    width: 2,
    zIndex: 1
  });

  var vects = [
    [[0, 0, 0], [4, 3, 0]],
    [[0, 0, 0], [4, 0, 1]]
  ];

  var r = [[0, 0, 0],[0, 0, 0]];
  var result = vects.reduce(function(acc, vec) {
    acc = acc.map(function(a, i) {
      a[0] += vec[i][0];
      a[1] += vec[i][1];
      a[2] += vec[i][2];
      return a;
    });

    return acc;
  }, r);

  vects.push(result);

  console.log('res', vects);

  var colors = ['red', 'blue', 'green'];

  vects.forEach(function(vec, i) {
    var color = colors[i%colors.length];
    console.log('vec', vec);
    view.array({
      data: vec,
      items: 2,
      channels: 3,
    });
    view.vector({
      color: color,
      width: 3,
      depth: 1,
      size:  2,
      end: true,
      zWrite: false,
      blending: THREE.AdditiveBlending,
      zIndex: 0
    });
  });

  var params = {
    AR: true,
    //fromImage: '/img/HIRO.jpg',
    runRender: false,
    renderer: mathbox.three.renderer,
    context: mathbox.mathbox._context,
    mathbox: mathbox
  };

  if (!params.AR) three.camera.position.set(-0.15, 0.15, 3.6);

  var  arTool = new window.Ar(mathbox.three.camera, mathbox.three.scene, params);
  arTool.animate();

})();
