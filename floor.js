const FloorState = {
    INTRO: "intro",
    PLAYING: "playing",
    GAMEOVER: "gameover",
}  



export class Floor {
    constructor(imagefile,speed) {
        this.x = 0
        this.y = 0
        this.dx = speed
        this.dy = 0

        this.img = new Image()
        this.img.src = imagefile
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, (720 - this.img.height))
        ctx.drawImage(this.img, this.x + 960, (720 - this.img.height))
    }
    boundingBox() {
        //return (720 - this.img.height)
        return { x: 0, width: 960, y: 720-this.img.height, height: this.img.height }
    }

    animate(){
        this.x -= this.dx

        if(this.x == -960) {
            this.x = 0
        }
    }

    intro(){
        this.setState(FloorState.INTRO)
    }
    playing(){
        this.setState(FloorState.PLAYING)
    }
    gameover(){
        this.setState(FloorState.GAMEOVER)
    }


    setState(state) {
         if (state == FloorState.INTRO){
            this.dx = 0
            this.dy = 0
        }
        else if (state == FloorState.PLAYING) {
            this.dx = -2
        }
        
        else if (state == FloorState.GAMEOVER) {
            this.dx = 0
        }
        this.state = state
    }

}


  