
import {Bird} from './bird.js'
import {Background} from './Background.js'
import {Pipes} from './pipes.js'

const GameState = {
    INTRO: "intro",
    READY: "ready",
    PLAYING: "playing"
}

export default class Game {
    constructor() {
        
        const canvas = document.getElementById("game")
        this.ctx = canvas.getContext("2d")
        document.addEventListener("keydown", this.keydown.bind(this))
        //document.addEventListener("keyup", this.keyup.bind(this))
        this.bird = new Bird()
        this.background = new Background('MinecraftBg.png', 1)
        this.floor = new Background('MinecraftFloor.png', 2)
        this.setState(GameState.INTRO)
    }
    run() {
        console.log ("running the game")
        this.frame()
    }
    frame() {
        this.ctx.clearRect(0, 0, 960, 720)
       
        this.background.draw(this.ctx)
        this.background.animate()
        this.floor.draw(this.ctx)
        this.floor.animate()
       
        if (this.state == GameState.INTRO) {
            this.ctx.font = "30px serif"
            this.ctx.fillStyle = "rgba(0, 0, 0, 1"
            this.ctx.fillText("Welcome Players!", 374, 200)
            this.ctx.fillText("press SPACE to begin...", 350, 550)
        }


        this.bird.draw(this.ctx)
        this.bird.animate()
        window.requestAnimationFrame(this.frame.bind(this))
    }

    keydown(event) {
        if (this.state == GameState.INTRO) {
            if (event.key == " ") {
                this.setState(GameState.READY)
            }
        }
    }

    setState(state) {
      console.log(`Game changing to state ${state}`)
        if (state == GameState.INTRO){
            //this.bird.prepareForGame()
        }

        else if (state == GameState.READY){
            this.bird.prepareForGame()
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