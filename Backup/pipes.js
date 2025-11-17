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
        this.xRandom = 0
        this.setState(PipeState.IDLE)
    }
    
    draw(ctx) {
        if (this.state != PipeState.IDLE) {
        ctx.save()
        ctx.translate((this.x + this.xRandom), this.yCenter +(this.opening/2))
        ctx.scale(2, 2)
        ctx.drawImage(this.img, 0, 0)
        ctx.restore()

        ctx.save()
        ctx.translate((this.x + this.xRandom), this.yCenter -(this.opening/2))
        ctx.scale(2, -2)
        ctx.drawImage(this.img, 0, 0)
        ctx.restore()
        }
    }

    upperboundingBox() {
        return { x: (this.x + this.xRandom), width: this.img.width, y: this.yCenter -(this.opening/2)-this.img.height, height: this.img.height }
    }

    lowerboundingBox() {
        return { x: (this.x + this.xRandom), width: this.img.width, y: this.yCenter +(this.opening/2), height: this.img.height }
    }


    animate() {
       this.yCenter += this.dy
        this.x += this.dx
        this.x = (this.x + this.dx)
        if(this.x <= -200){
            this.x += 1260
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
            this.yCenter = 160+Math.random()*400
            this.dx = 0
            this.xRandom = 50+Math.random()*100
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
