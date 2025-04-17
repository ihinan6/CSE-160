function drawPicture(){

	const triangle = new Triangle();
	triangle.position = [0.0, 0];
	triangle.size = 25;
	triangle.color = [1.0, 0.5, 0.0, 1.0];// red
	triangle.reflectX = false;
	triangle.reflectY = false;	
	g_shapesList.push(triangle);

	const triangle2 = new Triangle();
	triangle2.position = [0, 0.0];
	triangle2.size = 25;
	triangle2.color = [1.0, 1, 1, 1.0]; // white
	triangle2.reflectX = true;
	triangle2.reflectY = false;
	g_shapesList.push(triangle2);

	const triangle3 = new Triangle();
	triangle3.position = [0, 0.25];
	triangle3.size = 25;
	triangle3.color = [0.5, 1, 0, 0.5];// yellow
	triangle3.reflectX = true;
	triangle3.reflectY = true;
	g_shapesList.push(triangle3);

	const triangle4 = new Triangle();
	triangle4.position = [0, 0.25];
	triangle4.size = 25;
	triangle4.color = [0.6, 0.1, 0.7, 0.2];// pink
	triangle4.reflectX = false;
	triangle4.reflectY = true;
	g_shapesList.push(triangle4);

	const triangle5 = new Triangle();
	triangle5.position = [0, 0.25];
	triangle5.size = 25;
	triangle5.color = [1.0, 1, 1, 1.0]; // white
	triangle5.reflectX = true;
	triangle5.reflectY = false;
	g_shapesList.push(triangle5);
	
	const triangle6 = new Triangle();
	triangle6.position = [0, 0.50];
	triangle6.size = 25;
	triangle6.color = [0.5, 1, 0, 0.5];// yellow
	triangle6.reflectX = true;
	triangle6.reflectY = true;
	g_shapesList.push(triangle6);
	
	const triangle7 = new Triangle();
	triangle7.position = [0.0, 0.25];
	triangle7.size = 25;
	triangle7.color = [1.0, 0.5, 0.0, 1.0];// red
	triangle7.reflectX = false;
	triangle7.reflectY = false;	
	g_shapesList.push(triangle7);

	const triangle8 = new Triangle();
	triangle8.position = [0, 0.50];
	triangle8.size = 25;
	triangle8.color = [0.6, 0.1, 0.7, 0.2];// pink
	triangle8.reflectX = false;
	triangle8.reflectY = true;
	g_shapesList.push(triangle8);
	
	const triangle9 = new Triangle();
	triangle9.position = [0, 0];
	triangle9.size = 50;
	triangle9.color = [0.5, 1, 0, 0.5];// yellow
	triangle9.reflectX = true;
	triangle9.reflectY = true;
	g_shapesList.push(triangle9);

	const triangle10 = new Triangle();
	triangle10.position = [0, -0.50];
	triangle10.size = 50;
	triangle10.color = [1.0, 1, 1, 1.0]; // white
	triangle10.reflectX = true;
	triangle10.reflectY = false;
	g_shapesList.push(triangle10);

	const triangle11 = new Triangle();
	triangle11.position = [0, 0];
	triangle11.size = 50;
	triangle11.color = [0.6, 0.1, 0.7, 0.2];// pink
	triangle11.reflectX = false;
	triangle11.reflectY = true;
	g_shapesList.push(triangle11);
	
	const triangle12 = new Triangle();
	triangle12.position = [0.0, -0.50];
	triangle12.size = 50;
	triangle12.color = [1.0, 0.5, 0.0, 1.0];// red
	triangle12.reflectX = false;
	triangle12.reflectY = false;	
	g_shapesList.push(triangle12);

	// right wing
	const triangle13 = new Triangle();
	triangle13.position = [0.375, 0.50];
	triangle13.size = 75;
	triangle13.color = [0.5, 1, 0, 0.5];// yellow
	triangle13.reflectX = true;
	triangle13.reflectY = true;
	g_shapesList.push(triangle13);

	const triangle14 = new Triangle();
	triangle14.position = [0.375, -0.25];
	triangle14.size = 75;
	triangle14.color = [1.0, 1, 1, 1.0]; // white
	triangle14.reflectX = true;
	triangle14.reflectY = false;
	g_shapesList.push(triangle14);

	const triangle15 = new Triangle();
	triangle15.position = [0.375, 0.50];
	triangle15.size = 75;
	triangle15.color = [0.6, 0.1, 0.7, 0.2];// pink
	triangle15.reflectX = false;
	triangle15.reflectY = true;
	g_shapesList.push(triangle15);

	const triangle16 = new Triangle();
	triangle16.position = [0.375, -0.25];
	triangle16.size = 75;
	triangle16.color = [1.0, 0.5, 0.0, 1.0];// red
	triangle16.reflectX = false;
	triangle16.reflectY = false;	
	g_shapesList.push(triangle16);

	// left wing
	const triangle17 = new Triangle();
	triangle17.position = [-0.375, 0.50];
	triangle17.size = 75;
	triangle17.color = [0.6, 0.1, 0.7, 0.2];// pink
	triangle17.reflectX = false;
	triangle17.reflectY = true;
	g_shapesList.push(triangle17);
	
	const triangle18 = new Triangle();
	triangle18.position = [-0.375, 0.50];
	triangle18.size = 75;
	triangle18.color = [0.5, 1, 0, 0.5];// yellow
	triangle18.reflectX = true;
	triangle18.reflectY = true;
	g_shapesList.push(triangle18);

	const triangle19 = new Triangle();
	triangle19.position = [-0.375, -0.25];
	triangle19.size = 75;
	triangle19.color = [1.0, 1, 1, 1.0]; // white
	triangle19.reflectX = true;
	triangle19.reflectY = false;
	g_shapesList.push(triangle19);

	const triangle20 = new Triangle();
	triangle20.position = [-0.375, -0.25];
	triangle20.size = 75;
	triangle20.color = [1.0, 0.5, 0.0, 1.0];// red
	triangle20.reflectX = false;
	triangle20.reflectY = false;	
	g_shapesList.push(triangle20);



	renderAllShapes();
}
