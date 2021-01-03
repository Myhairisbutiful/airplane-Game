class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      car1 = createSprite(450,50);
      car2 = createSprite(450,150);
      
      cars = [car1, car2];
  
      //car1.addImage("car1",car1image);
      //car2.addImage("car2",car2image);
      
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      //player.getcarsatend();
      if(allPlayers !== undefined){
        //var display_position = 100;
        //background("#c68767");
        //image(trackimage,0,-displayHeight*4,displayWidth,displayHeight*5);
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 450;
        var y;
  
        //plr refers to player 1 (for first time, then it continues till all players are covered)
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = displayWidth-allplayers[plr].distance;
          //use data form the database to display the cars in y direction
          y = y + 100;
          cars[index-1].x = x;
          cars[index-1].y = y;
  
          if (index === player.index){
            cars[index - 1].shapeColor = "red";
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      
      if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      
  
      drawSprites();
    }
    end(){
      console.log("game has ended");
      console.log(player.rank);
      
    }
  }
  