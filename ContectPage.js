
function drawShape(_i,_o){
	let r = 20
	beginShape()
	for(var i=0;i<400;i+=4){
    let w = i/50+frameCount/20 

		vertex(r*cos(_i*w+frameCount/100+ sqrt(mouseX)/10),r*sin(_o*w+frameCount/100+ sqrt(mouseX)/10) )
	}
	endShape()
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	noFill()
	stroke(255);
	// drawShape(0.1);
}

function draw() {
	background(0)
	translate(0,height/2)
  translate(10*10/2,-10*50/2)
  scale(1.3)
	
	for(var i=0;i<24;i++){
		fill(255)
		noStroke()
		text(i, i*60, -60)
		noFill()
		for(var o=0;o<10;o++){
			fill(255)
			text(o,-60, o*60)
			noFill()
			push()
			translate(i*60,o*60)
			stroke(map(i,0,10,0,255), (mouseY/6+ map(o,0,10,0,255,true)) ,255)
			drawShape(i/3+1+sin(mouseX/200),o+sin(mouseY/150))
			pop()
		}
		
	}
	// ellipse(mouseX, mouseY, 20, 20);
}
