class Cube{
	constructor(){
		this.type = 'cube';
		//this.position = [0,0,0];
		this.color = [1,1,1,1];
		//this.size = 5;
		//this.sides = 3;
		this.matrix = new Matrix4();
	}

	render(){
		var rgba = this.color;

		// Front of Cube
		gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
		gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
		drawTriangle3D( [0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0 ]);
		drawTriangle3D( [0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0 ]);

		// Top of cube
		gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
		drawTriangle3D( [0,1,0, 0,1,1, 1,1,1] );
		drawTriangle3D( [0,1,0, 1,1,1, 1,1,0] );

		gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.8, rgba[3]);
		drawTriangle3D( [0,0,0, 0,0,1, 1,0,1] );
		drawTriangle3D( [0,0,0, 1,0,1, 1,0,0] );

		gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);
		drawTriangle3D( [1,0,0, 1,1,0, 1,1,1] );
		drawTriangle3D( [1,0,0, 1,0,1, 1,1,1] );

		gl.uniform4f(u_FragColor, rgba[0]*.6, rgba[1]*.6, rgba[2]*.6, rgba[3]);
		drawTriangle3D( [0,0,1, 0,1,1, 1,1,1] );
		drawTriangle3D( [0,0,1, 1,1,1, 1,0,1] );

		gl.uniform4f(u_FragColor, rgba[0]*.5, rgba[1]*.5, rgba[2]*.5, rgba[3]);
		drawTriangle3D( [0,0,0, 0,1,0, 0,1,1] );
		drawTriangle3D( [0,0,0, 0,1,1, 0,0,1] );

	}
}

/**
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
}**/	
