



const INTRO = 0
const PLAYING = 1
const SCORE1 = 2
const SCORE2 = 3
const GAMEOVER = 4
const MIDDLEPART = 5

const PLAYER1 = 0
const PLAYER2 = 1

const MAXSCORE = 3

const randomNumber = Math.random()



class Pong {
    //Main game function
    constructor() {
        //Get and clear canvas
        const canvas = document.getElementById("pong")
        this.ctx = canvas.getContext("2d")

        this.ctx.scale(2, 2)

        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"
        this.ctx.font = "48px serif"


        this.leftpaddle = new Paddle(20, 180)
        this.rightpaddle = new Paddle(460, 180)
        this.ball = new Ball(240, 180)

        document.addEventListener("keydown", this.pong_keydown.bind(this))
        document.addEventListener("keyup", this.pong_keyup.bind(this))

        this.new_game()

        this.frame()

    }





    frame() {
    

        //clear the screen
        this.ctx.clearRect(0, 0, 480, 360)

        if (this.gamestate != MIDDLEPART){
            //Draw Ball
            this.ball.draw(this.ctx)
            //draw paddle
            this.leftpaddle.draw(this.ctx)
            this.rightpaddle.draw(this.ctx)


            //Draw INTRO Banner

            
            this.ctx.fillText(`${this.Player1}`, 30, 330)
            this.ctx.fillText(`${this.Player2}`, 450, 330)
        }

        if (this.gamestate == INTRO) {
            this.ctx.font = "30px serif"
            this.ctx.fillStyle = "rgba(0, 0, 0, 1"
            this.ctx.fillText("Welcome Players", 240, 125)
            this.ctx.fillText("press SPACE to begin", 240, 250)
        }




        else if (this.gamestate == PLAYING) {

            //move ball
            this.ball.animate()
            //move paddle
            this.leftpaddle.animate()
            this.rightpaddle.animate()

            if (circle_rect_sdf(this.ball, this.leftpaddle) <= 0) {
                this.ball.dx *= -1.01
            }

            if (circle_rect_sdf(this.ball, this.rightpaddle) <= 0) {
                this.ball.dx *= -1.01
            }

            if (this.ball.x > (480 - this.ball.radius)) {
                this.end_round(PLAYER1)
            }
            if ((this.ball.x < (0 + this.ball.radius))) {
                this.end_round(PLAYER2)
            }
        } else if (this.gamestate == SCORE1) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 1)"
            this.ctx.fillText("SCORE player 1", 240, 180)
        }
        else if (this.gamestate == SCORE2) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 1)"
            this.ctx.fillText("SCORE player 2", 240, 180)
        }
        else if (this.gamestate == GAMEOVER) {
            if (this.Player1 == MAXSCORE) {
                this.ctx.fillStyle = "rgba(0, 0, 0, 1)"
                this.ctx.fillText("player 1 Wins", 240, 150)
                this.ctx.fillText("get rocked by player 1 player 2", 240, 230)
                //this.ctx.fillText("Press ESC to get back to INTRO", 240, 230)
            }
        else if (this.Player2 == MAXSCORE) {
                this.ctx.fillStyle = "rgba(0, 0, 0, 1)"
                this.ctx.fillText("player 2 Wins", 240, 150)
                this.ctx.fillText("get rocked by player 2 player 1", 240, 230)
                //this.ctx.fillText("Press ESC to get back to INTRO", 240, 230)
            }
        }
        else if (this.gamestate == MIDDLEPART) {
            this.ctx.font = "50px serif"
            this.ctx.fillStyle = "rgba(59, 121, 54, 1)"
            this.ctx.fillText("Go touch grass!!!", 240, 150)
            this.ctx.font = "30px serif"
            this.ctx.fillStyle = "rgba(255, 92, 92, 1)"
            this.ctx.fillText("If you want to play again", 240, 230)
            this.ctx.fillText("press ESC to get back to INTRO", 240, 270)
        }

        //Next Frame
        window.requestAnimationFrame(this.frame.bind(this))
    }







    new_round() {
        this.ball.x = 240
        this.ball.y = 180
        this.ball.dx = 3
        this.ball.dy = (Math.random()*2)+1
        if(Math.random() > 0.5){
            this.ball.dy *= -1
        }
        this.gamestate = PLAYING

    }


    new_game() {
        this.new_round()
        this.gamestate = INTRO
        this.leftpaddle.y = 180
        this.rightpaddle.y = 180

        //0 intro/instructions
        //1 playing
        //2 Score
        //3 gameover

        //start score at 0
        this.Player1 = 0
        this.Player2 = 0


    }



    end_round(player) {
        this.leftpaddle.dy = 0
        this.rightpaddle.dy = 0
        if (player == PLAYER1) {
            this.Player1 += 1
            this.gamestate = SCORE1
        }
        else if (player == PLAYER2) {
            this.Player2 += 1
            this.gamestate = SCORE2
        }

        if (this.Player1 == MAXSCORE) {
            this.gamestate = GAMEOVER
        }
        else if (this.Player2 == MAXSCORE) {
            this.gamestate = GAMEOVER
        }
    }




    pong_keydown(event) {
        if (this.gamestate == PLAYING) {
            if (event.key == "ArrowDown") {
                this.rightpaddle.dy = 5
            }

            if (event.key == "ArrowUp") {
                this.rightpaddle.dy = -5
            }

            if (event.key == "s") {
                this.leftpaddle.dy = 5
            }

            if (event.key == "w") {
                this.leftpaddle.dy = -5
            }
        } else if (this.gamestate == INTRO) {
            if (event.key == " ") {
                this.gamestate = PLAYING
                this.new_round()
            }

        } else if (this.gamestate == GAMEOVER) {
            if (event.key == " ") {
                this.gamestate = MIDDLEPART
            }
        } else if (this.gamestate == SCORE1) {
            if (event.key == " ") {
                this.gamestate = PLAYING
                this.new_round()
            }
        } else if (this.gamestate == SCORE2) {
            if (event.key == " ") {
                this.gamestate = PLAYING
                this.new_round()
            }
        } else if (this.gamestate == MIDDLEPART) {
            if (event.key == "Escape") {
                this.gamestate = INTRO
                this.new_game()
            }
        }
    }

    pong_keyup(event) {
        if (event.key == "ArrowDown") {
            this.rightpaddle.dy = 0
        }

        if (event.key == "ArrowUp") {
            this.rightpaddle.dy = 0
        }

        if (event.key == "s") {
            this.leftpaddle.dy = 0
        }

        if (event.key == "w") {
            this.leftpaddle.dy = 0
        }
    }

}



class Ball {
    x
    y
    dx
    dy
    radius

    constructor(x, y) {
        this.x = x
        this.y = y
        this.dx = 2
        this.dy = 3
        this.radius = 15
    }

    draw(ctx) {
        ctx.fillStyle = "rgba(190, 129, 240, 1)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
    }

    animate() {
        this.x = this.x + this.dx
        this.y = this.y + this.dy

        /* if ((this.x > (480 - this.radius)) || (this.x < (0 + this.radius))) {
             this.dx = -this.dx
         }*/
        if ((this.y > (360 - this.radius)) || (this.y < (0 + this.radius))) {
            this.dy = -this.dy
        }
    }
}



function circle_rect_sdf(circle, rect) {
    vec_x = circle.x - rect.x
    vec_y = circle.y - rect.y
    dist_to_rect_x = Math.abs(vec_x) - (rect.width / 2)
    dist_to_rect_y = Math.abs(vec_y) - (rect.height / 2)
    nearest_rect_dist = Math.max(dist_to_rect_x, dist_to_rect_y)
    signed_distance = nearest_rect_dist - circle.radius
    return signed_distance
}



class Paddle {
    x
    y
    dx
    dy
    width
    height

    constructor(x, y) {
        this.x = x
        this.y = y
        this.dx = 0
        this.dy = 0
        this.width = 15
        this.height = 115
    }

    draw(ctx) {
        ctx.fillStyle = "rgba(165, 181, 233, 1)"
        ctx.fillRect(this.x - (this.width / 2),
            this.y - (this.height / 2),
            this.width, this.height)
    }

    animate() {
        this.x = this.x + this.dx
        this.y = this.y + this.dy
    }
}





var pongGame
function pong() {
    pongGame = new Pong()
}