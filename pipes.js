export class Pipes {
    constructor() {
        this.x = 0
        this.y = 0
        this.dx = 0
        this.dy = 0

        this.img = new Image()
        this.img.src = "flappy-bird-pipe.png"
    }

    draw(ctx) {
        ctx.drawImage(this.img, 0, 0, 1153, 467, this.x, 0, 960, 720)
        ctx.drawImage(this.img, 0, 0, 1153, 467, this.x + 960, 0, 960, 720)
    }


    animate(){
        this.x -= 2

        /*if(this.x == -960) {
            this.x = 0
        }*/
        
        console.log("Animating pipes")
    }
}



const State = {
    NOTDHOWING: "not shpwing",
    SHOWING: "showing",
    MOVING: "moving",
}    