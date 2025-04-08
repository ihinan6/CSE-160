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

function handleDrawOperation() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,400,400);

	
}

