var g_map=[
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1],
[1,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1],
[1,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1],
[1,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0,0,0,0,1,1,1,1],
[1,0,0,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,1],
[1,0,0,0,0,0,0,0,0,1,2,2,2,1,1,0,0,1,1,1,1,0,0,1],
[1,0,0,0,0,0,0,1,1,1,2,2,2,1,1,0,0,1,0,0,0,0,0,1],
[1,0,0,1,1,0,0,1,1,1,2,2,2,1,1,0,0,1,0,0,0,0,0,1],
[1,0,0,1,1,0,0,1,1,1,1,0,1,1,1,0,0,1,1,1,1,0,0,1],
[1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
[1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
[1,0,0,1,1,0,0,1,1,1,0,0,0,1,1,0,0,1,1,0,0,1,1,1],
[1,0,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0,1,1,0,0,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
[1,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
[1,0,0,1,1,1,1,0,0,1,0,0,0,1,1,1,1,1,1,0,0,1,1,1],
[1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
[1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];



function map(){
    for (x=0;x<24;x++){
        for(y=0;y<24;y++){
            if (g_map[x][y]==1){
                var walls = new Cube();
                walls.color = [0.5,0,0.5,1];
                walls.textureNum= -2;
                walls.matrix.translate(x-12,-.4,y-12);
                walls.renderfast()
            }
        }
    }
}







function renderCubes(){


    map();
	// Sky ====================================
	var sky = new Cube();
	sky.color = [.6, .9, .95, 1];
	sky.textureNum = 0;
	sky.matrix.scale(40,40,40);
	sky.matrix.translate(-.5, -.5, -.5);
	sky.renderfast();

	// Floor ====================================
	var floor = new Cube();
	floor.color = [.2, .9, .4, 1];
	floor.textureNum = 0;
	floor.matrix.translate(0,-.4,0);
	floor.matrix.scale(24,0,24);
	floor.matrix.translate(-.5, 0, -.5);
	floor.render();


	
	// draw the body cube
	var body = new Cube();
	body.color = [0.9,0.9,0.9,1];
	body.textureNum = -2;
	body.matrix.setTranslate(-0.2,-0.2,-0.2);
	//body.matrix.rotate(-5,1,0,0);
	body.matrix.scale(0.45,.35,.55);
	body.renderfast();

	// head
	var head = new Cube();
	head.color = [0.85,0.85,0.85,1];
	head.matrix.setTranslate(-0.075,0.05,-0.31);
	//head.matrix.rotate(-5,1,0,0);
	head.matrix.scale(0.2,0.3,.15);
	head.renderfast();

	// beak1
	var beak1 = new Cube();
	beak1.color = [1,0.7,0,1];
	beak1.matrix.setTranslate(-0.075,0.2,-0.469);
	//beak1.matrix.rotate(-5,1,0,0);
	beak1.matrix.scale(0.2,0.05,.15);
	beak1.renderfast();

	// beak2
	var beak2 = new Cube();
	beak2.color = [1,0.6,0,1];
	beak2.matrix.setTranslate(-0.075,0.21,-0.32);
	beak2.matrix.rotate(180,1,0,0);
	beak2.matrix.rotate(-g_beakAngle,1,0,0);
	beak2.matrix.scale(0.2,0.05,0.15);
	beak2.renderfast();


	// right eye
	var reye = new Cube();
	reye.color = [0.1,0.1,0.1,1];
	reye.matrix.setTranslate(-0.075,0.26,-0.35);
	//reye.matrix.rotate(-5,1,0,0);
	reye.matrix.scale(0.05,0.05,0.02);
	reye.renderfast();

	// left eye
	var leye = new Cube();
	leye.color = [0.1,0.1,0.1,1];
	leye.matrix.setTranslate(0.075,0.26,-0.35);
	//leye.matrix.rotate(-5,1,0,0);
	leye.matrix.scale(0.05,0.05,.02);
	leye.renderfast();

	// redthing
	var redthing = new Cube();
	redthing.color = [0.85,0.2,0,1];
	redthing.matrix.setTranslate(-0.025,0.06,-0.35);
	//redthing.matrix.rotate(-5,1,0,0);
	redthing.matrix.scale(0.1,0.1,.05);
	redthing.renderfast();

	// right wing
	var rwing = new Cube();
	rwing.color = [0.85,0.85,0.85,1];
	rwing.matrix.setTranslate(0.24,0.1,-0.17);
	rwing.matrix.rotate(90,1,0,0);
	rwing.matrix.rotate(g_rwingAngle, 0,1,0);
	rwing.matrix.scale(0.05,0.45,0.25);
	rwing.renderfast();

	// left wing
	var lwing = new Cube();
	lwing.color = [0.85,0.85,0.85,1];
	lwing.matrix.setTranslate(-0.24,0.1,-0.17);
	lwing.matrix.rotate(90,1,0,0);
	lwing.matrix.rotate(-g_rwingAngle, 0,1,0);
	lwing.matrix.scale(0.05,0.45,0.25);
	lwing.renderfast();

	// right leg
	var rleg = new Cube();
	rleg.color = [1,0.7,0,1];
	rleg.matrix.setTranslate(0.15,-0.14,0.1);
	rleg.matrix.rotate(160,1,0,0);
	rleg.matrix.rotate(g_legsAngle,1,0,0);
	var rjoint = new Matrix4(rleg.matrix);
	rleg.matrix.scale(0.05,0.2,.05);
	rleg.renderfast();

	var rleg2 = new Cube();
	rleg2.color = [1,0.6,0,1];
	rleg2.matrix = rjoint;
	rleg2.matrix.translate(0,0.28,0.124);
	rleg2.matrix.rotate(220,1,0,0);
	var rjoint2 = new Matrix4(rleg2.matrix);
	rleg2.matrix.scale(0.05,0.15,.05);
	rleg2.renderfast();

	var rfoot = new Cube();
	rfoot.color = [1,0.6,0,1];
	rfoot.matrix = rjoint2;
	rfoot.matrix.translate(-0.028,0,-0.1);
	rfoot.matrix.rotate(0,1,0,0);
	rfoot.matrix.scale(0.1,0.05,0.1);
	rfoot.renderfast();

	// left leg
	var lleg = new Cube();
	lleg.color = [1,0.7,0,1];
	lleg.matrix.setTranslate(-0.15,-0.14,0.1);
	lleg.matrix.rotate(160,1,0,0);
	lleg.matrix.rotate(-g_legsAngle,1,0,0);
	var ljoint = new Matrix4(lleg.matrix);
	lleg.matrix.scale(0.05,0.2,.05);
	lleg.renderfast();

	var lleg2 = new Cube();
	lleg2.color = [1,0.6,0,1];
	lleg2.matrix = ljoint;
	lleg2.matrix.translate(0,0.28,0.124);
	lleg2.matrix.rotate(220,1,0,0);
	var ljoint2 = new Matrix4(lleg2.matrix);
	lleg2.matrix.scale(0.05,0.15,.05);
	lleg2.renderfast();

	var lfoot = new Cube();
	lfoot.color = [1,0.6,0,1];
	lfoot.matrix = ljoint2;
	lfoot.matrix.translate(-0.028,0,-0.1);
	lfoot.matrix.rotate(0,1,0,0);
	lfoot.matrix.scale(0.1,0.05,0.1);
	lfoot.renderfast();






}