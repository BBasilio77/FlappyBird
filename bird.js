//setting states in a new way or format
const BirdState = {
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
        this.state = BirdState.IDLE
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
        this.setState(BirdState.IDLE)
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
            this.x = 0
            this.dx = 0
             this.dy = 0
            this.isflying = false
        }
        else if (state == BirdState.READY){
            this.x = 200
        }
        
        else if (state == BirdState.HITPIPE) {
            this.dy = 0
            this.isgravity = false
        }
        else if (state == BirdState.HITGROUND) {
            
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
        
       
    




