//var milk,milkImage;
var Database;
var dog,sadDog,happyDog;
var foodS,foodStock;

var feedFood,addFood;
var fedTime,lastFed;
var foodObj;

var gameState,rgameState;

var bImage,gImage,wImage;
var currenttime;
function preload(){    
    sadDog=loadImage("images/Dog.png");
    happyDog=loadImage("images/happydog.png");
    
    gImage=loadImage("images/Garden.png");
    wImage=loadImage("images/Wash Room.png");
    bImage=loadImage("images/Bed Room.png"); 

}
function setup(){
Database=firebase.database();
createCanvas(1000,400);

foodObj = new Food();

foodStock=Database.ref('Food');
foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

feedFood=createButton("Feed the dog");
feedFood.position(700,95);
feedFood.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);

rgameState=Database.ref('gameState');
rgameState.on("value",function(data){
  gameState=data.val();

})

}

function draw(){
  background(46,139,87);

    foodObj.display();

    fedTime=Database.ref('FeedTime');
    fedTime.on("value",function(data){
       lastFed=data.val();
      })


     fill(255,255,254);
  textSize(15);
    if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
      }
      else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
   

   currenttime=hour();
   if(currenttime===(lastFed+1)){
    update("Playing");
      foodObj.garden();
   }else if(currenttime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currenttime>(lastFed+2) && currenttime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }

   if(gameState!="Hungry"){
    feedFood.hide();
    addFood.hide();
    dog.remove();
   } else

   {
    feedFood.show();
    addFood.show();
    dog.addImage(sadDog);
    //added
    update(gameState);
    dog.addImage(happyDog);

   }
   


  drawSprites();
}

//function to add food in stock
function addFoods(){
    foodS++;
    Database.ref('/').update({
      Food:foodS
    })
  }

  //function to update food stock and last fed time
function feedDog(){
    dog.addImage(happyDog);
  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    Database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }

  //function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//update gameState
function update(state){
  Database.ref('/').update({
    gameState:state
  })
}