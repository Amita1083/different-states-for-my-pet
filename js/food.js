class Food {

    constructor(){

       this.foodStock=0;
       this.lastfed; 
       this.image=loadImage('images/Milk.png');

    }

    getFoodStock(){

        return this.foodStock;
    }

    updateFoodStock(foodStock){

    this.foodStock = foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
           this.foodStock=this.foodStock-1 

        }

    }
    getFedTime(lastFed){
        this.lastFed=lastFed;
      }
   
      bedroom(){
        background(bImage,550,500);

      }

      garden(){

        background(gImage,550,500);
      }

      washroom(){

        background(wImage,550,500);
      }

display(){

    var x=100,y=100;

    imageMode(CENTER);
    image(this.image,500,200,70,70);

    if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
              x=100;
              y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
          }

    }



}

}

















