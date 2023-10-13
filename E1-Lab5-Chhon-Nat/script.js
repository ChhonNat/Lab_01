const canvas = document.getElementById("canpic");
const ctx = canvas.getContext("2d");

// helper function
function randomInteger(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
    return 'rgb(' + randomInteger(0, 255) + ',' + randomInteger(0, 255) + ',' + randomInteger(0, 255) + ')';
}


var backgroundLinear = ctx.createLinearGradient(0, 0, 0, 350);
backgroundLinear.addColorStop(0, "#151c2e");
backgroundLinear.addColorStop(0.9, "white");
backgroundLinear.addColorStop(1, "green");
ctx.fillStyle = backgroundLinear;
ctx.fillRect(0, 0, 800, 450);

function drawTriangle(x, y) {
    ctx.fillStyle = "green";

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 100, y - 100);
    ctx.lineTo(x + 200, y);
    ctx.fill();
}

drawTriangle(30, 120);
drawTriangle(30, 190);
drawTriangle(30, 260);

ctx.fillStyle = "brown";
ctx.fillRect(110, 260, 40, 100);

ctx.strokeStyle = 'white';
ctx.fillStyle = 'red';
ctx.lineWidth = 1;
ctx.font = '40px arial';
// let's start text where out image begins (at the beginning of the triangles) and on the green base (almost at the bottom)
ctx.strokeText('Merry Christmas!', 100, 410);
ctx.fillText('Merry Christmas!', 100, 410);

// stack of presents

var height_gift = 100,
    width_gift = height_gift,
    x_gift = 300,
    y_gift = 260;


for (var j = 0; j < 5; j++) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = randomColor();

    ctx.fillRect(x_gift, y_gift, width_gift, height_gift);
    ctx.strokeRect(x_gift, y_gift, width_gift, height_gift);

    ctx.fillStyle = randomColor();

    // vertical ribbon - we use same beginning height as for the gift
    var ribbon_width = 10 - j;
    ctx.fillRect(x_gift + width_gift / 2 - ribbon_width / 2, y_gift, ribbon_width, height_gift);
    ctx.strokeRect(x_gift + width_gift / 2 - ribbon_width / 2, y_gift, ribbon_width, height_gift);
    //horizontal ribbon
    ctx.fillRect(x_gift, y_gift + height_gift / 2 - ribbon_width / 2, width_gift, ribbon_width);
    ctx.strokeRect(x_gift, y_gift + height_gift / 2 - ribbon_width / 2, width_gift, ribbon_width);

    // as for the begging height, we select beggining height for the ribbon after everything else, so the first one is correct
    // set for next gift
    height_gift = ((4 - j) * 20)
    width_gift = height_gift
    x_gift = x_gift + 10
    y_gift = y_gift - height_gift
}


function treeTexture(x, y) {
    var gradTree = ctx.createLinearGradient(0, 20, 0, 260);
    for (var n = 0; n < 100; n++) {
        var decimal_number = n * 0.01
        if (n % 2 === 0) {
            gradTree.addColorStop(decimal_number, "#142f0e");
        } else {
            gradTree.addColorStop(decimal_number, "#327321");
        }

    }
    ctx.fillStyle = gradTree;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 100, y - 100);
    ctx.lineTo(x + 200, y);
    ctx.fill();
}

treeTexture(30, 120);
treeTexture(30, 190);
treeTexture(30, 260);

var gradTrunk = ctx.createLinearGradient(110, 0, 150, 0);
gradTrunk.addColorStop(0, "#22110c");
gradTrunk.addColorStop(0.5, "#582b1f");
gradTrunk.addColorStop(1, "#22110c");
ctx.fillStyle = gradTrunk;
ctx.fillRect(110, 260, 40, 100);



var xRed = 110,
    xBlue = 160,
    y = 75,
    outerRadius = 20,
    innerRadius = 1


const radomTriangleColor = () => {
    for (var i = 0; i < 6; i++) {
        ctx.beginPath();

        if (i % 2 == 0) {
            var gradientRed = ctx.createRadialGradient(xRed, y, outerRadius, xRed + 10, y - 10, innerRadius);
            //gradientRed.addColorStop(0, 'red');
            gradientRed.addColorStop(1, 'white');
            gradientRed.addColorStop(0, randomColor());

            ctx.fillStyle = gradientRed;
            ctx.arc(xRed, y, outerRadius, 0, 2 * Math.PI);
            ctx.fill();


        } else {

            var gradientBlue = ctx.createRadialGradient(xBlue, y, outerRadius, xBlue + 10, y - 10, innerRadius);
            // gradientBlue.addColorStop(0, 'blue');
            gradientBlue.addColorStop(1, 'white');
            gradientBlue.addColorStop(0, randomColor());

            ctx.fillStyle = gradientBlue;
            ctx.arc(xBlue, y, outerRadius, 0, 2 * Math.PI);
            ctx.fill();
        }

        y = y + 30;
    }
}

radomTriangleColor();

ctx.fillStyle = "yellow";

// triangle turned up
ctx.beginPath();
ctx.moveTo(600, 145);
ctx.lineTo(660, 50);
ctx.lineTo(720, 145);
ctx.closePath();
ctx.fill();

// triangle turned down
ctx.beginPath();
ctx.moveTo(600, 85);
ctx.lineTo(720, 85);
ctx.lineTo(660, 180);
ctx.closePath();
ctx.fill();

// first bezierCurve (top edge of comet's tail)
ctx.beginPath();
ctx.moveTo(500, 80);
ctx.bezierCurveTo(550, 30, 600, 30, 650, 80);

// straight line from first bezier curve to the second one on the right side (in the star)
ctx.lineTo(650, 130);

// second bezierCurve (bottom edge of comet's tail)
ctx.bezierCurveTo(600, 80, 550, 80, 500, 130);

// pointy part of the tail
ctx.lineTo(520, 90);

ctx.closePath();
ctx.fill();


// moving gifts
const canvas_moving = document.getElementById("canmovement");
const ctx_mov = canvas_moving.getContext("2d");

var gift_x = 550,
    gift_y = -200,
    gift_height = 100,
    gift_width = 150,
    mov_ribbon_width = 10,
    santa_img = new Image(),
    santa_x = -300,
    santa_y = canvas.height;
    movement();
// santa_img.src = "./images/chrastmasHost.gif"
// santa_img.onload = movement;


function draw() {

    ctx_mov.clearRect(0, 0, canvas_moving.width, canvas_moving.height)

    ctx_mov.fillStyle = 'red'
    ctx_mov.fillRect(gift_x, gift_y, gift_width, gift_height)
    ctx_mov.strokeRect(gift_x, gift_y, gift_width, gift_height)

    ctx_mov.fillStyle = 'blue'

    //vertical ribbon
    ctx_mov.fillRect(gift_x + gift_width / 2 - mov_ribbon_width / 2, gift_y, mov_ribbon_width, gift_height);
    ctx_mov.strokeRect(gift_x + gift_width / 2 - mov_ribbon_width / 2, gift_y, mov_ribbon_width, gift_height);

    //horizontal ribbon
    ctx_mov.fillRect(gift_x, gift_y + gift_height / 2 - mov_ribbon_width / 2, gift_width, mov_ribbon_width);
    ctx_mov.strokeRect(gift_x, gift_y + gift_height / 2 - mov_ribbon_width / 2, gift_width, mov_ribbon_width);

    ctx_mov.drawImage(santa_img, santa_x, santa_y);
}

function movement() {
    requestAnimationFrame(movement);

    // gift must sto when bottom is on the same height as the tree (360 - gift_height)
    if (gift_y < (360 - gift_height)) {
        gift_y += 2;
    }

    if (santa_x > canvas.width) {
        santa_x = -300
        santa_y = canvas.height
    } else {
        santa_x += 2;
        santa_y -= 1;
    }

    draw();
}