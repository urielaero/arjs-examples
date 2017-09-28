;(function() {

    mathbox = mathBox({
      plugins: ['core', 'controls', 'cursor'],
      controls: {
        klass: THREE.OrbitControls
      },
      camera: {
        fov: 45,
        //type: 'orthographic',
        //proxy: true,
      }
    });
    three = mathbox.three;

    three.camera.position.set(-0.15, 0.15, 3.6);
    three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

    colors = {
      x: new THREE.Color(0xFF4136),
      y: new THREE.Color(0x2ECC40),
      z: new THREE.Color(0x0074D9)
    };


    view = mathbox
    .set({
      scale: 720,
      focus: 1,
    })
    //.group()
    .cartesian({
      //position: [3, 0, 0], //clava un axis.
      range: [[-2, 2], [-1, 1], [-1, 1]],
      scale: [2, 1, 1],
    });
    console.log('view', view);
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

    mathbox.select('axis')
      .set('end', true)
      .set('width', 20); //5
      /*.bind('depth', function(t){
          //este hace que varie el depth...
          return 0.5 + 0.5 * Math.sin(t * 0.5);
      });
      */

    view.array({
      id: "colors",
      live: false,
      data: [colors.x, colors.y, colors.z].map(function (color){
        return [color.r, color.g, color.b, 1];
      }),
    });

    view.array({
      data: [[2,0,0], [0,1.11,0], [0,0,1]],
      channels: 3, // necessary
      live: false,
    }).text({
      data: ["x", "y", "z"],
    }).label({
      color: 0xFFFFFF,
      colors: "#colors",
    });

    var params = {
      AR: true,
      //fromImage: '/img/HIRO.jpg',
      runRender: false,
      renderer: mathbox.three.renderer,
      context: mathbox.mathbox._context,
      mathbox: mathbox
    };
    var  arTool = new window.ArTool(mathbox.three.camera, mathbox.three.scene, params);
    arTool.animate();
    window.scene = mathbox.three.scene;
    window.math = mathbox;

})();
