var monkey, monkeyRunning;
var ground,ground_img;

var jungle, jungleImg;

var foodGroup, bananaImg;
var obstaclesGroup, obstacleImg;

var gameOver;
var score=0;


function preload(){
monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png",
 "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  
bananaImg = loadImage("banana.png");

obstacleImg = loadImage("stone.png");
 
jungleImg = loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(800,400);
  
  jungle=createSprite(0,0,800,400);
  jungle.addImage(jungleImg);
  jungle.scale=1.5;
  jungle.x=jungle.width/2;
  jungle.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkeyRunning);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(jungle.x<100){
    jungle.x=jungle.width/2;
  }
  
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 1: monkey.scale=0.12;
                break;
        case 2: monkey.scale=0.14;
                break;
        case 3: monkey.scale=0.16;
                break;
        case 4: monkey.scale=0.18;
                break;
        default: break;
    }
  console.log(monkey.y)
    if(keyDown("space") && monkey.y > 250) {
      monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
     // score=score-2;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImg);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}