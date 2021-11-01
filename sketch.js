var tex, texas, text2, texa;

var play, pay;

var player, plaI;

var villan, vilI, plank, plankI;

var land, arrow, array;

var scene, scene2, sceneI;

var can, canI;

var las, lasI, lasG;

var carG, carrot, car;

var score;

function preload(){

texas = loadImage("text.png");
pay = loadImage("play.png");
sceneI = loadImage("grassy.png");
plaI = loadAnimation("Bug.png");
array = loadImage("arrow.png");
texa = loadImage("text2.png");
lasI = loadImage("laser.png");
vilI = loadImage("bunny.png");
carrot = loadImage("carrot.png");

}

function setup(){
createCanvas(1600, 900);

scene = createSprite(800, 450, 2050, 2050);
scene.shapeColor = "cyan";

tex = createSprite(800, 350, 100 ,100);
tex.addImage(texas);
tex.scale = 2.0;

play = createSprite(800, 550, 100, 100);
play.addImage(pay);
play.scale = 0.2;

scene2 = createSprite(800, 450,2050, 2050)
scene2.shapeColor = "lime";

arrow = createSprite(1400, 800, 50, 50);
arrow.addImage(array);

text2 = createSprite(800, 250, 50, 50);
text2.addImage(texa);

player = createSprite(100, 800, 50, 30);
player.addAnimation("player", plaI);
player.scale = 0.3;
player.visible = false;

land = createSprite(1000, 940, 2050, 150);
land.shapeColor = "green";
land.visible = false;

villan = createSprite(1450, 750, 100, 50);
villan.addImage(vilI);
villan.scale = 0.5;
villan.visible = false;

score = 0;

carG = new Group();
lasG = new Group();
}

function draw(){
background(sceneI);

player.collide(land);

if(mousePressedOver(play)){
  play.destroy();
  scene.visible = false;
  tex.destroy(); 
  player.visible = true;
  land.visible = true;
  villan.visible = true;
}

if(mousePressedOver(arrow)){
  scene2.destroy();
  arrow.destroy();
  text2.destroy();
}

if(keyDown(UP_ARROW)){
    player.y = player.y - 30;
} 

if(keyDown(DOWN_ARROW)){
  player.y = player.y + 30;
}

if(keyDown(LEFT_ARROW)){
  player.x = player.x - 30;
}

if(keyDown(RIGHT_ARROW)){
  player.x = player.x + 30;
}

if(keyDown("space")){
  spawnLaser();
}

if(scene.visible === false){
  spawnCarrots();
}

if(lasG.isTouching(carG)){
  carG.destroyEach();
  score = score + 1;
}

if(carG.isTouching(player)){
  player.visible = false;
}

if(player.visible === false){
  textSize(20)
  fill("red");
  text("You Died. Don't worry hit F5.")
  lasG.visible = false;
}

drawSprites();
textSize(50);
fill("red");
stroke("magenta");
text("Score: "+ score, 100, 100);

if(score === 200){
  villan.destroy();
  carG.destroyEach();
  textSize(50);
fill("magenta");
stroke("red");
text("You Win", 700, 450);
}
}

function spawnLaser(){
las = createSprite(200, 750, 50, 20);
las.y = player.y;
las.x = player.x;
las.shapeColor = "red";
las.velocityX = 85;
las.lifetime = 100
las.addImage(lasI);
las.scale = 0.1;
lasG.add(las);

if(score === 50){
  las.velocityX = 50;
}

if(score === 100){
  las.velocityX = 25
}

}

function spawnCarrots(){
  if(frameCount % 60 === 0){
    car = createSprite(1550, Math.round(random(100, 900)), 50, 50);
    car.addImage(carrot);
    car.velocityX = -50;
    car.scale = 0.2;
    carG.add(car);
  }
  if(score === 50){
    car.velocityX = -50;
  }
  if(score === 100){
    car.velocityX = -85;
  }
}