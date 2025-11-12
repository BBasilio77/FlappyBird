
import {Bird} from './bird.js'
import {Background} from './Background.js'
import { Pipe } from './pipes.js'
import {Floor} from './floor.js'

const GameState = {
    INTRO: "intro",
    READY: "ready",
    PLAYING: "playing",
    GAMEOVER: "gameover"
}

export default class Game {
    constructor() {
        const canvas = document.getElementById("game")
        this.ctx = canvas.getContext("2d")
   
        
       

        document.addEventListener("keydown", this.keydown.bind(this))
        //document.addEventListener("keyup", this.keyup.bind(this))
        this.bird = new Bird()
        this.background = new Background('newbackground.webp', 1)
        this.floor = new Floor('FloorNew.png', 2)
        this.pipe = new Pipe()
        this.setState(GameState.INTRO)
    }
    run() {
        console.log ("running the game")
        this.frame()
    }

    checkCollision(obj1, obj2) {
       if (
        (obj1.x < (obj2.x + obj2.width)) &&
        ((obj1.x + obj1.width) > obj2.x) &&
        (obj1.y < (obj2.y + obj2.height)) &&
        ((obj1.y + obj1.height) > obj2.y)
    ) {
        return true
    } else {
        return false
    }
    }

    frame() {
        this.ctx.clearRect(0, 0, 960, 720)
       
       
       
        this.background.draw(this.ctx)
        this.background.animate()
       
       
        this.floor.draw(this.ctx)
        this.floor.animate()
       
        if (this.state == GameState.INTRO) {
            this.ctx.font = "30px cursive"
            this.ctx.fillStyle = "rgba(255, 0, 0, 1)"
            this.ctx.fillText("Flappy", 420, 250)
            this.ctx.font = "30px cursive"
            this.ctx.fillStyle = "rgba(255, 238, 0, 1)"
            this.ctx.fillText("Bird", 520, 250)
            this.ctx.fillStyle = "rgba(8, 0, 255, 1)"
            this.ctx.fillText("press SPACE to begin...", 350, 500)
        }
        


        this.pipe.draw(this.ctx)
        this.pipe.animate()
        this.bird.draw(this.ctx)
        this.bird.animate()

        //console.log(this.bird.boundingBox())
        //console.log(this.floor.boundingBox())
        if (this.checkCollision(this.bird.boundingBox(), this.floor.boundingBox() )) {
            console.log("bird hit floor")
            this.setState(GameState.GAMEOVER)
        }

        window.requestAnimationFrame(this.frame.bind(this))
    }
    
    keydown(event) {
        if (this.state == GameState.INTRO) {
            if (event.key == " ") {
                this.setState(GameState.READY)
            }
        }
        else if (this.state == GameState.READY) {
            if (event.key == " ") {
                this.setState(GameState.PLAYING)
        
            }
        }
        else if (this.state == GameState.PLAYING) {
            if (event.key == " ") {
                this.bird.jump()
            }
        }
    }

    setState(state) {
      console.log(`Game changing to state "${state}"`)
        if (state == GameState.INTRO){
            //this.bird.prepareForGame()
        }

        else if (state == GameState.READY){
            this.bird.prepareForGame()
        }
            
        else if (state == GameState.PLAYING) {
            this.bird.startToFly()
            this.pipe.startmoving()
        }
        else if (state == GameState.GAMEOVER) {
            this.pipe.stopmoving()
            this.bird.hittingTheGround()
            this.floor.gameover()
            this.background.notmoving()
       }
       // else if (state == State.FALLING) {
            
       // }
       // else if (state == State.ASCENDING) {
            
       // }
       // */
        this.state = state
    }
}