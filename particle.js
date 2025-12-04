const ParticleState = {
    IDLE: "idle",
}

export class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.dx = 0
        this.dy = 2
        this.img = new Image()
        this.img.src = "snowflake.webp"
        this.setState(ParticleState.IDLE)
    }

    draw(ctx) {
        if (this.state != ParticleState.IDLE) {
        ctx.save()
        ctx.translate((this.x), (this.y)),
        ctx.scale(1, 1)
        ctx.drawImage(this.img, 0, 0)
        ctx.restore()
        }
    }

    animate() {
       this.y += this.dy
        this.x += this.dx
         if(this.y <= -200){
            this.y +=1260 
        }
    }


    setState(state) {
        console.log(`Particle changing to state ${state}`)
        
        if (state == ParticleState.IDLE){

        }
        this.state = state
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
