//setting states in a new way or format
const PipeState = {
    IDLE: "idle",
    PLAYING: "playing",
    GAMEOVER: "gameover",
}

export class Pipe {
    constructor(speed, startingPOS) {
        this.startingPOS = startingPOS
        this.y = 0
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
        ctx.translate((this.x + this.xRandom), this.y +(this.opening/2))
        ctx.scale(2, 2)
        ctx.drawImage(this.img, 0, 0)
        ctx.restore()

        ctx.save()
        ctx.translate((this.x + this.xRandom), this.y -(this.opening/2))
        ctx.scale(2, -2)
        ctx.drawImage(this.img, 0, 0)
        ctx.restore()
        }
    }

    upperboundingBox() {
        return { 
            x: (this.x + this.xRandom),  
            y: this.y -(this.opening/2)-this.img.height,
            width: this.img.width, 
            height: this.img.height }
    }

    lowerboundingBox() {
        return { 
            x: (this.x + this.xRandom), 
            y: this.y +(this.opening/2), 
            width: this.img.width, 
            height: this.img.height }
    }


    animate() {
       this.y += this.dy
        this.x += this.dx
        this.x = (this.x + this.dx)
         if(this.x <= -200){
            this.x +=1260 
            this.yRandom = Math.random()*400-200
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
            this.y = 160+Math.random()*400
            this.dx = 0
            this.xRandom = 50+Math.random()*100
        }
        else if (state == PipeState.PLAYING) {
            this.dx = -2
        }
        
        else if (state == PipeState.GAMEOVER) {
            this.dx = 0
            this.dy = 0
        }
        this.state = state
    }
}  
