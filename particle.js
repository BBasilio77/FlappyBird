

export class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.dx = 0
        this.dy = 2
        this.img = new Image()
        this.img.src = "snowflake.webp"
    }

    draw(ctx) {

        ctx.save()
        ctx.translate((this.x), (this.y)),
        ctx.scale(0.25, 0.25)
        ctx.drawImage(this.img, 0, 0)
        ctx.restore()
        
    }

    animate() {
       this.y += this.dy
        this.x += this.dx
         if(this.y >= 740){
            this.y -= 760
        }
    }


}

export class ParticleSystem {


    constructor() {
        this.numberparticles = 200
        this.particles = []
        for (let i = 0; i < this.numberparticles; i++) {
            this.particles[i] = new Particle(Math.random()* 960, Math.random()*720)
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.numberparticles; i++) {
            this.particles[i].draw(ctx)
        }
    }

    animate(ctx) {
for (let i = 0; i < this.numberparticles; i++) {
    this.particles[i].animate(ctx)
}
    }

}
