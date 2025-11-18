
import { Bird } from './bird.js'
import { Background } from './Background.js'
import { Pipe } from './pipes.js'
import { Floor } from './floor.js'

const GameState = {
    INTRO: "intro",
    GETTINGREADY: "gettingready",
    READY: "ready",
    PLAYING: "playing",
    HITPIPE: "hitpipe",
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
        this.floor = new Floor('Floor2.0.png', 2)
        this.createPipes()
        this.setState(GameState.INTRO)
    }

    createPipes() {
        var numberpipes = 5
        this.pipes = []
        for (let i = 0; i < numberpipes; i++) {
            this.pipes[i] = new Pipe(-2, 1060 + ((1260 / numberpipes) * i))
        }
    }





    run() {
        console.log("running the game")
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

        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].draw(this.ctx)
            this.pipes[i].animate()
        }

        this.floor.draw(this.ctx)
        this.floor.animate()

        if (this.state == GameState.INTRO) {
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(255, 0, 0, 1)"
            this.ctx.fillText("Flappy", 380, 250)
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(255, 238, 0, 1)"
            this.ctx.fillText("Bird", 490, 250)
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(8, 0, 255, 1)"
            this.ctx.fillText("press SPACE to begin...", 310, 500)
        }
        else if (this.state == GameState.READY) {
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(255, 0, 0, 1)"
            this.ctx.fillText("Press", 300, 250)
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(30, 0, 255, 1)"
            this.ctx.fillText(" SPACEBAR", 375, 250)
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(255, 242, 0, 1)"
            this.ctx.fillText("to", 535, 250)
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(0, 255, 38, 1)"
            this.ctx.fillText("jump", 580, 250)
        }
        else if (this.state == GameState.GETTINGREADY) {
            if (this.bird.birdIsReady()) {
                this.setState(GameState.READY)
            }
        }




        this.bird.draw(this.ctx)
        this.bird.animate()

        //console.log(this.bird.boundingBox())
        //console.log(this.floor.boundingBox())
        if (this.checkCollision(this.bird.boundingBox(), this.floor.boundingBox())) {
            console.log("bird hit floor")
            this.setState(GameState.GAMEOVER)
        }
        //else if (this.checkCollision(this.bird.boundingBox(), this.pipe.lowerboundingBox() )) {
        //    console.log("bird hit lower pipe")
        //    this.setState(GameState.HITGROUND)
        //}
        for (let i = 0; i < this.pipes.length; i++) {
            if (this.checkCollision(this.bird.boundingBox(), this.pipes[i].upperboundingBox())) {
                console.log("bird hit pipe")
                this.setState(GameState.HITPIPE)
            }
            if (this.checkCollision(this.bird.boundingBox(), this.pipes[i].lowerboundingBox())) {
                console.log("bird hit pipe")
                this.setState(GameState.HITPIPE)
            }
        }

        window.requestAnimationFrame(this.frame.bind(this))
    }

    keydown(event) {
        if (this.state == GameState.INTRO) {
            if (event.key == " ") {
                this.setState(GameState.GETTINGREADY)
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
        if (state == GameState.INTRO) {
            //this.bird.prepareForGame()
        }
        else if (state == GameState.GETTINGREADY) {
            this.bird.prepareForGame()
        }
            
        else if (state == GameState.READY) {
            
        }

        else if (state == GameState.PLAYING) {
            this.bird.startToFly()
            for (let i = 0; i < this.pipes.length; i++) {
                this.pipes[i].startmoving()
            }

        }

        else if (state == GameState.HITPIPE) {
            for (let i = 0; i < this.pipes.length; i++){
            this.pipes[i].stopmoving()
            }
            this.bird.hittingThePipe()
            this.floor.gameover()
            this.background.notmoving()
        }

        else if (state == GameState.GAMEOVER) {
            for (let i = 0; i < this.pipes.length; i++){
            this.pipes[i].stopmoving()
            }
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