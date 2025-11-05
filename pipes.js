//setting states in a new way or format
const PipeState = {
    IDLE: "idle",
    PLAYING: "playing",
    GAMEOVER: "gameover",
}

export class Pipe {
    constructor() {
        this.x = 480
        this.yCenter = 0
        this.opening = 200
        this.dx = 0
        this.dy = 0
        this.img = new Image()
        this.img.src = "flappy-bird-pipe.png"
        this.setState(PipeState.IDLE)
    }
    
    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.yCenter)
        ctx.scale(2, 2)
        ctx.drawImage(this.img, 0, 0)
        ctx.restore()

        ctx.save()
        ctx.translate(this.x, this.yCenter)
        ctx.scale(2, -2)
        ctx.drawImage(this.img, 0, 0)
        ctx.restore()
    }
    animate() {
        this.x += this.dx
        this.yCenter += this.dy
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
            this.x = 800
            this.yCenter = 360
            this.dx = 0
             this.dy = 0
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
       