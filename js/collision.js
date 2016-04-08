app.getPositions = function (box) {
    var $box = $(box);
    var pos = $box.position();
    var width = $box.width();
    var height = $box.height();
    return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
}

app.comparePositions = function (p1, p2) {
        var x1 = p1[0] < p2[0] ? p1 : p2;
        var x2 = p1[0] < p2[0] ? p2 : p1;
        return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
    }
    //var checkCollision = [app.col1(value)];
app.checkCollisions = function (car, obsCar, value) {
     if (car.length === 0) {
        return false;
   } 
    var pos = app.getPositions(car);
    var pos2 = app.getPositions(obsCar);
    var horizontalMatch = app.comparePositions(pos[0], pos2[0]);
    var verticalMatch = app.comparePositions(pos[1], pos2[1]);
    var match = horizontalMatch && verticalMatch;
    if (match) {
        switch (value) {
        case 0:
        case 1:
            {
                if (app.collision === 0) {
                    app.gameOver();
                    app.gameOverDialog();
                    app.collision++;
                }
            }
            break;
        case 2:
            {
                 
                $('.fuel').remove();
                val1 += 20;
                  app.actualScore+=50;
            }
            break;
        case 3:
            {
                 if (app.collisionSpill === 0) {
                $('#car').addClass('spin');
                            app.actualScore-=30;
            app.collisionSpill++;
                     
                 }

            }
            break;
        case 4:
            {
                if (app.collision === 0) {
                    app.gameOver();
                    app.finishDialog();
                    app.collision++;
                }
            }
       break;

            case 5:{
                console.log(pos2[0][1]);
               console.log(pos[0][1]);
                if((pos2[0][1]+obsCar.width())===pos[0][1]){
                    obsCar.css({'left':"-=10px"})
                }
               else if(pos2[0][1]===(pos[0][1]+car.width())){
                    obsCar.css({'left':"+=10px"})
               }
            }
                break;
        }
    }
}
 //        checkCollision = [col1(arg1), col1(arg2), col(arg3), col1(arg3)]
        //        checkCollision[obsCar]();

