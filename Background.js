export class Background {
    constructor() {
        this.x = 480
        this.radius = 0
        this.y = 0
        this.dx = 0
        this.dy = 0

        this.img = new Image()
        this.img.src = "Background.png"
    }

    draw(ctx) {
        ctx.drawImage(this.img, 10, 10, 200, 150)
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