const BackgroundState = {
    MOVING: "moving",
    NOTMOVING: "notmoving",
}   
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
        ctx.drawImage(this.img, this.x, 0, 960, 720)
        ctx.drawImage(this.img, this.x + 960, 0, 960, 720)
    }


    animate(){
        this.x -= this.dx

        if(this.x == -960) {
            this.x = 0
        }
    }

    moving() {
        this.setState(BackgroundState.MOVING)
    }
    notmoving() {
        this.setState(BackgroundState.NOTMOVING)
    }

    setState(state){
        if (state == BackgroundState.MOVING){
            this.dx = 0
            this.dy = 0
        }
        if (state == BackgroundState.NOTMOVING){
            this.dx = 0
        }
    }


}




 