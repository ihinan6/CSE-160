class Circle{
	constructor(){
		this.type = 'circle';
		this.position = [0,0,0];
		this.color = [1,1,1,1];
		this.size = 5;
		this.sides = 3;
	}

	render(){
		var xy = this.position;
		var rgba = this.color;
		var size = this.size;
		
		gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
		gl.uniform1f(u_Size, size);
		var diameter = this.size/200;
		var radius = diameter/2;

		let vertices = [];
		let tp = this.sides;
		for(var i = 0; i <= tp; i++){
			let angle = 2*Math.PI*i/tp;
			let x = xy[0]+radius*Math.cos(angle);
			let y = xy[1]+radius*Math.sin(angle);
			vertices.push(x,y);
		}	
		
		drawCircle(tp, vertices);
	}
}

function drawCircle(sides, vertices){
	var numvert = sides;
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer){
		console.log('Failed to create buffer object');
		return -1;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0,0);
	gl.enableVertexAttribArray(a_Position);
	gl.drawArrays(gl.TRIANGLE_FAN,0,numvert);
}	
