var balloon, balloonImg, backgroundImg;
var database, position;

function preload() {
  balloonImg = loadAnimation("imgs/HotAirBalloon1.png", "imgs/HotAirBalloon2.png", "imgs/HotAirBalloon3.png");
  backgroundImg = loadImage("imgs/background.png");
}

function setup() {
  createCanvas(800, 400);

  database = firebase.database();
  console.log(database);

  balloon = createSprite(200, 200, 10, 10);
  balloon.addAnimation("hotairballoon", balloonImg);
  balloon.scale = 0.3;

  var balloonPos = database.ref('balloon/position');
  balloonPos.on("value", readPosition);
}

function draw() {
  background(backgroundImg);
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
      balloon.scale = balloon.scale - 0.001;
  }
  else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
      balloon.scale = balloon.scale + 0.001;

  }
  drawSprites();

  fill('black')
  text("Use the Arrow Keys to move the hot-air balloon!", 30, 20);
}

function readPosition(data) {
  position = data.val();
  console.log(position.x, position.y);
  balloon.x = position.x;
  balloon.y = position.y;
}

function writePosition(x,y){
  database.ref('balloon/position').set({
      x: position.x + x,
      y: position.y + y
  });
}