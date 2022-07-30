class Leg{
	constructor(r,angle,p){
		this.angle = angle+720
		this.r = r
		this.segCount = 50
		this.points = Array.from({
			length: this.segCount
		},(d,i)=>{
			return p.copy().add(createVector(cos(this.angle)*this.r*i/this.segCount,sin(this.angle)*this.r*i/this.segCount))
		})
	}
	draw(){
		strokeWeight(1)
		noFill()
		beginShape()
		this.points.forEach((p,pid)=>{
			vertex(p.x,p.y)
			if (pid % 50 ==0){
				
				push()
					fill("white")
					ellipse(p.x,p.y,2,2)

				pop()
			}
			
					
		})
		// stroke(255,255,255,200)
		
		push()
			fill("white")
			ellipse(this.points.slice(-1)[0].x,this.points.slice(-1)[0].y,3,3)
			
		pop()
		fill(255,255,255,10)
		stroke(255,255,255,30)
		endShape()
	}
	update(cp){
		let target = cp.copy()
		let fragLen = this.r / this.segCount
		let lastang = this.angle 
		this.points[0].set(target)
		
		this.points.forEach((p,i)=>{
			p.add(p5.Vector.fromAngle(radians(this.angle + noise(i,frameCount)),3*i/this.points.length))
			// p.add(createVector(noise(i,5),noise(i,5)))
			
			let ang = p.sub(target).heading()+720
  
			if (ang*lastang<0){
				ang=lerp( (ang+180 ) ,(lastang+180) ,0.2)-180
	
			}else{
				ang=lerp( ang,lastang,0.05)
			
			}
			
			
			p.set(target.add(p5.Vector.fromAngle(radians(ang),i==1?0:fragLen)))
			target = p
			lastang = ang
			
		})

	}
}

class Seaweed {
	constructor(mpos){
		this.p = mpos || createVector(width/2,height/2)
		let p = this.p 
		this.v = createVector(0,0)
		this.a = createVector(0,0.0)
		this.legCount = 80
		this.legLen = 400
		this.legs = Array.from({
			length: this.legCount
		},(d,i)=>{
			// console.log(p)
			return new Leg(this.legLen,i/this.legCount*360,p)
		})
	}
	update(){
    if (mouseX || mouseY){
      this.p.x = lerp(this.p.x,mouseX,0.05)
      this.p.y = lerp(this.p.y,mouseY,0.05)

    }
		this.p = this.p.add(this.v)
		this.v = this.v.add(this.a)
		this.legs.forEach(leg=>leg.update(this.p))
		this.legs.forEach((leg,lid)=>{
			leg.angle+=sin(noise(lid)+frameCount)*2
		})
	}
	draw(){
		this.legs.forEach(leg=>leg.draw())
	}
}

var seaweeds = []
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)
	seaweeds = Array.from({length: 1},()=>{
		return new Seaweed(createVector(windowWidth*0.8,windowHeight/2))
	})
// 	var gridX = 150
// 	var gridY = 150
//  for(var i=0;i<3;i++){

// 	 for(var o=0;o<3;o++){
// 			seaweeds.push(new Seaweed(createVector(gridX*i,gridY*o)))
// 	 }
//  }
	// frameRate(10)
	angleMode(DEGREES)
}

function draw() {
	background(0)
	seaweeds.forEach(seaweed=>{
		seaweed.update()
		seaweed.draw()
	})
	
	
}

function mousePressed(){
	seaweeds=[new Seaweed(createVector(mouseX,mouseY))]
}
