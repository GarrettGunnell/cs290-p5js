p5.disableFriendlyErrors = true;

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  defineGlobals();
  defineRules();
  initializeStars();
  initializePoints();
  initializeSplashes();
  initializeRainDrops();
}

function draw() {
  resetMatrix();
  //drawStars();
  //drawPoints();
  //drawSplashes();
  //drawRainDrops();
  //drawActiveLSystem();
  activeAnimation();
}

/* Variables */

function defineGlobals() {
  stars = [];
  NUM_STARS = 1000;
  theta = 0;
  //
  points = [];
  step = 10;
  //
  splashes = [];
  NUM_SPLASHES = 50;
  //
  NUM_DROPS = 300;
  drops = [];
  ANGLE = 0;
  //
  drawingSystems = false;
  n = 0;
  length = windowWidth / 4;
  lengthModifier = sqrt(2);
  activeFunction = function() {
    translate((windowWidth / 2) - windowWidth / 8, windowHeight - 400);
    stroke(255);
    rotate(90);
    var instructions = createLSystem(n, cCurveAxiom, cCurveRules);
    var angle = 45;
    lengthModifier = sqrt(2);
    drawLSystem(instructions, angle, length);
  }
  //
  activeAnimation = function() {
    drawStars();
  }
}

/* Fractals */

function drawActiveLSystem() {
  background(81, 60, 102);
  fill(255);
  textSize(32);
  text(n, 20, 20);
  stroke(255);
  activeFunction();
}

function createLSystem(n, axiom, rules) {
  var startString = axiom;
  if (n == 0) {
    return axiom;
  }
  var endString = "";
  for (let i = 0; i < n; ++i) {
    endString = "";
    for (let j = 0; j < startString.length; ++j) {
      var current = startString.charAt(j)
      if (rules.has(current)) {
        endString += rules.get(current);
      } else {
        endString += current;
      }
    }
    startString = endString;
  }

  return endString;
}

function drawLSystem(instructions, angle, distance) {
  for (let i = 0; i < instructions.length; ++i) {
    var current = instructions.charAt(i);
    if (current == 'F' || current == 'A' || current == 'B') {
      line(0, 0, 0, -distance);
      translate(0, -distance);
    } else if (current == '+') {
      rotate(angle);
    } else if (current == '-') {
      rotate(-angle);
    } else if (current == '[') {
      push();
    } else if (current == ']') {
      pop();
    }
  }
}

function drawPlantSystem(instructions, angle, distance) {
  for (let i = 0; i < instructions.length; ++i) {
    var current = instructions.charAt(i);
    if (current == 'F' || current == 'A' || current == 'B') {
      line(0, 0, 0, -distance);
      translate(0, -distance);
    } else if (current == '+') {
      rotate(random(angle, angle + 15));
    } else if (current == '-') {
      rotate(random(-angle - 15, -angle));
    } else if (current == '[') {
      push();
    } else if (current == ']') {
      pop();
    }
  }
}

function defineRules() {
  defineCCurveRules();
  defineKochCurveRules();
  defineWildinRules();
  defineDragonCurveRules();
  definePeanoGosperCurveRules();
  defineHilbertCurveRules();
  defineArrowheadRules();
  defineBoxFractalRules();
  definePlantRules();
}

function defineCCurveRules() {
  cCurveRules = new Map();
  cCurveRules.set("F", "+F--F+");
  cCurveAxiom = "F";
}

function defineKochCurveRules() {
  kochCurveRules = new Map();
  kochCurveRules.set("F", "F+F--F+F");
  kochCurveAxiom = "F--F--F";
}

function defineWildinRules() {
  wildinRules = new Map();
  wildinRules.set("F", "+F--F+[+F--F++F--F+]");
  wildinAxiom = "F";
}

function defineDragonCurveRules() {
  dragonCurveRules = new Map();
  dragonCurveRules.set("X", "X+YF+");
  dragonCurveRules.set("Y", "-FX-Y");
  dragonCurveAxiom = "FX";
}

function definePeanoGosperCurveRules() {
  peanoGosperCurveRules = new Map();
  peanoGosperCurveRules.set("A", "A-B--B+A++AA+B-");
  peanoGosperCurveRules.set("B", "+A-BB--B-A++A+B");
  peanoGosperCurveAxiom = "A"
}

function defineHilbertCurveRules() {
  hilbertCurveRules = new Map();
  hilbertCurveRules.set("X", "XFYFX+F+YFXFY-F-XFYFX");
  hilbertCurveRules.set("Y", "YFXFY-F-XFYFX+F+YFXFY");
  hilbertCurveAxiom = "X";
}

function defineBoxFractalRules() {
  boxFractalRules = new Map();
  boxFractalRules.set("F", "F-F+F+F-F");
  boxFractalAxiom = "F-F-F-F";
}

function defineArrowheadRules() {
  arrowheadRules = new Map();
  arrowheadRules.set("X", "YF+XF+Y");
  arrowheadRules.set("Y", "XF-YF-X");
  arrowheadAxiom = "YF";
}

function definePlantRules() {
  plantRules = new Map();
  plantRules.set("X", "F+[[X]-X]-F[-FX]+X");
  plantRules.set("F", "FF");
  plantAxiom = "X";
}

function keyTyped() {
  loop();
  resetMatrix();
  n = 0;
  length = windowWidth / 4;
  if (key == '1') {
    activeAnimation = function() {
      drawStars();
    }
    drawingSystems = false;
  } else if (key == '2') {
    activeAnimation = function() {
      drawPoints();
    }
    drawingSystems = false;
  }
  else if (key == '3') {
    activeAnimation = function() {
      drawRainDrops();
    }
    drawingSystems = false;
  }
  else if (key == '4') {
    activeAnimation = function() {
      drawSplashes();
    }
    drawingSystems = false;
  }
  else if (key == '5') {
    activeAnimation = function() {
      drawActiveLSystem();
    }
    noLoop();
    drawingSystems = true;
  }
  else if (key == 'q') {
      lengthModifier = sqrt(2);
      activeFunction = function() {
          translate((windowWidth / 2) - windowWidth / 8, windowHeight - 400);
          rotate(90);
          stroke(255);
          var instructions = createLSystem(n, cCurveAxiom, cCurveRules);
          var angle = 45;
          drawLSystem(instructions, angle, length);
      }
    }
    //Koch Curve
    else if (key == 'w') {
      length = windowWidth / 3;
      lengthModifier = 3;
      activeFunction = function() {
        translate(windowWidth / 2 + (windowWidth / 12), windowHeight - 100);
        stroke(255);
        var instructions = createLSystem(n, kochCurveAxiom, kochCurveRules);
        var angle = 60;
        drawLSystem(instructions, angle, length);
      }
    }
    //Dragon Curve
    else if (key == 'e') {
      length = windowWidth / 3;
      lengthModifier = 1.45;
      activeFunction = function() {
        translate(windowWidth / 2, windowHeight - 200);
        stroke(255);
        var instructions = createLSystem(n, dragonCurveAxiom, dragonCurveRules);
        var angle = 90;
        drawLSystem(instructions, angle, length);
      }
    }
    //Peano Gosper Curve
    else if (key == 'r') {
      lengthModifier = 2.5;
      activeFunction = function() {
        translate(windowWidth / 2, windowHeight - (300 + (n * 70)));
        stroke(255);
        var instructions = createLSystem(n, peanoGosperCurveAxiom, peanoGosperCurveRules);
        var angle = 60;
        drawLSystem(instructions, angle, length);
      }
    }
    //Hilbert Curve
    else if (key == 't') {
      n = 1;
      length = windowWidth / 5;
      lengthModifier = 4;
      activeFunction = function() {
        translate(windowWidth / 2, windowHeight - 200);
        rotate(-90);
        stroke(255);
        var instructions = createLSystem(n, hilbertCurveAxiom, hilbertCurveRules);
        var angle = 90;
        drawLSystem(instructions, angle, length);
      }
    }
    //Box Fractal
    else if (key == 'y') {
      lengthModifier = 3;
      activeFunction = function() {
        translate(windowWidth / 2, windowHeight - 200);
        stroke(255);
        var instructions = createLSystem(n, boxFractalAxiom, boxFractalRules);
        var angle = 90;
        drawLSystem(instructions, angle, length);
      }
    }
    //Arrowhead Fractal
    else if (key == 'u') {
      length = windowWidth / 3;
      lengthModifier = 2;
      activeFunction = function() {
        translate((windowWidth / 2) + windowWidth / 6, windowHeight - 200);
        rotate(-30)
        stroke(255);
        var instructions = createLSystem(n, arrowheadAxiom, arrowheadRules);
        var angle = 60;
        drawLSystem(instructions, angle, length);
      }
    }
    //Plant
    else if (key == 'p') {
      lengthModifier = 2;
      length = windowHeight / 3;
      activeFunction = function() {
        translate(windowWidth / 2, windowHeight);
        stroke(255);
        var instructions = createLSystem(n, plantAxiom, plantRules);
        var angle = 20;
        drawPlantSystem(instructions, angle, length);
    }
  }
  //noLoop();
}

function mousePressed() {
  if (drawingSystems) {
    loop();
    ++n;
    length /= lengthModifier;
  }
}

function mouseReleased() {
  if (drawingSystems) {
    noLoop();
  }
}


/* Stars */

function initializeStars() {
  for (var i = 0; i < NUM_STARS; ++i) {
    x = random(10);
    if (x > 5) {
      stars[i] = initializeStar(true, 3, 5);
    } else {
      stars[i] = initializeStar(false, 2, 3);
    }

    y = random(100);
    if (y > 75) {
      stars[i].setColor(255, 255, 255);
    } else if (y > 50) {
      stars[i].setColor(255, 215, 178);
    } else if (y > 25) {
      stars[i].setColor(255, 178, 178);
    } else {
      stars[i].setColor(170, 176, 255);
    }
  }
}

function drawStars() {
  background(0, 20, 15);
  translate(windowWidth / 2, windowHeight);
  rotate(theta);
  theta -= 0.005;
  for (var i = 0; i < NUM_STARS; ++i) {
    stars[i].draw();
  }
}

function initializeStar(glowing, min, max) {
  return {
    x: random(-windowWidth * 1.5, windowWidth * 1.5),
    y: random(-windowHeight * 1.5, windowHeight * 1.5),
    size: random(min, max),
    red: 0,
    green: 0,
    blue: 0,
    transparency: 255,
    transparencyModifier: random(4, 5),
    bright: glowing,

    draw: function() {
      if (this.bright) {
        fill(color(this.red, this.green, this.blue, this.transparency));
        this.transparency -= this.transparencyModifier;
        if (this.transparency < 150 || 255 < this.transparency) {
          this.transparencyModifier *= -1;
        }
      } else {
        fill(color(this.red, this.green, this.blue, this.transparency));
      }
        //rect(this.x, this.y, this.size, this.size);
        ellipse(this.x, this.y, this.size);
        //triangle(this.x, this.y, this.x + (this.size / 2), this.y - (this.size), this.x + this.size, this.y);
    },

    setColor: function(red, green, blue) {
      this.red = red;
      this.green = green;
      this.blue = blue;
    }
  };
}

/* Rain Splashes */

function initializeSplashes() {
	for (var i = 0; i < NUM_SPLASHES; ++i) {
		splashes[i] = initializeSplash();
	}
}

function drawSplashes() {
  background(255);
  strokeWeight(0.5);
  for (var i = 0; i < NUM_SPLASHES; ++i) {
        splashes[i].draw();
  }
}

function initializeSplash() {
	return {
		maxGrowth: random(20, 40),
		x: random(windowWidth),
		y: random(windowHeight),
		transparency: 255,
		size: 0,
		growthSpeed: random(3, 5),

		draw: function() {
			noFill();
			stroke(0, this.transparency)
			ellipse(this.x, this.y, this.size);
			stroke(0, this.transparency / 2);
			ellipse(this.x, this.y, this.size + (this.size / 10));
			stroke(0, this.transparency / 3);
			ellipse(this.x, this.y, this.size + (this.size / 5));
			this.grow();
		},

		grow: function() {
			this.size += this.growthSpeed;
			this.growthSpeed -= 0.05;
			this.transparency -= 15;
			if (this.size > this.maxGrowth || this.growthSpeed <= 0.1) {
				this.reset();
			}
		},

		reset: function() {
			this.growthSpeed = random(3, 5);
			if (this.growthSpeed > 2.5) {
				this.maxGrowth = random(40, 45);
			} else {
				this.maxGrowth = random(35, 40);
			}
			this.x = random(this.maxGrowth, windowWidth - this.maxGrowth);
			this.y = random(this.maxGrowth, windowHeight - this.maxGrowth);
			this.size = 0;
			this.transparency = 255;
		}
	}
}

/* Rain Drops */

function drawRainDrops() {
  noStroke();
  background(135);

  for (let i = 0; i < NUM_DROPS; ++i) {
    drops[i].draw();
  }
  drawWindow();
}

function drawWindow() {
  //
  //inner window strips
  fill(75);
  rect(windowWidth / 6 + 9, 80, 18, windowHeight);
  rect(windowWidth * (2 / 6) - 9, 80, -18, windowHeight);
  rect(windowWidth * (4 / 6) + 9, 80, 18, windowHeight);
  rect(windowWidth * (5 / 6) - 9, 80, -18, windowHeight);
  fill(70);
  rect(0, windowHeight / 3 - 9, windowWidth, 18);
  rect(0, windowHeight * (2 / 3) + 9, windowWidth, -18);
  //wall
  fill(75);
  rect(0, 0, 50, windowHeight);
  rect(0, 0, windowWidth, 50);
  rect(0, windowHeight, windowWidth, -50);
  rect(windowWidth, 0, -50, windowHeight);
  //
  //window frame
  fill(48);
  rect(25, 20, 60, windowHeight - 40);
  rect(25, 20, windowWidth - 50, 60);
  rect(25, windowHeight - 20, windowWidth - 50, -60);
  rect(windowWidth - 25, 20, -60, windowHeight - 40);
  rect((windowWidth / 2) - 100, 20, 200, windowHeight - 40)
  //
  // long window line things
  fill(35);
  rect(20, 55, windowWidth - 40, 22);
  rect(20, windowHeight - 75, windowWidth - 40, 22);
  //
  //inner tiny frame
  fill(60);
  rect(85, 80, 5, windowHeight - 160);
  rect(85, 80, (windowWidth / 2) - 185, 5);
  rect((windowWidth / 2) - 100, 80, -5, windowHeight - 160);
  rect((windowWidth / 2) + 100, 80, 5, windowHeight - 160);
  rect((windowWidth / 2) + 100, 80, (windowWidth / 2) - 185, 5);
  rect(windowWidth - 85, 80, -5, windowHeight - 160);
}

function initializeRainDrops() {
  for (let i = 0; i < NUM_DROPS; ++i) {
    drops[i] = initializeRainDrop();
  }
}

function initializeRainDrop() {
  return {
    x: random(windowWidth),
    y: random(windowHeight),
    speed: random(20, 30),
    length: random(45, 50),
    color: 240,
    angle: random(0, 2),
    transparency: random(75, 100),
    draw: function() {
      push()
      translate(this.x, this.y);
      rotate(this.angle + ANGLE);
      fill(this.color, this.transparency);
      //line(0, 0, 0, 0 + this.length);
      quad(0, 0,
          0 - 0.7, 0 + (this.length * 0.95),
          0, 0 + this.length,
          0 + 0.7, 0 + (this.length * 0.95));
      pop();
      this.y += this.speed;
      if ((this.angle + ANGLE) < 0) {
        this.x += sin(this.angle + ANGLE) * this.speed;
      } else {
        this.x -= sin(this.angle + ANGLE) * this.speed;
      }
      if (this.y - this.length > windowHeight) {
        this.reset();
      } else if (this.x < 0) {
        this.x = windowWidth;
      }
    },
    reset: function() {
      this.x = random(windowWidth);
      this.length = random(45, 50);
      this.y = 0 - this.length;
      this.color = 240;
      this.angle = random(0, 3);
      this.speed = random(40, 50);
      if (this.speed > 44) {
        this.color = random(180, 220);
        this.transparency = random(80, 100);
      } else {
        this.color = random(230, 255);
        this.transparency = random(100, 120);
      }
    }
  }
}

/* Sin */

function initializePoints() {
  for (let i = 0; i < (windowWidth / step); ++i) {
    points[i] = initializePoint(i);
  }
}

function initializePoint(i) {
  return {
    x: i * step - (windowWidth / 2),
    y: 0,
    time: 0,

    draw: function(iterator) {
      var r = map(this.x, -(windowWidth / 2), (windowWidth / 2), 100, 255, true);
      var b = map(this.y, -50, 50, 100, 255, true);
      this.y = sin((this.x - this.time)) * 60;
      fill(r, 100, b);
      ellipse(this.x, this.y, 5);
      this.time += 1;
    }
  };
}

function drawPoints() {
  noStroke();
  background(255);
  translate(windowWidth / 2, windowHeight / 2);
  for (let i = 0; i < (windowWidth / step); ++i) {
    points[i].draw(i);
  }
}
