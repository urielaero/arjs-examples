;(function() {
    mathbox = mathBox();
    mathbox.camera({
      proxy: true,
      position: [0, 0, 0]
    });
    three = mathbox.three;

    //three.camera.position.set(2.3, 1, 2);
    three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

    time = 0
    angle = 0
    deform = 0
    skew = 0

    fa = 6
    fb = 4

    three.on('update', function () {
      time = three.Time.clock * .6
      angle = wobbler(time / 5) * .6 + π/4 + .2;
      skew = wobbler(time / 16.1) * .25;
      deform = wobbler(time / 7.1)

      if (deform == 0) {
        fa = (Math.ceil(Math.random() * 2) + 1) * 2
        fb = (Math.ceil(Math.random() * 2) + 1) * 2
      }

      deform *= cosineEase(time - 2)
    });

    clamp = function (x, a, b) {
      return Math.max(a, Math.min(b, x));
    };

    cosineEase = function (t) {
      return .5 - .5 * Math.cos(clamp(t, 0, 1) * π);
    };

    wobbler = function (t) {
      t = Math.sin(Math.min(1, Math.max(-1, .7*Math.asin(Math.cos(π*t))))*τ/4);
      return t*.5-.5;
    };

    hopf = function (emit, ϕ, θ, γ) {
      η  = θ / 2 + (Math.cos(ϕ * 2 + time) * skew + Math.cos(ϕ * fa)) * .15 * deform
      ξ1 = ϕ + Math.cos(γ * fb + time)*.25 * deform
      ξ2 = γ

      sum  = ξ1 + ξ2
      diff = ξ1 - ξ2

      s = Math.sin(η)
      c = Math.cos(η)

      x = Math.cos(sum)  * s
      y = Math.sin(sum)  * s
      z = Math.cos(diff) * c
      w = Math.sin(diff) * c

      emit(z, y, w, x);
    };

    view = mathbox
      .unit({
        scale: 1700,
      })
      .stereographic4({
        range: [[-4, 4], [-4, 4], [-4, 4], [-1, 1]],
        scale: [4, 4, 4, 1],
      });

    view.area({
      rangeX: [-π, π],
      rangeY: [-π/2, π/2],
      width: 127,
      height: 16,
      centeredX: false,
      centeredY: true,
      expr: function (emit, x, y, i, j) {
        ϕ = y
        θ = angle
        hopf(emit, ϕ, θ, x);
      },
      channels: 4,
    });
    view.line({
      color: 0x3080FF,
      zBias: 10,
      width: 3
    });

    view.area({
      rangeX: [-π, π],
      rangeY: [-.6, .6],
      width: 127,
      height: 63,
      expr: function (emit, x, y, i, j) {
        ϕ = y + time
        θ = angle
        hopf(emit, ϕ, θ, x);
      },
      channels: 4,
    });
    view.surface({
      shaded: true,
      color: 0x3080FF,
      zBias: -5,
    });

    view.area({
      rangeX: [-π, π],
      rangeY: [-π/2, π/2],
      width: 127,
      height: 63,
      expr: function (emit, x, y, i, j) {
        ϕ = y
        θ = angle
        hopf(emit, ϕ, θ, x);
      },
      channels: 4,
    });
    view.surface({
      shaded: true,
      color: 0xffffff,
      opacity: .5,
      zBias: -10,
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


    window.onload = function() {
      var  arTool = new window.Ar(mathbox.three.camera, mathbox.three.scene, params);
      arTool.animate();
      window.activeButtons(mathbox);
    };
    //window.scene = mathbox.three.scene;
    //window.math = mathbox;

    /*
    mathbox.camera({
      proxy: true,
      position: [0, 0, 0]
    });
    three = mathbox.three;

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
    */

    
   // mathbox.select('axis')
    //  .set('end', true)
    //  .set('width', 20); //5
      /*.bind('depth', function(t){
          //este hace que varie el depth...
          return 0.5 + 0.5 * Math.sin(t * 0.5);
      });
      */

    /*
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

    //if (!params.AR) three.camera.position.set(-0.15, 0.15, 3.6);

    var  arTool = new window.ArTool(mathbox.three.camera, mathbox.three.scene, params);
    arTool.animate();
    //window.scene = mathbox.three.scene;
    //window.math = mathbox;
    */


})();
