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




}



const State = {
    INTRO: "intro",
    READY: "ready",
    HITPIPE: "hitpipe",
    HITGROUND: "hitground",
    FALLING: "falling",
    ASCENDING: "ascending",
}    