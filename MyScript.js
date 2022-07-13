var colors = "1be7ff-6eeb83-e4ff1a-ffb800-ff5714-DB4D6D".split("-").map(a=>"#"+a)
var useColors =["#000","#fff"]
let overAllTexture


function setup() {
	
	colors = colors.concat(colors)
	
	createCanvas(windowWidth,windowHeight);
	background(100);
	fill(0)
	rect(0,0,width,height)
	pixelDensity(2)
	// drawingContext.shadowBlur=5
	
	randomSeed(Date.now())
	mouseX = random(1,width/10)
	mouseY = random(1,height/2)
	
	colors.forEach(clr=>{
		if (random()<0.25){
			useColors.push(clr)
		}
	})
	
	overAllTexture=createGraphics(width,height)
	overAllTexture.loadPixels()
	// noprotect
		// noStroke()
	for(var i=0;i<width+50;i++){
		for(var o=0;o<height+50;o++){
			overAllTexture.set(i,o,color(150,noise(i/10,i*o/300)*random([0,0,0,80,200])))
		}
	}
	overAllTexture.updatePixels()
	
}

function myTriangle(x,y,r){
	push()
		translate(x,y)
		let points = []
		for(var i=0;i<3;i++){
			let rr = r
			let angle =i*120
			let xx = rr* cos(angle/360*2*PI)
			let yy = rr* sin(angle/360*2*PI)
			points.push(xx,yy)
		}
		triangle(...points)
	pop()
}

function draw() {
	
	drawingContext.shadowColor=color(0,200)
	drawingContext.shadowOffsetX=10
	drawingContext.shadowOffsetY=10
	
	// print(mouseX,mouseY)
	//畫背景
	
	fill("#000")
	rect(0,0,width,height)
	// push()
	// 	fill(0,0.1)
	// 	rect(0,0,width,height)
	// pop()
	
	
	push()
		// blendMode(SCREEN)
		//畫圈圈
		fill(255)
		noStroke()


		//translate to center
		translate(width/2,height/2)
		
		stroke(255,100)
		for(let xx=-width/2;xx<width/2;xx+=40){
			let isSpan = (abs(xx/20)%5==0?150:0) 
			strokeWeight(isSpan?2:1)
			stroke(255,20+ isSpan?100:0)
			line(xx,-height/2,xx,height/2)
		}
	
		for(let yy=-height/2;yy<height/2;yy+=40){
			let isSpan = (abs(yy/20)%5==0?150:0) 
			strokeWeight(isSpan?2:1)
			stroke(255,20+ isSpan?100:0)
			line(-width/2,yy,width/2,yy)
		}
		noStroke()

		// rect(0,0,50,50)
		let span = map(mouseX,0,width,1,10,true)
		// print(span)
		let freq = map(mouseY,0,height,1,100,true)
		let curveFactor = noise(frameCount/1000)*3+5
		for(var x=0;x<width;x+=span){
			push()
				fill(useColors[int(x%useColors.length)])
				rotate(x/width*2*PI)
				let y = sin(x/freq+frameCount/100)*height/2
				translate(y,0)
				let shapeId = int(x)%3
				let rr = ( pow(noise(x),2)+ pow(sin(x),1.2))*80 
				rotate(frameCount/50)
				if (shapeId==0){
					rect(0,0,rr)
				}
				if (shapeId==1){
					ellipse(0,0,rr)
				}
				if (shapeId==2){
					myTriangle(0,0,rr)
				}
				strokeWeight(3)
				stroke(255)
				line(0,0,-rr,-rr)
			
				for(var i=0;i<3;i++){
					noStroke()
					
					let rr = 50
					let cirR = 10
					let angle =i*120+frameCount/100 + x*curveFactor
					let xx = rr* cos(angle/360*2*PI)
					let yy = rr* sin(angle/360*2*PI)
					ellipse(xx,yy,cirR)
				}
				// ellipse(0,0,50)
			pop()
		}
	pop()
	
	
	//把陰影取消掉
	drawingContext.shadowColor=color(0,200)
	drawingContext.shadowOffsetX=0
	drawingContext.shadowOffsetY=0
	
	// push()
	// 	stroke(255)
	// 	noFill()
	// 	strokeWeight(2)
	// 	rect(20,20,width-40,height-40,)
	// pop()
	
	fill(255)
	push()
		
		textSize(24)
		textStyle(BOLD);
		for(var colorId =0;colorId<useColors.length;colorId++){
			fill(useColors[colorId])
			strokeWeight(2)
			rect(colorId*40+40,height-210,30,30)
		}
		fill(255)
		text("TIME: "+frameCount+ "fp", 50,height-130)
		text("SPAN: "+span.toFixed(2) + "\"", 50,height-90)
		text("FREQ: "+freq.toFixed(2) + "Hz", 50,height-50)
	
	pop()
	
	
	
	push()
		blendMode(MULTIPLY)
		image(overAllTexture,0,0)
	pop()
	// ellipse(mouseX, mouseY, 20, 20);
}
