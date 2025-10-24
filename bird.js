//setting states in a new way or format
const State = {
    IDLE: "idle",
    READY: "ready",
    HITPIPE: "hitpipe",
    HITGROUND: "hitground",
    FALLING: "falling",
    ASCENDING: "ascending",
}

export class Bird {
    constructor() {
        this.x = 480
        this.radius = 0
        this.y = 0
        this.dx = 0
        this.dy = 0
        //angle goes here
        //flap sequence here
        this.isflying = false
        this.isgravity = false
        this.state = State.IDLE
    }
         draw(ctx) {
        ctx.fillStyle = "rgba(0, 0, 0, 1)"
        ctx.beginPath()
        ctx.arc(this.x, 360, this.radius, 0, Math.PI * 2)
        ctx.fill()
    }
    animate(){
        this.radius = (this.radius + 1)%100
    }

    prepareForGame(){
        this.setState(State.INTRO)
    }
    movetoStartingPosition(){
        this.setState(State.START)
    }
    hittingThePipe() {
        this.setState(State.HITPIPE)
    }
    hittingTheGround() {
        this.setState(State.HITGROUND)
    }

    //falling & ascending is in "jump() {}"
    jump() {
        this.setState(State.ASCENDING)
    }
    


    setState(state) {
        if (state == State.INTRO){
            this.x = 480
            this.dx = 0
             this.dy = 0
            this.isflying = false
        }
        else if (state == State.START){
            this.x = 200

        }
        else if (state == State.HITPIPE) {
            this.dy = 0
            this.isgravity = false
        }
        else if (state == State.HITGROUND) {
            
        }
        else if (state == State.FALLING) {
            this.dy = 0
            this.isgravity = true
            this.isflying = true 
        }
        else if (state == State.ASCENDING) {
            this.dy = 10
            this.isgravity = true      
        }
        this.state = state
    }
}  
        
       
    




