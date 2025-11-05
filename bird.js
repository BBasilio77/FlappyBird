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
        ctx.rotate(((this.bobangle * 4) * Math.PI) / 180)
        ctx.drawImage(this.img, 0, 0, 40, 40)
        ctx.restore()
        
       
  
    }
    animate() {
        this.x += this.dx
        this.y += this.dy
        if (this.isgravity) {
            this.dy += 0.1

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
            /*I made the checker here, the bird successfully switches between states, although the bird didn't move until
            I switched the DY in the falling state to -2. another problem is implementing the FALLING state.*/

        }
        
        
        //for ascending, to change to falling state, check to see if DY is + or -
        //When the APEX is reached, switch to falling state
        this.state = state
    }
}  
        
       
    




