//setting states in a new way or format
const BirdState = {
    IDLE: "idle",
    GETTINGREADY: "gettingready",
    READY: "ready",
    PLAYING: "playing",
    HITPIPE: "hitpipe",
    HITGROUND: "hitground",
    FALLING: "falling",
    ASCENDING: "ascending",
}

export class Bird {
    constructor() {
        this.x = 480
        this.y = 0
        this.radius = 25
        this.dx = 0
        this.dy = 0
        this.statecounter = 0
        this.bobangle = 0
        //angle goes here
        //flap sequence here
        this.isflying = false
        this.isgravity = false
        this.setState(BirdState.IDLE)
        this.img = new Image();
        this.img.src = 'bird.webp';
        this.img.src = 'yoshibird.webp';
    }
    
    draw(ctx) {
       
        ctx.save()
        ctx.translate(this.x, this.y)
       if(this.state != BirdState.HITGROUND) { ctx.rotate(((this.bobangle * 4) * Math.PI) / 180) }
       else {
        ctx.scale (1, 0.2)
        ctx.translate (0, 40 * 0.8)
       }
        ctx.drawImage(this.img, -20, -20, 40, 40)
        ctx.restore()
    }
    boundingBox() {
        return { x: this.x -20, width: 40, y: this.y -20, height: 40 }
    }
    
    animate() {
        this.x += this.dx
        this.y += this.dy
        if (this.isgravity) {
            this.dy += 0.15

        }

        this.bobangle = (this.bobangle * 0.90) + (this.dy * 0.10)

        //this.radius = (this.radius + 1)%100
        if (this.state == BirdState.GETTINGREADY) {
            this.statecounter -= 1
            if (this.statecounter == 0) {
                this.setState(BirdState.READY)
            }
        } else if (this.state == BirdState.ASCENDING) {
            if (this.dy >= 0) {
                this.setState(BirdState.FALLING)
            }
        }
      
    }

    prepareForGame(){
        this.setState(BirdState.GETTINGREADY)
    }
    startToFly(){
        this.setState(BirdState.FALLING)
    }
    hittingThePipe() {
        this.setState(BirdState.HITPIPE)
    }
    hittingTheGround() {
        this.setState(BirdState.HITGROUND)
    }

    //falling & ascending is in "jump() {}"
    jump() {
        this.setState(BirdState.ASCENDING)
    }

    


    setState(state) {
        console.log(`Bird changing to state "${state}"`)
        
        if (state == BirdState.IDLE){
            this.x = 480
            this.y = 360
            this.dx = 0
            this.dy = 0
            this.isgravity = false
            this.isflying = false
        }
        else if (state == BirdState.GETTINGREADY) {
            this.dx = -5
            this.statecounter = 60
        }
        
        else if (state == BirdState.READY) {
            this.dx = 0
        }
        else if (state == BirdState.FALLING) {
            if (this.state == BirdState.READY) {
                this.dy = 0
            }
            this.isgravity = true
            this.isflying = true 
        }
        else if (state == BirdState.ASCENDING) {
            this.dy = -3
            this.isgravity = true
        }
        else if (state == BirdState.HITPIPE) {
            this.dy = +1
        }

        else if (state == BirdState.HITPIPE) {
            this.state = BirdState.FALLING
        }

         else if (state == BirdState.HITGROUND) {
            this.dy = 0
            this.dx = 0
        }
        
        //for ascending, to change to falling state, check to see if DY is + or -
        //When the APEX is reached, switch to falling state
        this.state = state
    }
}  
        
       
    




