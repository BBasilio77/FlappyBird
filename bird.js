export class Bird {
    constructor() {
        this.x = 0
        this.y = 0
        this.dx = 0
        this.dy = 0
        //angle goes here
        //flap sequence here
        this.isflying = false
        this.isgravity = false
        this.state = State.IDLE



    }
    new_round() {

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
