const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let g_selectedColor = [1,1,1,1]
let g_selectedSides = 3;
var g_shapesList = [];
let g_globalAngleY = -10;

let g_globalAngle = 35;
let g_rwingAngle = 0;
let g_beakAngle = 0;
let g_legsAngle = 0;
let g_beakAnimation = false;
let g_wingsAnimation = false;
let g_legsAnimation = false;
let g_flyAnimation = false;

var VSHADER_SOURCE =
	    'attribute vec4 a_Position;\n' +
	    'uniform mat4 u_ModelMatrix;\n' +
	    'uniform mat4 u_GlobalRotateMatrix;\n' +
	    'void main() {\n' +
            '  gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;' +	
	    '}\n';

var FSHADER_SOURCE =
	    'precision mediump float;\n' +
	    'uniform vec4 u_FragColor;\n' + 
	    'void main() {\n' +
	    '  gl_FragColor = u_FragColor;\n' +
	    '}\n';


function setUpWebGL(){
	canvas = document.getElementById('webgl');
	if(!canvas){
		console.log('Failed to get <canvas> element');
		return;
	}
	gl = getWebGLContext(canvas);
	if(!gl){
		console.log('Failed to get rendering context for WebGL');
		return;
	}
	gl.enable(gl.DEPTH_TEST);
}


function addActionForHtmlUI(){
	document.getElementById('clear').onclick = function(){
		g_shapesList = [];
		renderScene();
	};

	document.getElementById('animationBeakOffButton').onclick = function() {g_beakAnimation = false;};
	document.getElementById('animationBeakOnButton').onclick = function() {g_beakAnimation = true;};

	document.getElementById('animationWingsOffButton').onclick = function() {g_wingsAnimation = false;};
	document.getElementById('animationWingsOnButton').onclick = function() {g_wingsAnimation = true;};

	document.getElementById('animationLegsOffButton').onclick = function() {g_legsAnimation = false;};
	document.getElementById('animationLegsOnButton').onclick = function() {g_legsAnimation = true;};

	document.getElementById('animationFlyOffButton').onclick = function() {g_flyAnimation = false;};
	document.getElementById('animationFlyOnButton').onclick = function() {g_flyAnimation = true;};



	// angle slider event
	document.getElementById('angleSlide').addEventListener('mousemove',function(){
		g_globalAngle = this.value;
		renderScene();
	});

	document.getElementById('angleYSlide').addEventListener('mousemove', function(){
	    g_globalAngleY = this.value;
	        renderScene();
	});
		


/**	document.getElementById('yellowSlide').addEventListener('mousemove', function(){
		g_yellowAngle = this.value;
		renderScene();

	});

	document.getElementById('magentaSlide').addEventListener('mousemove', function(){
		g_magentaAngle = this.value;
		renderScene();
	});**/

	document.getElementById('beakSlide').addEventListener('mousemove', function(){
		g_beakAngle = this.value;
		renderScene();
	});

	document.getElementById('rwingSlide').addEventListener('mousemove', function(){
		g_rwingAngle = this.value;
		renderScene();
	});

	document.getElementById('legsSlide').addEventListener('mousemove', function(){
		g_legsAngle = this.value;
		renderScene();
	});


	document.getElementById('animationFlyOnButton').onclick = function() {
		    g_beakAnimation = true;
		    g_wingsAnimation = true;
		    g_legsAnimation = true;
	};

	document.getElementById('animationFlyOffButton').onclick = function() {
		    g_beakAnimation = false;
		    g_wingsAnimation = false;
		    g_legsAnimation = false;
	};


}


function main(){
	setUpWebGL();
	connectVariablesToGLSL();
	addActionForHtmlUI();
	canvas.onmousedown = click;
	canvas.onmousemove = function(ev){
		if(ev.buttons == 1){
			click(ev);
		}
	};

	gl.clearColor(0,0,0,1);
	//gl.clear(gl.COLOR_BUFFER_BIT);
	//renderScene();
	requestAnimationFrame(tick);
}

var g_startTime = performance.now()/1000;
var g_seconds = performance.now()/1000 - g_startTime;


function tick(){
	g_seconds = performance.now()/1000 - g_startTime;
	updateAnimationAngles();
	renderScene();
	requestAnimationFrame(tick);
}

function connectVariablesToGLSL(){
	if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
		console.log('Failed to initialize shaders');
		return;
	}

	a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position < 0){
		console.log('Failed to get storage location of a_Position');
		return;
	}

	u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if(!u_FragColor){
		console.log('Failed to get storage location of u_FragColor');
		return;
	}

	//get the storage location of u_ModelMatrix
	u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	if(!u_ModelMatrix){
		console.log('Failed to get the storage location of u_ModelMatrix');
		return;
	}

	var identityM = new Matrix4();
	gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
	
	u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
	if(!u_GlobalRotateMatrix){
		console.log('Failed to get storage location of u_GlobalRotateMatrix');
		return;
	}

}

function sendTextToHTML(text, htmlID){
	var htmlElm = document.getElementById(htmlID);
	if(!htmlElm){
		console.log("Failed to get " + htmlID + " from HTML");
		return;
	}
	htmlElm.innerHTML = text;
}

function updateAnimationAngles(){
/**	if(g_yellowAnimation){
		g_yellowAngle = (45*Math.sin(g_seconds));
	}
	if(g_magentaAnimation){
		g_magentaAngle = (45*Math.sin(3*g_seconds));
	}**/
	if(g_beakAnimation){
		g_beakAngle = Math.abs((45*Math.sin(5*g_seconds)));
	}
	if(g_wingsAnimation){
		g_rwingAngle = Math.abs((70*Math.sin(7*g_seconds)));
	}
	if(g_legsAnimation){
		g_legsAngle = (45*Math.sin(7*g_seconds));
	}
}


function renderScene(){

	// check the time at the start of this function
	var startTime = performance.now();

	// pass the matrix to u_ModelMatrix attribute
	var globalRotMat=new Matrix4()
		.rotate(g_globalAngle,0,1,0)
		.rotate(g_globalAngleY,1,0,0);
	gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

	//clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.clear(gl.COLOR_BUFFER_BIT);	


	var len = g_shapesList.length;

	for (var a = 0; a < len; a += 1){
		g_shapesList[a].render();
	}
	
	// test triangle
	//drawTriangle3D( [-1.0,0.0,0.0, -0.5,-1.0,0.0, 0.0,0.0,0.0] );
	
	// draw the body cube
	var body = new Cube();
	body.color = [0.9,0.9,0.9,1];
	body.matrix.setTranslate(-0.2,-0.2,-0.2);
	body.matrix.rotate(-5,1,0,0);
	body.matrix.scale(0.45,.35,.55);
	body.render();

	// head
	var head = new Cube();
	head.color = [0.85,0.85,0.85,1];
	head.matrix.setTranslate(-0.075,0.05,-0.31);
	head.matrix.rotate(-5,1,0,0);
	head.matrix.scale(0.2,0.3,.15);
	head.render();

	// beak1
	var beak1 = new Cube();
	beak1.color = [1,0.7,0,1];
	beak1.matrix.setTranslate(-0.075,0.2,-0.469);
	beak1.matrix.rotate(-5,1,0,0);
	beak1.matrix.scale(0.2,0.05,.15);
	beak1.render();

	// beak2
	var beak2 = new Cube();
	beak2.color = [1,0.6,0,1];
	beak2.matrix.setTranslate(-0.075,0.21,-0.32);
	beak2.matrix.rotate(175,1,0,0);
	beak2.matrix.rotate(-g_beakAngle,1,0,0);
	beak2.matrix.scale(0.2,0.05,0.15);
	beak2.render();


	// right eye
	var reye = new Cube();
	reye.color = [0.1,0.1,0.1,1];
	reye.matrix.setTranslate(-0.075,0.26,-0.35);
	reye.matrix.rotate(-5,1,0,0);
	reye.matrix.scale(0.05,0.05,0.02);
	reye.render();

	// left eye
	var leye = new Cube();
	leye.color = [0.1,0.1,0.1,1];
	leye.matrix.setTranslate(0.075,0.26,-0.35);
	leye.matrix.rotate(-5,1,0,0);
	leye.matrix.scale(0.05,0.05,.02);
	leye.render();

	// redthing
	var redthing = new Cube();
	redthing.color = [0.85,0.2,0,1];
	redthing.matrix.setTranslate(-0.025,0.06,-0.35);
	redthing.matrix.rotate(-5,1,0,0);
	redthing.matrix.scale(0.1,0.1,.05);
	redthing.render();

	// right wing
	var rwing = new Cube();
	rwing.color = [0.85,0.85,0.85,1];
	rwing.matrix.setTranslate(0.24,0.1,-0.17);
	rwing.matrix.rotate(85,1,0,0);
	rwing.matrix.rotate(g_rwingAngle, 0,1,0);
	rwing.matrix.scale(0.05,0.45,0.25);
	rwing.render();

	// left wing
	var lwing = new Cube();
	lwing.color = [0.85,0.85,0.85,1];
	lwing.matrix.setTranslate(-0.24,0.1,-0.17);
	lwing.matrix.rotate(85,1,0,0);
	lwing.matrix.rotate(-g_rwingAngle, 0,1,0);
	lwing.matrix.scale(0.05,0.45,0.25);
	lwing.render();

	// right leg
	var rleg = new Cube();
	rleg.color = [1,0.7,0,1];
	rleg.matrix.setTranslate(0.15,-0.14,0.1);
	rleg.matrix.rotate(160,1,0,0);
	rleg.matrix.rotate(g_legsAngle,1,0,0);
	var rjoint = new Matrix4(rleg.matrix);
	rleg.matrix.scale(0.05,0.2,.05);
	rleg.render();

	var rleg2 = new Cube();
	rleg2.color = [1,0.6,0,1];
	rleg2.matrix = rjoint;
	rleg2.matrix.translate(0,0.28,0.124);
	rleg2.matrix.rotate(220,1,0,0);
	var rjoint2 = new Matrix4(rleg2.matrix);
	rleg2.matrix.scale(0.05,0.15,.05);
	rleg2.render();

	var rfoot = new Cube();
	rfoot.color = [1,0.6,0,1];
	rfoot.matrix = rjoint2;
	rfoot.matrix.translate(-0.028,0,-0.1);
	rfoot.matrix.rotate(0,1,0,0);
	rfoot.matrix.scale(0.1,0.05,0.1);
	rfoot.render();



	// left leg
	var lleg = new Cube();
	lleg.color = [1,0.7,0,1];
	lleg.matrix.setTranslate(-0.15,-0.14,0.1);
	lleg.matrix.rotate(160,1,0,0);
	lleg.matrix.rotate(-g_legsAngle,1,0,0);
	var ljoint = new Matrix4(lleg.matrix);
	lleg.matrix.scale(0.05,0.2,.05);
	lleg.render();

	var lleg2 = new Cube();
	lleg2.color = [1,0.6,0,1];
	lleg2.matrix = ljoint;
	lleg2.matrix.translate(0,0.28,0.124);
	lleg2.matrix.rotate(220,1,0,0);
	var ljoint2 = new Matrix4(lleg2.matrix);
	lleg2.matrix.scale(0.05,0.15,.05);
	lleg2.render();

	var lfoot = new Cube();
	lfoot.color = [1,0.6,0,1];
	lfoot.matrix = ljoint2;
	lfoot.matrix.translate(-0.028,0,-0.1);
	lfoot.matrix.rotate(0,1,0,0);
	lfoot.matrix.scale(0.1,0.05,0.1);
	lfoot.render();



/**
	// draw left arm
	var leftArm = new Cube();
	leftArm.color = [1,1,0,1];
	leftArm.matrix.setTranslate(0, -.5, 0.0);
	leftArm.matrix.rotate(-5,1,0,0);
	leftArm.matrix.rotate(-g_yellowAngle,0,0,1);
/**
	if(g_yellowAnimation){
		leftArm.matrix.rotate(45*Math.sin(g_seconds),0,0,1);
	}else{
		leftArm.matrix.rotate(-g_yellowAngle,0,0,1);
	}

	var yellowCoordinatesMat = new Matrix4(leftArm.matrix);
	leftArm.matrix.scale(0.25,.7,.5);
	leftArm.matrix.translate(-.5,0,0);
	leftArm.render();

	// test box
	var box = new Cube();
	box.color = [1,0,1,1];
	box.matrix = yellowCoordinatesMat;
	box.matrix.translate(0,0.65,0);
	box.matrix.rotate(g_magentaAngle,0,0,1);
	box.matrix.scale(.3,.3,.3);
	box.matrix.translate(-0.5,0,-0.001);
//	box.matrix.translate(-.1,.1,0,0);
//	box.matrix.rotate(-30,1,0,0);
//	box.matrix.scale(.2,.4,.2);
	box.render();
**/

	// check the time at the end of the function and show on webpage
	var duration = performance.now() - startTime;
	sendTextToHTML( " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration), "numdot");

}


function click(ev){
	let [x,y] = convertCoordEventToWebGL(ev);
	let point;
	if(g_selectedType == POINT){
		point = new Point();
	}else if(g_selectedType == TRIANGLE){
		point = new Triangle();
	}else{
		point = new Circle();
		point.sides = g_selectedSides;
	}

	point.position = [x,y];
	point.color = g_selectedColor.slice();
	g_shapesList.push(point);

	renderScene();
}


function convertCoordEventToWebGL(ev){
	var x = ev.clientX;
	var y = ev.clientY;
	var rect = ev.target.getBoundingClientRect();
	x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
	y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
	return ([x,y]);
}

