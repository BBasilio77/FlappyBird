//setting states in a new way or format
const PipeState = {
    IDLE: "idle",
    PLAYING: "playing",
    GAMEOVER: "gameover",
}

export class Pipe {
    constructor() {
        this.x = 480
        this.y = 0
        this.dx = 0
        this.dy = 0
        this.img = new Image()
        this.img.src = "flappy-bird-pipe.png"
        this.setState(PipeState.IDLE)
    }
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, 0, 960, 720)
    }
    animate() {
        this.x += this.dx
        this.y += this.dy
    }

    prepareForGame(){
        this.setState(PipeState.PLAYING)
    }
    startToFly(){
        this.setState(PipeState.FALLING)
    }
    hittingThePipe() {
        this.setState(PipeState.HITPIPE)
    }
    hittingTheGround() {
        this.setState(PipeState.HITGROUND)
    }

    //falling & ascending is in "jump() {}"
    jump() {
        this.setState(PipeState.ASCENDING)
    }
    


    setState(state) {
        console.log(`Bird changing to state ${state}`)
        
        if (state == PipeState.IDLE){
            this.x = 480
            this.y = 360
            this.dx = 0
             this.dy = 0
            this.isflying = false
        }
        else if (state == PipeState.PLAYING) {
            this.dx = -5
            this.statecounter = 60
        }
        
        else if (state == PipeState.GAMEOVER) {
            this.dx = 0
        }
        else if (state == PipeState.FALLING) {
            this.dy = 0
            this.isgravity = true
            this.isflying = true 
        }
        else if (state == PipeState.ASCENDING) {
            this.dy = 10
            this.isgravity = true      
        }
        this.state = state
    }
}  
       