var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "PLAY";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(295, 550)
  ghost.addImage("ghostStanding", ghostImg)
  ghost.scale = 0.4

  invisibleBlockGroup = new Group();
  doorsGroup = new Group();
  climbersGroup = new Group();

}

function draw() {
  background(200);

  if (gameState === "PLAY") {
    if (tower.y > 400) {
      tower.y = 300
    }

    ghost.velocityY = ghost.velocityY + 0.5

    if (keyDown("space")) {
      ghost.velocityY = -10
    }
    if (keyDown("left")) {
      ghost.x = ghost.x - 5
    }

    if (keyDown("right")) {
      ghost.x = ghost.x + 5
    }

    spawnDoors()
    if (invisibleBlockGroup.isTouching(ghost)) {
      gameState = "END"
      console.log("you have hit a wall  ")
    }
    
  } else if (gameState === "END") {
    ghost.velocityY = 0
    ghost.velocityX = 0
    tower.velocityY = 0
    invisibleBlockGroup.setVelocityYEach(0)
    doorsGroup.setVelocityYEach(0)
    climbersGroup.setVelocityYEach(0)
    invisibleBlockGroup.setLifetimeEach(-1);
    doorsGroup.setLifetimeEach(-1);
    climbersGroup.setLifetimeEach(-1);
  }
 
  
  
  
  

  drawSprites()
}


function spawnDoors() {

  if (frameCount % 300 === 0) {
    var door = createSprite(0, -50)
    var climber = createSprite(0, 10)
    var invisibleBlock = createSprite(0, 15, 100, 10)
    door.x = Math.round(random(150, 450))
    climber.x = door.x
    invisibleBlock.x = door.x
    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1
    door.addImage("door", doorImg)
    climber.addImage("climber", climberImg)

    door.lifetime = 700
    climber.lifetime = 700
    invisibleBlock.lifetime = 700
    invisibleBlock.visible = false
    invisibleBlockGroup.add(invisibleBlock)
    doorsGroup.add(door)
    climbersGroup.add(climber)
  }


}
