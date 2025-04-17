const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;
let g_selectedColor = [1,1,1,1]
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_selectedSides = 3;
var g_selectedBook;
var g_shapesList = [];


var VSHADER_SOURCE =
	    'attribute vec4 a_Position;\n' +
	    'uniform float u_Size;\n' +
	    'void main() {\n' +
	    '  gl_Position = a_Position;\n' +
	    '  gl_PointSize = u_Size;\n' +
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
}


function addActionForHtmlUI(){
	document.getElementById('clear').onclick = function(){
		g_shapesList = [];
		renderAllShapes();
	};

	document.getElementById('pointButton').onclick = function(){
		g_selectedType = POINT;
	};

	document.getElementById('triangleButton').onclick = function(){
		g_selectedType = TRIANGLE;
	};
	
	document.getElementById('circleButton').onclick = function(){
		g_selectedType = CIRCLE;
	};
	
	document.getElementById('redSlide').addEventListener('mouseup', function(){
		g_selectedColor[0] = this.value/100; 
	});
	document.getElementById('greenSlide').addEventListener('mouseup', 
	        function(){
			g_selectedColor[1] = this.value/100; 
	});
	document.getElementById('blueSlide').addEventListener('mouseup', 
	        function(){
			g_selectedColor[2] = this.value/100; 
	});

	document.getElementById('sizeSlide').addEventListener('mouseup', 
	        function(){
			g_selectedSize = this.value; 
	});
	document.getElementById('sideSlide').addEventListener('mouseup', 
	        function(){
			g_selectedSides = this.value; 
	});

	document.getElementById('draw').onclick = function(){
		drawPicture();
	};
}

/**
function addActionForHtmlUI(){
	document.getElementByID('clear').onclick = function(){
		g_shapesList = [];
		renderAllShapes();
	}
	document.getElementById('pointButton').onclick = function(){
		g_selectedType = POINT;
	}; 
	document.getElementById('triangleButton').onclick = function(){
		g_selectedType = TRIANGLE;
	};
	document.getElementById('circleButton').onclick = function(){
		g_selectedType = CIRCLE;
	};


	document.getElementByID

}
**/

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
	gl.clear(gl.COLOR_BUFFER_BIT);
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

	u_Size = gl.getUniformLocation(gl.program, 'u_Size');
	if(!u_Size){
		console.log('Failed to get storage location of u_Size');
		return;
	}
}


function renderAllShapes(){
	gl.clear(gl.COLOR_BUFFER_BIT);	
	var len = g_shapesList.length;
	for (var a = 0; a < len; a += 1){
		g_shapesList[a].render();
	}
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
	point.size = g_selectedSize;
	g_shapesList.push(point);

	renderAllShapes();
}


function convertCoordEventToWebGL(ev){
	var x = ev.clientX;
	var y = ev.clientY;
	var rect = ev.target.getBoundingClientRect();
	x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
	y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
	return ([x,y]);
}





