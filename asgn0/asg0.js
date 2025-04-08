let canvas;
let ctx;

function main() {  
  // Retrieve <canvas> element
  canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  var v1 = new Vector3([2.25, 2.25, 0.0]); 

  // Draw a black rectangle
  ctx.fillStyle = 'black'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color
  drawVector(v1, "red");

}

function drawVector(v, color){
	const scale = 20;
	const originX = canvas.width / 2;
	const originY = canvas.height / 2;


	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(originX, originY);
	ctx.lineTo(originX+v.elements[0]*scale, originY-v.elements[1]*scale);
	ctx.stroke();
}

function handleDrawEvent(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,400,400);

	var x1 = document.getElementById('x1').value;
	var y1 = document.getElementById('y1').value;
	var x2 = document.getElementById('x2').value;
	var y2 = document.getElementById('y2').value;

	var v1 = new Vector3([x1,y1,0]);
	var v2 = new Vector3([x2,y2,0]);
	drawVector(v1,'red');
	drawVector(v2, 'blue');
}

function handleDrawOperationEvent() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,400,400);
	
	var x1 = document.getElementById('x1').value;
	var y1 = document.getElementById('y1').value;
	var v1 = new Vector3([x1,y1,0]);
	drawVector(v1,'red');

	var x2 = document.getElementById('x2').value;
	var y2 = document.getElementById('y2').value;
	var v2 = new Vector3([x2,y2,0]);
	drawVector(v2,'blue');
	
	var operation = document.getElementById('operations').value;

	if(operation == 'add'){
		v1.add(v2);
		drawVector(v1,'green');
	}else if(operation == 'sub'){
		v1.sub(v2);
		drawVector(v1,'green');
	}else if(operation == 'mult'){
		var scalar = document.getElementById('scalar').value;
		v1.mul(scalar);
		v2.mul(scalar);
		drawVector(v1,'green');
		drawVector(v2,'green');
	}else if(operation == 'div'){
		var scalar = document.getElementById('scalar').value;
		v1.div(scalar);
		v2.div(scalar);
		drawVector(v1,'green');
		drawVector(v2,'green');
	}else if(operation == 'mag'){
		console.log("Magnitude v1: " + v1.magnitude());
		console.log("Magnitude v2: " + v2.magnitude());
	}else if(operation == 'norm'){
		v1.normalize();
		v2.normalize();
		drawVector(v1,'green');
		drawVector(v2,'green');
	}else if(operation == 'angle'){
		console.log("Angle: " + angleBetween(v1,v2).toFixed(2));
	}else if(operation == 'area'){
		console.log("Area: " + areaTriangle(v1,v2));
	}

}


function angleBetween(v1,v2){
	var d = Vector3.dot(v1,v2);
	var mag1 = v1.magnitude();
	var mag2 = v2.magnitude();

	var angle = Math.acos(d/(mag1*mag2));
	angle = angle * (180/Math.PI);
	return angle;
}

function areaTriangle(v1,v2){
	var parellelogram = Vector3.cross(v1,v2);
	var v3 = new Vector3([parellelogram[0],parellelogram[1],parellelogram[2]]);
	var area = v3.magnitude()/2;
	return area;
}

