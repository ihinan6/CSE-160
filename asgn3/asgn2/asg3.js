let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let g_selectedColor = [1,1,1,1]
let g_selectedSides = 3;
var g_shapesList = [];
let g_globalAngleY = 0;
var u_Clicked;

let a_UV;
let u_ProjectionMatrix;
let u_ViewMatrix;
var u_Sampler0;
var u_whichTexture;
var g_camera;
var u_Sampler1;

let g_globalAngle = 0;
let g_rwingAngle = 0;
let g_beakAngle = 0;
let g_legsAngle = 0;
let g_beakAnimation = false;
let g_wingsAnimation = false;
let g_legsAnimation = false;
let g_flyAnimation = false;

var g_startTime = performance.now()/1000;
var g_seconds = performance.now()/1000 - g_startTime;


var VSHADER_SOURCE =`
   precision mediump float;
   attribute vec4 a_Position;
   attribute vec2 a_UV;
   varying vec2 v_UV;
   uniform mat4 u_ModelMatrix;
   uniform mat4 u_GlobalRotateMatrix;
   uniform mat4 u_ViewMatrix;
   uniform mat4 u_ProjectionMatrix;
   uniform bool u_Clicked; // when mouse is pressed
   void main() {
		if(u_Clicked){
			vec4(1,1,1,1);
		}
		gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
		v_UV = a_UV;
   }`

var FSHADER_SOURCE =`
	precision mediump float;
    varying vec2 v_UV;
	uniform vec4 u_FragColor;
	uniform sampler2D u_Sampler0;
	uniform sampler2D u_Sampler1;
	uniform int u_whichTexture;
	void main() {

		if (u_whichTexture == -2){
			gl_FragColor = u_FragColor; // use color
		}else if(u_whichTexture == -1){
			// use UV debug color
			gl_FragColor = vec4(v_UV, 1.0, 1.0); 
		}else if(u_whichTexture == 0){
			// use texture0
			gl_FragColor = texture2D(u_Sampler0, v_UV);
		}else if(u_whichTexture == 1){
			// use texture1
			gl_FragColor = texture2D(u_Sampler1, v_UV);
		}else{
			// error, put redish
			gl_FragColor = vec4(1,.2,.2,1);
		}
		
    }`


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

	document.getElementById('resetCameraButton').onclick = function() {
		g_globalAngle = 0;
	        g_globalAngleY = 0;
	        document.getElementById('angleSlide').value = 0;
		document.getElementById('angleYSlide').value = 0;
	        renderScene();
	};

}


const textureManager = {};

function loadTextureToManager(name, unit, src) {
  const texture = gl.createTexture();
  const image = new Image();

  image.onload = function () {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    textureManager[name] = { unit, texture };
    console.log(`Texture ${name} loaded to unit ${unit}`);
  };

  image.src = src;
}



function initTextures() {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }


  var image = new Image();  // Create the image object
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  var image1 = new Image();  // Create the image object
  if (!image1) {
    console.log('Failed to create the image1 object');
    return false;
  }


  // Register the event handler to be called on loading an image
  image.onload = function(){ sendImageToTEXTURE0(image); };
  // Tell the browser to load an image
  image.src = 'patterned_brick_wall_03_disp_4k.png';

  // Register the event handler to be called on loading an image
  image1.onload = function(){ sendImageToTEXTURE1(image1); };
  // Tell the browser to load an image
  image1.src = 'patterned_brick_wall_03_diff_4k.jpg';

  // add more textures later
  return true;

// loadTextureToManager('floor', 0, 'worn_tile_floor_diff_4k.jpg');
// loadTextureToManager('sky', 1, 'worn_tile_floor_diff_4k.jpg');

}

function sendImageToTEXTURE0(image) {
   var texture = gl.createTexture();
   if(!texture){
      console.log('Failed to create the texture object');
      return false;
   }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
     gl.generateMipmap(gl.TEXTURE_2D);
  } else {
     // Set the texture parameters
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler0, 0);


  console.log("Finished loadTexture");
}
// ================================SKY
function sendImageToTEXTURE1(image) {
   var texture = gl.createTexture();
   if(!texture){
      console.log('Failed to create the texture object');
      return false;
   }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE1);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
     gl.generateMipmap(gl.TEXTURE_2D);
  } else {
     // Set the texture parameters
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  // Set the texture unit 1 to the sampler
  gl.uniform1i(u_Sampler1, 1);


  console.log("Finished loadTexture1");
}


function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}


function main(){
	setUpWebGL();
	connectVariablesToGLSL();
	addActionForHtmlUI();

	g_camera = new Camera();
	document.onkeydown = keydown;

	//canvas.onkeydown = click;
	canvas.onmousemove = function(ev){
		mouseCam(ev);
	}
	canvas.onmousedown = function(ev){
		check(ev);
	}

	initTextures();
	gl.clearColor(0,0,0,1);
	requestAnimationFrame(tick);
}

function check(ev) {
  var picked = false;
  var x = ev.clientX, y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();
  if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) { // inside canvas
     var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
     gl.uniform1i(u_Clicked, 1);  // Pass true to u_Clicked
     // Read pixel at the clicked position
     var pixels = new Uint8Array(4); // Array for storing the pixel value
     gl.readPixels(x_in_canvas, y_in_canvas, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
     console.log(pixels[0]);
     if (pixels[0] == 255) // The mouse in on cube if R(pixels[0]) is 255
       picked = true;

     gl.uniform1i(u_Clicked, 0);  // Pass false to u_Clicked(rewrite the cube)
  }
}


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

	a_UV = gl.getAttribLocation(gl.program, 'a_UV');
	if (a_UV < 0) {
		console.log('Failed to get the storage location of a_UV');
		return;
	}

	u_ViewMatrix = gl.getUniformLocation(gl.program,'u_ViewMatrix');
	if (!u_ViewMatrix) {
		console.log('Failed to get u_ViewMatrix');
		return;
	}

	u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
	if (!u_ProjectionMatrix) {
		console.log('Failed to get u_ProjectionMatrix');
		return;
	}

	// Get the storage location of u_Sampler
	u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
	if (!u_Sampler0) {
		console.log('Failed to get the storage location of u_Sampler0');
		return false;
	}

	u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
	if (!u_Sampler1) {
		console.log('Failed to get the storage location of u_Sampler1');
		return false;
	}

	u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
	if (!u_whichTexture) {
		console.log('Failed to get u_whichTexture');
		return;
	}

	u_Clicked = gl.getUniformLocation(gl.program, 'u_Clicked');
	if (!u_Clicked) {
		console.log('Failed to get u_Clicked');
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


	//--------------------------------
	// var projMat=new Matrix4();
	// projMat.setPerspective(60, canvas.width/canvas.height, .1, 100);
	// gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

	// var viewMat=new Matrix4();
	// viewMat.setLookAt(0,0,-3, 0,0,0, 0,1,0); //eye,at,up
	// gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

	// var globalRotMat=new Matrix4().rotate(g_globalAngle,0,1,0);
	// gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

	// Pass the projection matrix
	var projMat = g_camera.projMat;
	gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

	// Pass the view matrix
	var viewMat = g_camera.viewMat;
	gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

	// Pass the matrix to u_ModelMatrix attribute
	var globalRotMat = new Matrix4().rotate(g_globalAngle, 0,1,0).rotate(g_globalAngleY,1,0,0);

	gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);


	//----------------------------------

	// let projectionMatrix = new Matrix4();
	// projectionMatrix.setPerspective(15, canvas.width / canvas.height, 1, 10);

	// let viewMatrix = new Matrix4();
	// viewMatrix.lookAt(3, 3, -7, 0, 0, 0, 0, 1, 0);

	// let globalRotateMatrix = new Matrix4();
	// globalRotateMatrix.setRotate(0, 0, 0, 0);  // or however you're using this

	// let modelMatrix = new Matrix4();
	// modelMatrix.setIdentity();  // or object-specific transform
	// modelMatrix.setTranslate(0, 0, 0); 
	// modelMatrix.scale(2, 2, 2); 

	// gl.uniformMatrix4fv(u_ProjectionMatrix, false, projectionMatrix.elements);
	// gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
	// gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotateMatrix.elements);
	// gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);


	// pass the matrix to u_ModelMatrix attribute
	// var globalRotMat=new Matrix4()
	// 	.rotate(g_globalAngle,0,1,0)
	// 	.rotate(g_globalAngleY,1,0,0);
	// gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

	//clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.clear(gl.COLOR_BUFFER_BIT);	


	//var len = g_shapesList.length;

	// for (var a = 0; a < len; a += 1){
	// 	g_shapesList[a].renderfaster();
	// }
	

	renderCubes();

	// check the time at the end of the function and show on webpage
	var duration = performance.now() - startTime;
	sendTextToHTML( " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration), "numdot");

}


function click(ev){
	let [x,y] = convertCoordinatesEventToWebGL(ev);
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


// function convertCoordEventToWebGL(ev){
// 	var x = ev.clientX;
// 	var y = ev.clientY;
// 	var rect = ev.target.getBoundingClientRect();
// 	x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
// 	y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
// 	return ([x,y]);
// }

function convertCoordinatesEventToGL(ev){
   var x = ev.clientX; // x coordinate of a mouse pointer
   var y = ev.clientY; // y coordinate of a mouse pointer
   var rect = ev.target.getBoundingClientRect() ;

   // set coordinates based on origin
   x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
   y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

   // Print coordinate in console
   console.log("("+x+","+y+")");

   return [x,y];
}


function mouseCam(ev){
   coord = convertCoordinatesEventToGL(ev);
   if(coord[0] < 0.5){ // left side
      g_camera.panMLeft(coord[0]*-2.5);
   } else{
      g_camera.panMRight(coord[0]*-2.5);
   }
}

function keydown(ev){
//    if(ev.keyCode==39 || ev.keyCode == 68){ // Right Arrow or D
//       g_camera.right();
//    } else if (ev.keyCode==37 || ev.keyCode == 65){ // Left Arrow or A
//       g_camera.left();
//    } else 
   
   if (ev.keyCode==38 || ev.keyCode == 87){ // up Arrow or W
      g_camera.forward();
   } else if (ev.keyCode==40 || ev.keyCode == 83){ // down Arrow or S
      g_camera.back();
   } else if (ev.keyCode==81){ // Q
      g_camera.panLeft();
   } else if (ev.keyCode==69){ // E
      g_camera.panRight();
   }
   renderScene();
}
