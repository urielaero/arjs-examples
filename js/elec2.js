;(function() {

  var charges =[ 
   [1, 1, 9.019281170524977],
   [15, -15, -7.144590402428772],
   //[30, -45, -9.144590402428772],
  ];
  var circleSize = 10;
  function calcData() {
    var cz = 2.5;
    var dxPos = [cz,0,-cz,0];
    var dyPos = [0,cz,0,-cz];
    var dxNeg = [cz, cz, -cz , -cz];
    var dyNeg = [-cz,cz,cz,-cz];
    //Iterate for each charge
    var lines = [];
    for (var chargeIndex = 0; chargeIndex < charges.length; chargeIndex++) {

        //Four lines coming from a charge
        for (var pointIndex=0; pointIndex<4; pointIndex ++) {
            var curX = charges[chargeIndex][0];
            var curY = charges[chargeIndex][1];
            var polarity = 1;
            if (charges[chargeIndex][2] < 0) {
                polarity = -1;
            }
            if (polarity > 0) {
                curX += dxPos[pointIndex];
                curY += dyPos[pointIndex];
            } else {
                curX += dxNeg[pointIndex];
                curY += dyNeg[pointIndex];
            }

            var dots = [];
            dots.push([curX, curY]);

            //Maximum of 1000 points per force line
            var times = 1000;
            while (times-- > 0) {
                var dirX = 0;
                var dirY = 0;

                var distX, distY;

                //Superposition the force vector at the current point
                for (var j = 0; j < charges.length; j++) {
                    distX = curX - charges[j][0];
                    var distXSq = distX * distX;
                    distY = curY - charges[j][1];
                    var distYSq = distY * distY;
                    var distanceSq = distXSq + distYSq;
                    //var distance = Math.sqrt(distanceSq);

                    var force = charges[j][2] / distanceSq;
                    var factor= force * polarity;// / distance;
                    dirX += distX * factor;
                    dirY += distY * factor;
                }

                //Move the next dot to follow the force vector
                var dirTotal = Math.sqrt(dirX*dirX + dirY*dirY);
                var addFactor = 7 / dirTotal;
                curX = curX + addFactor*dirX;
                curY = curY + addFactor*dirY;
                dots.push([curX, curY]);

                //If the next dot is inside a circle, terminate further iterations
                for (var l = 0; l < charges.length; l++) {
                    distX = charges[l][0] - curX;
                    distY = charges[l][1] - curY;
                    if (distX*distX + distY*distY <= 16) {
                        times=0;
                    }
                }

            }

            //Render the line
            lines.push(dots);
        }

    }
    console.log('l', lines);

    return lines;
  }

  var data = calcData();


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
      range: [[-50, 50], [-50, 50], [-1, 1]],
      scale: [1, 1, 1],
    });

  charges.forEach(function(ch) {
    var c = [ch[0], ch[1], 0];
    var color = 'blue';
    if (ch[2] < 0) {
      color = 'red';
    }
    view.array({
      data: c,
      channels: 3,
    });

    view.point({
      color: color,
      size: 10,
      depth: 1,
      shape: 'circle',
      zBias: 50
    });
  });

  data.forEach(function(dat) {
    var l = dat.map(function(d) {
      d.push(0);
      return d;
    });
    if (dat.length >= 1000) {
      return;
    }
    view.array({
      data: l,
      channels: 3
    });
    view.line({
      color: 0x3090FF,
      //width: 1,
      size: 4,
      end: true,
      zWrite: false,
      //blending: THREE.AdditiveBlending,
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
  //window.scene = mathbox.three.scene;
  //window.math = mathbox;

})();
