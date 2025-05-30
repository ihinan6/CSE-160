class Triangle{
	constructor(){
		this.type = 'triangle';
		this.position = [0,0,0];
		this.color = [1,1,1,1];
		this.size = [5];
		this.reflectX = false;
		this.reflectY = false;
	}

	render(){
		var xy = this.position;
		var rgba = this.color;
		var size = this.size;

		gl.uniform4f(u_FragColor,rgba[0],rgba[1],rgba[2],rgba[3]);
		gl.uniform1f(u_Size, size);
		var d = this.size/200;
		//drawTriangle([xy[0],xy[1],xy[0]+d,xy[1]+d,xy[0],xy[1]+d]);
		

		let vertices = [
			xy[0],xy[1],xy[0]+d, xy[1] + d,xy[0], xy[1] + d];


		if (this.reflectX){
			const cx = xy[0];
			for(let i=0;i<vertices.length;i+=2){
				vertices[i] = cx - (vertices[i] - cx);
			}
		}
		if (this.reflectY){
			const cy = xy[1];
			for(let i=1;i<vertices.length;i+=2){
				vertices[i] = cy - (vertices[i] - cy);
			}
		}

		drawTriangle(vertices);
	}

}


function drawTriangle(vertices){
	var n = 3;
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer){
		console.log('Failed to create buffer object');
		return -1;
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0,0);
	gl.enableVertexAttribArray(a_Position);
	gl.drawArrays(gl.TRIANGLES,0,n);
}

var g_vertexBuffer = null;
let g_uvBuffer = null;
function initTriangle3D(){
	g_vertexBuffer = gl.createBuffer();
	if(!g_vertexBuffer){
		console.log('failed to create buffer object');
		return -1;
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(a_Position);
}


function drawTriangle3D(vertices){
	var n = vertices.length / 3; // Each vertex has 3 components (x, y, z)
	if (g_vertexBuffer==null){
		initTriangle3D();
	}
	// var vertexBuffer = gl.createBuffer();
	// if(!vertexBuffer){
	// 	console.log('Failed to create buffer object');
	// 	return -1;
	// }

	// gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
	// gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
	// gl.enableVertexAttribArray(a_Position);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
	gl.drawArrays(gl.TRIANGLES, 0, n);
}




function drawTriangle3DUV(vertices, uv){
   var n = 3;

   var vertexBuffer = gl.createBuffer();
   if(!vertexBuffer){
      console.log('Failed to create the buffer object');
      return -1;
   }

   // Bind the buffer object to target
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   // Write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

   // Assign the buffer object to a_Position variable
   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

   // Enable the assignment to a_Position variable
   gl.enableVertexAttribArray(a_Position);

   gl.drawArrays(gl.TRIANGLES, 0, n);

   // --------------------------------
   var uvBuffer = gl.createBuffer();
   if(!uvBuffer){
      console.log('Failed to create the buffer object');
      return -1;
   }
   //
   // Bind the buffer object to target
   gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
   // Write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

   // Assign the buffer object to a_UV variable
   gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

   // Enable the assignment to a_UV variable
   gl.enableVertexAttribArray(a_UV);

   gl.drawArrays(gl.TRIANGLES, 0, n);
}

function drawTriangle3D(vertices){
   var n = vertices.length/3;
   var vertexBuffer = gl.createBuffer();
   if(!vertexBuffer){
      console.log('Failed to create the buffer object');
      return -1;
   }

   // Bind the buffer object to target
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   // Write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

   // Assign the buffer object to a_Position variable
   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

   // Enable the assignment to a_Position variable
   gl.enableVertexAttribArray(a_Position);

   gl.drawArrays(gl.TRIANGLES, 0, n);
}

function drawTriangle3DUV(vertices, uv){
   var n = 3;

   var vertexBuffer = gl.createBuffer();
   if(!vertexBuffer){
      console.log('Failed to create the buffer object');
      return -1;
   }

   // Bind the buffer object to target
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   // Write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

   // Assign the buffer object to a_Position variable
   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

   // Enable the assignment to a_Position variable
   gl.enableVertexAttribArray(a_Position);

   gl.drawArrays(gl.TRIANGLES, 0, n);

   // --------------------------------
   var uvBuffer = gl.createBuffer();
   if(!uvBuffer){
      console.log('Failed to create the buffer object');
      return -1;
   }
   //
   // Bind the buffer object to target
   gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
   // Write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

   // Assign the buffer object to a_UV variable
   gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

   // Enable the assignment to a_UV variable
   gl.enableVertexAttribArray(a_UV);

   gl.drawArrays(gl.TRIANGLES, 0, n);
}

function drawTriangle3DUVNormal(vertices, uv, normals){
   var n = vertices.length/3; // The number of vertices

   var vertexBuffer = gl.createBuffer();
   if(!vertexBuffer){
      console.log('Failed to create the buffer object');
      return -1;
   }

   // Bind the buffer object to target
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   // Write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

   // Assign the buffer object to a_Position variable
   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

   // Enable the assignment to a_Position variable
   gl.enableVertexAttribArray(a_Position);


   // --------------------------------
   var uvBuffer = gl.createBuffer();
   if(!uvBuffer){
      console.log('Failed to create the buffer object');
      return -1;
   }
   //
   // Bind the buffer object to target
   gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
   // Write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

   // Assign the buffer object to a_UV variable
   gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

   // Enable the assignment to a_UV variable
   gl.enableVertexAttribArray(a_UV);

   // --------------------------------
   var normalBuffer = gl.createBuffer();
   if(!normalBuffer){
      console.log('Failed to create the buffer object');
      return -1;
   }
   //
   // Bind the buffer object to target
   gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
   // Write date into the buffer object
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.DYNAMIC_DRAW);

   // Assign the buffer object to a_UV variable
   gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);

   // Enable the assignment to a_Normal variable
   gl.enableVertexAttribArray(a_Normal);

   // --------------------------------
   gl.drawArrays(gl.TRIANGLES, 0, n);
   g_vertexBuffer=null;
}