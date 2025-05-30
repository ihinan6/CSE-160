class Cube{
	constructor(){
		this.type = 'cube';
		this.color = [1,1,1,1];
		this.matrix = new Matrix4();
		this.textureNum = -2;
		this.cubeVerts32 = new Float32Array([
			0,0,0, 1,1,0, 1,0,0,
			0,0,0, 0,1,0, 1,1,0,
			0,1,0, 0,1,1, 1,1,1,
			0,1,0, 1,1,1, 1,1,0,
			1,1,0, 1,1,1, 1,0,0,
			1,0,0, 1,1,1, 1,0,1,
			0,1,0, 0,1,1, 0,0,0,
			0,0,0, 0,1,1, 0,0,1,
			0,0,0, 0,0,1, 1,0,1,
			0,0,0, 1,0,1, 1,0,0,
			0,0,1, 1,1,1, 1,0,1,
			0,0,1, 0,1,1, 1,1,1
		]);
		this.cubeVerts= [
			0,0,0, 1,1,0, 1,0,0,
			0,0,0, 0,1,0, 1,1,0,
			0,1,0, 0,1,1, 1,1,1,
			0,1,0, 1,1,1, 1,1,0,
			1,1,0, 1,1,1, 1,0,0,
			1,0,0, 1,1,1, 1,0,1,
			0,1,0, 0,1,1, 0,0,0,
			0,0,0, 0,1,1, 0,0,1,
			0,0,0, 0,0,1, 1,0,1,
			0,0,0, 1,0,1, 1,0,0,
			0,0,1, 1,1,1, 1,0,1,
			0,0,1, 0,1,1, 1,1,1
		];

		this.cubeUV = new Float32Array([
			// Front
			0,0, 1,1, 1,0,
			0,0, 0,1, 1,1,
			// Top
			0,1, 0,0, 1,0,
			0,1, 1,0, 1,1,
			// Right
			0,1, 1,1, 0,0,
			0,0, 1,1, 1,0,
			// Left
			1,1, 0,0, 1,0,
			1,1, 0,1, 0,0,
			// Bottom
			0,0, 1,1, 1,0,
			0,0, 0,1, 1,1,
			// Back
			1,0, 0,1, 0,0,
			1,0, 1,1, 0,1
		]);
	}

	render(){
		var rgba = this.color;

		// pass texture number
		gl.uniform1i(u_whichTexture, this.textureNum);
		gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
		gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
		drawTriangle3D( [0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0 ]);
		drawTriangle3D( [0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0 ]);

		// Front of Cube uv
		drawTriangle3DUV([0.0,1.0,0.0, 1.0,1.0,0.0, 0.0,0.0,0.0 ], [0,0, 1,0, 1,1]);
		drawTriangle3DUV([0.0,0.0,0.0, 1.0,0.0,0.0, 1.0,1.0,0.0 ], [0,1, 1,1, 0,0]);
		// Back uv
		drawTriangle3DUV([0.0,1.0,1.0, 1.0,1.0,1.0, 0.0,0.0,1.0 ],[0,0, 1,0, 1,1]);
		drawTriangle3DUV([0.0,0.0,1.0, 1.0,0.0,1.0, 1.0,1.0,1.0 ],[0,1, 1,1, 0,0]);

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

	renderfast(){
		var rgba = this.color;
		gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

		gl.uniform1i(u_whichTexture, this.textureNum);
         // Pass the color of a point to u_FragColor variable

         // Pass the matrix to u_ModelMatrix attribute
         gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

         var allverts = [];
         // Front of Cube
         allverts = allverts.concat([0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0 ]);
         allverts = allverts.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0 ]);
         // Back
         allverts = allverts.concat([0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0 ]);
         allverts = allverts.concat([0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0 ]);
         // Top
         allverts = allverts.concat([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
         allverts = allverts.concat([0.0,1.0,1.0, 0.0,1.0,0.0, 1.0,1.0,1.0 ]);
         // Bottom
         allverts = allverts.concat([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,0.0 ]);
         allverts = allverts.concat([1.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0 ]);

         // Left
         allverts = allverts.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0 ]);
         allverts = allverts.concat([0.0,1.0,1.0, 0.0,0.0,0.0, 0.0,0.0,1.0 ]);
         // Right
         allverts = allverts.concat([1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
         allverts = allverts.concat([1.0,1.0,1.0, 1.0,0.0,0.0, 1.0,0.0,1.0 ]);

         drawTriangle3D(allverts);
	}

	// renderfaster(){
	// 	var rgba = this.color;
	// 	gl.uniform1i(u_whichTexture, this.textureNum);
	// 	gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
	// 	gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

	// 	if(g_vertexBuffer==null){
	// 		initTriangle3D();
	// 	}

	// 	// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.cubeVerts), gl.DYNAMIC_DRAW);
	// 	gl.bufferData(gl.ARRAY_BUFFER, this.cubeVerts32, gl.DYNAMIC_DRAW);

	// 	gl.drawArrays(gl.TRIANGLES, 0, 36);

	// }

	renderfaster() {
  gl.uniform1i(u_whichTexture, this.textureNum); // -2 = color only, >= 0 = texture unit
  gl.uniform4f(u_FragColor, ...this.color);
  gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

  // Vertex buffer
  if (g_vertexBuffer == null) {
    g_vertexBuffer = gl.createBuffer();
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, this.cubeVerts32, gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // UV buffer
  if (!g_uvBuffer) {
    g_uvBuffer = gl.createBuffer();
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, g_uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, this.cubeUV, gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_UV);

  // Draw
  gl.drawArrays(gl.TRIANGLES, 0, 36);
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
