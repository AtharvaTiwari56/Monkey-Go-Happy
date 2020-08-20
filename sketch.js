var monkey, backgd, score, invisibleGround, banana, stone;
var backgdImage, monkeyAnim, bananaImage, stoneImage, monkeycollided;
var stoneGroup, bananaGroup;
var gameState;
var t_count;

function preload() {
  
  monkeyAnim = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  backgdImage = loadImage("jungle.png");
  
  bananaImage = loadImage("banana.png");
  
  stoneImage = loadImage("stone.png");
  
  monkeycollided = loadAnimation("Monkey_06.png");
}

function setup() {
  createCanvas(400, 400);

  t_count =0;
  backgd = createSprite(200,200, 400, 400);
  backgd.addImage("jungle", backgdImage);
  backgd.scale = 2;
  backgd.x = backgd.width/2;
  
  monkey = createSprite(50, 330, 20, 20);
  monkey.addAnimation("monkey", monkeyAnim);
  monkey.addAnimation("monkeyhurt", monkeycollided);
  
  monkey.scale = 0.15;
  
  invisibleGround = createSprite(200, 370, 400, 10);
  invisibleGround.visible = false;
  
  stoneGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
  
  gameState = "Play";
  
}

function draw() {
  background(220);
    
    backgd.velocityX = -6;
    
    if (bananaGroup.isTouching(monkey)) {
    score = score + 2;
    bananaGroup.destroyEach();
    }
       
    switch(score) {
      case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
    
    if (backgd.x < 0) {
    backgd.x = backgd.width/2;
    }
    
    if (keyDown("space") && monkey.y >= 310) {
    monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnbanana();
    spawnstone();
    
    if (stoneGroup.isTouching(monkey)) {    
      monkey.scale=0.08;
     gameState = "End"; 
    t_count =t_count +1;
      console.log(t_count);
    }
      
      
    if (gameState ==="End" ){
 
        if (t_count == 1) {
          gameState ="Play";
          bananaGroup.destroyEach();
        stoneGroup.destroyEach();
          
        }
      
        else{
        backgd.velocityX=0;
        
        monkey.changeAnimation("monkeyhurt")
       
        stoneGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        bananaGroup.setLifetimeEach(-1);
        stoneGroup.setLifetimeEach(-1);
        bananaGroup.destroyEach();
        stoneGroup.destroyEach();
        monkey.velocityY=0;
        score = 0;
        
          
        }
     
    }
  
  
  
  monkey.collide(invisibleGround);
  
  drawSprites();
 
  stroke(0);
  fill(0);
  textSize(20);
  text("Score : " + score, 270, 30);
}

function spawnbanana() {
  if (frameCount % 50 === 0) {
    banana = createSprite(400, random(135, 200), 20, 20);
    banana.scale = 0.05;
    banana.addImage("food", bananaImage);
    banana.velocityX = -6;
    banana.lifetime = 80;
    
    bananaGroup.add(banana);
  }  
}

function spawnstone() {
 if (frameCount % 120 === 0) {
    stone = createSprite(400, 335);
    stone.scale = 0.25;
    stone.addImage("Stone", stoneImage);
    stone.velocityX = -6;
    stone.lifetime = 70;
    
    stoneGroup.add(stone);
  }
}

