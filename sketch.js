var dog, happydog, ndog;
var food, foodstock;
var database;
var turn= 20;
var money= 1000000;
var bill, bimg;
var game= true;
function preload()
{
  //load images here
  ndog=loadImage("images/Dog.png");
  happydog=loadImage("images/happydog.png");
  bimg=loadImage("images/download.jpg");
}

function setup() {
  database=firebase.database();
  createCanvas(800, 600);
  foodstock=database.ref('food');
  foodstock.on("value",readStock);
  dog= createSprite(400,350,50,50);
  dog.addImage("normal", ndog);
  dog.scale= 0.5;
  bill= createSprite(640,30,20,20);
  bill.addImage("money",bimg);
  bill.scale= 1;
}


function draw() {  
  background(58,234,214);
  dog.scale= 0.5;
  bill.scale= 0.2;
  if(turn=== 0){
    game= false;
  }
  if(turn=== 20){
    game= true;
  }
  if(game=== true){
if(keyWentDown(UP_ARROW)){
  writeStock(food);
  dog.addImage("normal",happydog);
  turn= turn-1;
}
if(keyWentDown(DOWN_ARROW)){
  
  dog.addImage("normal",ndog);
}
if(keyWentDown(LEFT_ARROW)){
  turn=20;
  money= money-20;
}
fill("black");
textSize(20);
    text("Press up arrow to feed", 30,60);
  }
  else if(game=== false){
    if(keyWentDown(UP_ARROW)){
      writeStock(food);
      dog.addImage("normal",happydog);
      turn= turn-1;
    }
    if(keyWentDown(DOWN_ARROW)){
      
      dog.addImage("normal",ndog);
    }
    if(keyWentDown(LEFT_ARROW)){
      turn=20;
      money= money-20;
    }
    
  }

dog.display();
bill.display();
  drawSprites();
  //add styles here
  stroke(4);
  textSize(20);
  fill("black");
  //text("press down arrow to pet me", 30,50);
  text("Unit of food left = "+ turn, 30,37);
  text(money, 655,37);

if(turn=== 0){
  fill("black");
  stroke(5);
  textSize(20);
  text("Food is over, press left arrow to buy food",250, 550);
  dog.addImage("normal",ndog);
}
}
function readStock(data){
  food=data.val();

}
function writeStock(x){
  database.ref('/').update({food:x})
}



