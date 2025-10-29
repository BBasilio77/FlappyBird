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
        //angle goes here
        //flap sequence here
        this.isflying = false
        this.isgravity = false
        this.setState(BirdState.IDLE)
    }
    
    draw(ctx) {
        ctx.fillStyle = "rgba(0, 0, 0, 1)"
        ctx.beginPath()
        ctx.arc(this.x, 360, this.radius, 0, Math.PI * 2)
        ctx.fill()
    }
    animate() {
        this.x += this.dx
        this.y += this.dy
        if (this.isgravity) {
                this.dy += 1

        }
        //this.radius = (this.radius + 1)%100
        if (this.state == BirdState.GETTINGREADY) {
            this.statecounter -= 1
            if (this.statecounter == 0) {
                this.setState(BirdState.READY)
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
        console.log(`Bird changing to state ${state}`)
        
        if (state == BirdState.IDLE){
            this.x = 480
            this.y = 360
            this.dx = 0
             this.dy = 0
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
            this.dy = 0
            this.isgravity = true
            this.isflying = true 
        }
        else if (state == BirdState.ASCENDING) {
            this.dy = 10
            this.isgravity = true      
        }
        this.state = state
    }
}  
        
       
    




