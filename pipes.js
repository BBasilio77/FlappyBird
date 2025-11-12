//setting states in a new way or format
const PipeState = {
    IDLE: "idle",
    PLAYING: "playing",
    GAMEOVER: "gameover",
}

export class Pipe {
    constructor(speed, startingPOS) {
        this.startingPOS = startingPOS
        this.yCenter = 0
        this.opening = 200
        this.dx = speed
        this.dy = 0
        this.invisible = false
        this.img = new Image()
        this.img.src = "flappy-bird-pipe.png"
        this.setState(PipeState.IDLE)
    }
    
    draw(ctx) {
        if (this.state != PipeState.IDLE) {
        ctx.save()
        ctx.translate(this.x, this.yCenter +(this.opening/2))
        ctx.scale(2, 2)
        ctx.drawImage(this.img, 0, 0)
        ctx.restore()

        ctx.save()
        ctx.translate(this.x, this.yCenter -(this.opening/2))
        ctx.scale(2, -2)
        ctx.drawImage(this.img, 0, 0)
        ctx.restore()
        }
    }
    animate() {
       this.yCenter += this.dy
        this.x += this.dx
        this.x = (this.x + this.dx)
        if(this.x == -100){
            this.x = 960
        }
    }

    startmoving(){
        this.setState(PipeState.PLAYING)
    }
    stopmoving(){
        this.setState(PipeState.GAMEOVER)
    }

    setState(state) {
        console.log(`Pipe changing to state ${state}`)
        
        if (state == PipeState.IDLE){
            this.x = this.startingPOS
            this.yCenter = 360
            this.dx = 0
        }
        else if (state == PipeState.PLAYING) {
            this.dx = -2
        }
        
        else if (state == PipeState.GAMEOVER) {
            this.dx = 0
        }
        this.state = state
    }
}  
       