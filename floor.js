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
        ctx.drawImage(this.img, this.x, (720 - this.img.height), 960, 100)
        ctx.drawImage(this.img, this.x + 960, (720 - this.img.height), 960, 100)
    }
    floorheight() {
        return (720 - this.img.height)
    }

    animate(){
        this.x -= this.dx

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