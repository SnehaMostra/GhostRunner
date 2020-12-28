var tower,towerImage;
var ghost,ghostImage;
var door,doorImage;
var climber,climberImage;
var climberGroup,doorGroup;
var iBlock, iBlockGroup;
var gameState = "play";
var spooky;

function preload(){
  
  towerImage = loadImage("tower.png");
  
  ghostImage = loadImage("ghost-standing.png");
  
  doorImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
  spooky=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
    
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  iBlockGroup = new Group();
}

function draw(){
  
  spooky.loop();
  
  if (gameState==="play"){
    if(tower.y>400){
    tower.y = 300;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  
  ghost.velocityY = ghost.velocityY+0.5;
  
  if(keyDown("left")){
    ghost.x = ghost.x-5;
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x+5;
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(iBlockGroup.isTouching(ghost) || ghost.y>600) {
    ghost.destroy();
    gameState = "end";
  }
  
  spawnDoors();
    
   drawSprites();  
  }
 
 if (gameState==="end"){
   textSize(30);
   fill("yellow");
   stroke("yellow");
   text("GAME OVER",250,300);
 }
  
}

function spawnDoors(){
  
  if(frameCount%120===0){
    door = createSprite(200,-50);
    door.addImage(doorImage);
    door.velocityY = 2;
    door.x = Math.round(random(150,400));
    doorGroup.add(door);
    
    climber = createSprite(200,0);
    climber.addImage(climberImage);
    climber.velocityY = 2;
    climber.x = door.x; 
    climberGroup.add(climber);
    
    iBlock = createSprite(200,10,10,10);
    iBlock.velocityY = 2;
    iBlock.x = door.x;
    iBlock.width = climber.width;
    iBlock.visible = false;
    iBlock.debug = true;
    iBlockGroup.add(iBlock);
    
    door.lifetime = 300;
    climber.lifetime = 300;
    iBlock.lifetime = 300;
    
    door.depth = climber.depth;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
  }
  
}