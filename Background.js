export class Background {
    constructor(imagefile,speed) {
        this.x = 0
        this.y = 0
        this.dx = speed
        this.dy = 0

        this.img = new Image()
        this.img.src = imagefile
    }

    draw(ctx) {
        ctx.drawImage(this.img, 0, 0, 1618, 886, this.x, 0, 960, 720)
        ctx.drawImage(this.img, 0, 0, 1618, 886, this.x + 960, 0, 960, 720)
    }


    animate(){
        this.x -= 2

        if(this.x == -960) {
            this.x = 0
        }
    }
}



const State = {
    INTRO: "intro",
    READY: "ready",
    HITPIPE: "hitpipe",
    HITGROUND: "hitground",
    FALLING: "falling",
    ASCENDING: "ascending",
}    