;(function() {
    mathbox = mathBox();
    three = mathbox.three;

    three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

    view = mathbox
    .set({
      scale: 520,
      focus: 3,
    })
    .camera({
      proxy: true,
      position: [0.03873908969484122, 6.185452745368619, 9.525684942183485]
    })
    .cartesian({
      range: [[0, 1], [0, 1], [0, 1]],
      scale: [1, 2/3, 1],
    });

    view.axis({
      axis: 1,
      width: 3,
    });
    view.axis({
      axis: 2,
      width: 3,
    });
    view.axis({
      axis: 3,
      width: 3,
    });

    view.grid({
      width: 2,
      opacity: 0.5,
      axes: [1, 2],
      zOrder: 1,
    });
    view.grid({
      width: 2,
      opacity: 0.5,
      axes: [2, 3],
      zOrder: 1,
    });
    view.grid({
      width: 2,
      opacity: 0.5,
      axes: [1, 3],
      zOrder: 1,
    });

    var remap = function (v) { return Math.sqrt(.5 + .5 * v); };

    var points = view.area({
      expr: function (emit, x, z, i, j, t) {
        var y = remap(Math.sin(x * 5 + t + Math.sin(z * 3.41 + x * 1.48)))
              * remap(Math.sin(z * 5 + t + Math.cos(x * 3.22 + z)));
        emit(x, y, z);
      },
      width:  32,
      height: 32,
      channels: 3,
      axes: [1, 3],
    });

    var colors = view.area({
      expr: function (emit, x, z, i, j, t) {
        var y = remap(Math.sin(x * 5 + t + Math.sin(z * 3.41 + x * 1.48)))
              * remap(Math.sin(z * 5 + t + Math.cos(x * 3.22 + z)));

        var r = Math.sin(y * 4) + y * y * y; 
        var g = (.5 - .5 * Math.cos(y * 3) + y * y) * .85;
        var b = y;

        emit(r, g, b, 1.0);
      },
      width:  32,
      height: 32,
      channels: 4,
      axes: [1, 3],
    });

    view.surface({
      shaded: true,
      points: '<<',
      colors: '<',
      color: 0xFFFFFF,
    });

    view.surface({
      fill: false,
      lineX: true,
      lineY: true,
      points: '<<',
      colors: '<',
      color: 0xFFFFFF,
      width: 2,
      blending: 'add',
      opacity: .25,
      zBias: 5,
    });

    var params = {
      AR: true,
      renderer: mathbox.three.renderer
    }

    if (!params.AR) three.camera.position.set(-0.15, 0.15, 3.6);
    window.scene = mathbox.three.scene;
    window.mathbox = mathbox;

    window.onload = function() {
      var  arTool = new window.Ar(mathbox.three.camera, mathbox.three.scene, params);
      arTool.animate();
    }

})();
