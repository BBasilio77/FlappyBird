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

    goToINTRO(){
        this.x = 480
    }
    goToSTART(){
        this.x = 200
    }
}
    



//setting states in a new way or format
const State = {
    IDLE: "idle",
    READY: "ready",
    HITPIPE: "hitpipe",
    HITGROUND: "hitground",
    FALLING: "falling",
    ASCENDING: "ascending",
}
