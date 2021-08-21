var ball;
var database;
var ballPosition;
var position;

function setup() {
    database = firebase.database();
    createCanvas(500, 500);
    ball = createSprite(250, 250, 10, 10);
    ball.shapeColor = "red";
    ballPosition = database.ref("ball/position");
    ballPosition.on("value", readPosition, showError);
}

function draw() {
    background("white");
    if (position != undefined) {
        if (keyDown(LEFT_ARROW)) {
            writePosition(-3, 0);
        }
        else if (keyDown(RIGHT_ARROW)) {
            writePosition(3, 0);
        }
        else if (keyDown(UP_ARROW)) {
            writePosition(0, -3);
        }
        else if (keyDown(DOWN_ARROW)) {
            writePosition(0, +3);
        }
    }

    drawSprites();
}

function writePosition(x, y) {
    ballPosition.set({
        x: position.x + x,
        y: position.y + y,
    })

}

function readPosition(data) {
    position = data.val();
    console.log(position);
    ball.x = position.x;
    ball.y = position.y;
}

function showError() {
    console.log("error");
}