
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
        this.gameovermessages = new Array()
        this.gameovermessages[0] = "Your bird when from flapping to flatlining in 0.2 seconds."
        this.gameovermessages[1] = "Gravity 1, You 0."
        this.gameovermessages[2] = "Your run was shorter than the tutorial."
        this.gameovermessages[3] = "You didn't lose, you donated your dignity to the void."
        this.gameovermessages[4] = "You didn't just crash, you face-planted into destiny's trashcan."
        this.gameovermessages[5] = "Legendärer Crash. Historisch schlecht. Respekt."
        this.gameovermessages[6] = "You flew with the elegance of a thrown brick."
        const canvas = document.getElementById("game")
        this.ctx = canvas.getContext("2d")
        this.now = new Date()
        this.hours = this.now.getHours()

        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"







        document.addEventListener("keydown", this.keydown.bind(this))
        this.bird = new Bird()
        if ((this.hours > 8) && (this.hours < 18)){
            this.background = new Background('JungleWaterfallM.png', 0)
            this.floor = new Floor('BridgeM.png', 2)
        } else  {
            this.background = new Background('JungleWaterfallN.png', 0)
            this.floor = new Floor('BridgeM.png', 2)
        }
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
        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].draw(this.ctx)
        }
        this.floor.draw(this.ctx)
        this.bird.draw(this.ctx)

        if (this.state == GameState.INTRO) {
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(255, 255, 255, 1)"
            this.ctx.fillText("Flappy", 410, 250)
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(255, 255, 255, 1)"
            this.ctx.fillText("Bird", 547, 250)
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(255, 255, 255, 1)"
            this.ctx.fillText("press SPACE to begin...", 480, 500)
            this.birdscore = 0
        }
        else if (this.state == GameState.READY) {
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(255, 255, 255, 1)"
            this.ctx.fillText("Press", 325, 250)
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(255, 255, 255, 1)"
            this.ctx.fillText(" SPACEBAR", 440, 250)
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(255, 255, 255, 1)"
            this.ctx.fillText("to", 545, 250)
            this.ctx.font = "30px monospace"
            this.ctx.fillStyle = "rgba(255, 255, 255, 1)"
            this.ctx.fillText("jump", 610, 250)
        }
        else if (this.state == GameState.GETTINGREADY) {
            if (this.bird.birdIsReady()) {
                this.setState(GameState.READY)
            }
        }
        else if (this.state == GameState.PLAYING) {
            this.ctx.font = "50px monospace"
            this.ctx.fillStyle = "rgba(255, 255, 255, 1)"
            this.ctx.fillText(`${this.birdscore}`, 420, 70) 
        }
        else if (this.state == GameState.GAMEOVER) {
             this.ctx.font = "20px monospace"
            this.ctx.fillStyle = "rgba(255, 255, 255, 1)"
            this.ctx.fillText(this.gameovermessage, 480, 360)
        }
        


        //console.log(this.bird.boundingBox())
        //console.log(this.floor.boundingBox())
        if ((this.state == GameState.PLAYING) || (this.state == GameState.HITPIPE)) {
            if (this.checkCollision(this.bird.boundingBox(), this.floor.boundingBox())) {
                console.log("bird hit floor")
                this.setState(GameState.GAMEOVER)
            }

        }

        this.background.animate()
        this.floor.animate()
        this.bird.animate()

        if (this.state == GameState.PLAYING) {
            var birdbounds = this.bird.boundingBox()
            console.log("animating pipes")
            for (let i = 0; i < this.pipes.length; i++) {
                var firstpipebounds = this.pipes[i].upperboundingBox()
                this.pipes[i].animate()
                var secondpipebounds = this.pipes[i].upperboundingBox()
                console.log(`has bird @ ${birdbounds.x} passed pipe @ ${firstpipebounds.x} ?`)
                if ((birdbounds.x < firstpipebounds.x) && (birdbounds.x >= secondpipebounds.x)) {
                    this.birdscore += 1
                }
                if (this.checkCollision(this.bird.boundingBox(), this.pipes[i].upperboundingBox())) {
                    console.log("bird hit pipe")
                    this.setState(GameState.HITPIPE)
                }
                if (this.checkCollision(this.bird.boundingBox(), this.pipes[i].lowerboundingBox())) {
                    console.log("bird hit pipe")
                    this.setState(GameState.HITPIPE)

                }
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
            for (let i = 0; i < this.pipes.length; i++) {
                this.pipes[i].stopmoving()
            }
            this.bird.hittingThePipe()
            this.floor.gameover()
            this.background.notmoving()
        }

        else if (state == GameState.GAMEOVER) {
            for (let i = 0; i < this.pipes.length; i++) {
                this.pipes[i].stopmoving()
            }
            this.bird.hittingTheGround()
            this.floor.gameover()
            this.background.notmoving()
            this.gameovermessage = this.gameovermessages[Math.floor(Math.random() * 6)]
        }
        // else if (state == State.FALLING) {

        // }
        // else if (state == State.ASCENDING) {

        // }
        // */
        this.state = state
    }
}