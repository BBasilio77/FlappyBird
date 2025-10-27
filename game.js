
import {Bird} from './bird.js'
import {Background} from './Background.js'

const State = {
    INTRO: "intro",
    READY: "ready",
//    HITPIPE: "hitpipe",
//    HITGROUND: "hitground",
//    FALLING: "falling",
//    ASCENDING: "ascending",
}

export default class Game {
    constructor() {
        
        const canvas = document.getElementById("game")
        this.ctx = canvas.getContext("2d")
        document.addEventListener("keydown", this.keydown.bind(this))
        //document.addEventListener("keyup", this.keyup.bind(this))
        this.bird = new Bird()
        this.background = new Background
        this.setState(State.INTRO)
    }
    run() {
        console.log ("running the game")
        this.frame()
    }
    frame() {
        this.ctx.clearRect(0, 0, 960, 720)
        if (this.state == State.INTRO) {
            this.ctx.font = "30px serif"
            this.ctx.fillStyle = "rgba(0, 0, 0, 1"
            this.ctx.fillText("Welcome Players!", 374, 200)
            this.ctx.fillText("press SPACE to begin...", 350, 550)
        }

        this.background.draw(this.ctx)
        this.background.animate()
        this.bird.draw(this.ctx)
        this.bird.animate()
        window.requestAnimationFrame(this.frame.bind(this))
    }

    keydown(event) {
        if (this.state == State.INTRO) {
            if (event.key == " ") {
                this.setState(State.START)
            }
        }
    }

  setState(state){
        if (state == State.INTRO){
            this.bird.prepareForGame()
        }
        else if (state == State.START){
            this.x = 200
        }
            /*
        else if (state == State.HITPIPE) {
            
        }
        else if (state == State.HITGROUND) {
            
        }
        else if (state == State.FALLING) {
            
        }
        else if (state == State.ASCENDING) {
            
        }
        */
        this.state = state
    }
}