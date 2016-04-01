var app = {};
//var app = function(){
//    this.name = "vg"
//};
//
//app.prototype = {
//    hj: function(){
//        
//    },
//    gh: function(){
//        
//    }
//};
app.flag = 4;
//app.game=0;
app.countDown = function () {
    count = app.flag--;
    if(app.flag===0){
        $('.count_down').html('GO!');
    }else{
            $('.count_down').html(count-1);

    }
    
    if (app.flag >= 0) {
        setTimeout(app.countDown, 1000);
    } else {
        $('.count_down').empty();
        app.flag = 3;
        app.start();

    }
}

$(document).ready(function () {
    // app.keyPress();
    // app.start();

    $(".gameOver").hide();
    $(".popup").hide();
    $(".popup").click();
    $(".start").off().on('click', function () {
        app.countDown();
    });

});



app.start = function () {
            app.obstacles();

    $(".progress").removeClass("progressclick1");
    $(".progress").removeClass("progressclick");

    $(".progress").addClass("progressclick");

    app.track();
    app.moveCarOnButtonPress();

    app.traffic_car_1();
    app.progress_bar();

};

app.track = function () {
    var counter = 0;
    $('.track').empty();
    $(".track").append(
        $('<div />', {
            class: "car",
            id: "car"
        }));
    app.position = 0;
    app.intervalTrack = setInterval(function () {
        $(".progress").addClass("progressclick1");
        counter++;
        $('.score').text(counter);

        if (app.position < 5000) {
            app.position += 3;
        } else if (app.position > 5000 && app.position <= 9000) {
            app.position += 6;
        } else {
            app.position += 8;
        }
        $("#track").css({
            "background-position": "0px " + app.position + "px"
        });
    }, 10);

}


app.traffic_car_1 = function () {
    $('.traffic_car_1').remove();
    $(".track").append(
        $('<div />', {
            class: "traffic_car_1",
            id: "traffic_car_1"
        }));
    var a = Math.floor(Math.random() * ($("#track").width() - 70)) + 40;

    $("#traffic_car_1").css({
        'left': a + 'px'
    });
    //position1 = 0;
    app.intervalTrafficCar_1 = setInterval(function () {
        if (($("#traffic_car_1").position()) === undefined) {
            return;
        }
        // if (($("#traffic_car_1").position().top) <= 1200) {
        if (($("#traffic_car_1").position().top) <= ($("#track").position().top + $("#track").outerHeight())) {
            if (app.position < 5000) {
                $("#traffic_car_1").animate({
                    top: "+=" + 3 + "px",
                }, 1, app.checkCollisionsCar1);
            } else if (app.position > 5000 && app.position <= 9000) {
                $("#traffic_car_1").animate({
                    top: "+=" + 7 + "px",
                }, 1, app.checkCollisionsCar1);
            } else {
                $("#traffic_car_1").animate({
                    top: "+=" + 10 + "px",
                }, 1, app.checkCollisionsCar1);
            }
            //$("#traffic_car_2").css({ "background-position":"0px "+position2+"px" });

        } else if (($("#traffic_car_1").position().top) === ($("#track").position().top + $("#track").outerHeight())) {

            $('.traffic_car_1').remove();

            clearInterval(app.intervalTrafficCar_1);

        }

    }, 10);
}
app.traffic_car_2 = function () {
    $('.traffic_car_2').remove();
    $(".track").append(
        $('<div />', {
            class: "traffic_car_2",
            id: "traffic_car_2"
        }));

    //$("#traffic_car_2").css({'top':'0px'});
   app.intervalTrafficCar_2 = setInterval(function () {
        if (($("#traffic_car_2").position()) === undefined) {
            return;
        }
        if (($("#traffic_car_2").position().top) <= 700) {

            $("#traffic_car_2").animate({
                top: "+=" + 3 + "px",
            }, 1, app.checkCollisionsCar1);

            //$("#traffic_car_2").css({ "background-position":"0px "+position2+"px" });
            if (($("#traffic_car_2").position().top) === 99) {
                $("#traffic_car_2").animate({
                    left: "-=20px",
                }, 100);
            }
        } else if (($("#traffic_car_2").position().bottom) == 0) {


            clearInterval(app.intervalTrafficCar_2);

        }

    }, 1);
    //var interval2 =setInterval(clear(interval1),1); 
    //clear(interval1);
}
app.obstacles = function () {
    app.interval_car_1 = setInterval(function () {
        console.log(app.interval_car_1 );
        app.traffic_car_1();
    }, 3000);
  console.log(app.interval_car_1 );
    app.interval_car_2 = setInterval(function () {
        app.traffic_car_2();
    }, 8000);


    app.fuelTank = setInterval(function () {
        app.fuel_tank();
    }, 35000);
    app.oilSpill = setInterval(function () {
        app.oil_spill();
    }, 10000);
}

app.fuel_tank = function () {
    $('.fuel').remove();
    $(".track").append(
        $('<div />', {
            class: "fuel",
            id: "fuel"
        }));
    var a = Math.floor(Math.random() * ($("#track").width() - 70)) + 40;

    $("#fuel").css({
        'left': a + 'px'
    });
    //position1 = 0;
    app.intervalFuelTank = setInterval(function () {
        if (($("#fuel").position()) === undefined) {
            return;
        } else {
            if (($("#fuel").position().top) <= 1200) {
                if (app.position < 1500) {
                    $("#fuel").animate({
                        top: "+=" + 3 + "px",
                    }, 1, app.checkCollisions_fuel);
                } else if (app.position > 1500 && app.position <= 9000) {
                    $("#fuel").animate({
                        top: "+=" + 7 + "px",
                    }, 1, app.checkCollisions_fuel);
                } else {
                    $("#fuel").animate({
                        top: "+=" + 10 + "px",
                    }, 1, app.checkCollisions_fuel);
                }
                //$("#traffic_car_2").css({ "background-position":"0px "+position2+"px" });

            } else if (($("#fuel").position().top) > 700) {


                clearInterval(app.intervalFuelTank);

            }
        }

    }, 1);
}



app.oil_spill = function () {
    $('#car').removeClass('spin');
    $('.oilSpill').remove();
    $(".track").append(
        $('<div />', {
            class: "oilSpill",
            id: "spill"
        }));
    var a = Math.floor(Math.random() * ($("#track").width() - 70)) + 40;

    $("#spill").css({
        'left': 50 + 'px'
    });
    //position1 = 0;
    app.intervalOilSpill = setInterval(function () {
        if (($("#spill").position()) === undefined) {
            return;
        }

        if (($("#spill").position().top) <= 1200) {
            if (app.position < 1500) {
                $("#spill").animate({
                    top: "+=" + 3 + "px",
                }, 1, app.checkCollisions_spill);
            } else if (app.position > 1500 && app.position <= 9000) {
                $("#spill").animate({
                    top: "+=" + 7 + "px",
                }, 1, app.checkCollisions_spill);
            } else {
                $("#spill").animate({
                    top: "+=" + 10 + "px",
                }, 1, app.checkCollisions_spill);
            }
            //$("#traffic_car_2").css({ "background-position":"0px "+position2+"px" });

        } else if (($("#fuel").position().top) > 1200) {


            clearInterval(app.intervalOilSpill);

        }

    }, 1);
}








//
//app.keyPress = function () {
//
//    $(document).keydown(function (event) {
//
//        var pos = $('#car').position();
//
//        if (event.keyCode == '37') {
//            if ($("#track").offset().left + 10 < $("#car").offset().left) {
//                //  $('#car').animate({
//                //      'left': pos.left - 5 + 'px',
//                //  }, 1,app.checkCollisions);
//                //    $('#car').css('left',pos.left - 3 + 'px');
//                //             app.checkCollisions();
//                //
//
//            } else {
//                alert('game over')
//                app.start();
//
//            }
//
//        }
//
//        if (event.keyCode == '39') {
//            if (($("#track").offset().left + $("#track").width()) - 6 > ($("#car").offset().left + $("#car").width())) {
//
//                //    $('#car').animate({
//                //      'left': pos.left + 5 + 'px'
//
//
//                //  },1,app.checkCollisions2);
//                // 
//                //         $('#car').css('left',pos.left + 5 + 'px');
//                // app.checkCollisions2();
//
//            } else {
//                     alert("gameOver");
//            app.countDown();
////                $(".gameOver").click();
////                $(".start").off().on('click', function () {
////                    app.countDown();
////                });
////                app.start();
//            }
//
//        }
//
//
//
//    });
//}


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

app.checkCollisions = function () {
    var box = $(".traffic_car_1");
    var pos = app.getPositions(box);

    var pos2 = app.getPositions(this);
    var horizontalMatch = app.comparePositions(pos[0], pos2[0]);
    var verticalMatch = app.comparePositions(pos[1], pos2[1]);
    var match = horizontalMatch && verticalMatch;
    if (match) {
             alert("gameOver");
            app.countDown();
//                  app.gameOver();
//
//
//        $(".gameOver").click();
//        $(".start").off().on('click', function () {
//            app.countDown();
//        });
        // app.countDown();
    }
}

app.checkCollisionsCar1 = function () {
    var box = $("#car");
    var pos = app.getPositions(box);

    var pos2 = app.getPositions(this);
    var horizontalMatch = app.comparePositions(pos[0], pos2[0]);
    var verticalMatch = app.comparePositions(pos[1], pos2[1]);
    var match = horizontalMatch && verticalMatch;
    if (match) {
          app.gameOver();
     alert("gameOver");
            app.start();
          
//
//        $(".gameOver").click();
//        $(".start").off().on('click', function () {
//            app.countDown();
//        });
        // app.countDown();
    }
}
app.checkCollisions2 = function () {
    var box = $(".traffic_car_2");
    if (box.length === 0) {
        return false;
    } else {
        var pos = app.getPositions(box);

        var pos2 = app.getPositions(this);
        var horizontalMatch = app.comparePositions(pos[0], pos2[0]);
        var verticalMatch = app.comparePositions(pos[1], pos2[1]);
        var match = horizontalMatch && verticalMatch;

        if (match) {
                  alert("gameOver");
            app.countDown();
           // app.gameOver();
//            $(".gameOver").click();
//            $(".start").off().on('click', function () {
//                app.countDown();
//            });
              // app.start();
        }
    }
}
app.checkCollisions_fuel = function () {
    var box = $(".car");
    if (box.length === 0) {
        return false;
    } else {
        var pos = app.getPositions(box);

        var pos2 = app.getPositions(this);
        var horizontalMatch = app.comparePositions(pos[0], pos2[0]);
        var verticalMatch = app.comparePositions(pos[1], pos2[1]);
        var match = horizontalMatch && verticalMatch;

        if (match) {
            $('.fuel').remove();

            val1 += 20;
        }
    }
}

app.checkCollisions_spill = function () {
    var box = $(".car");
    if (box.length === 0) {
        return false;
    } else {
        var pos = app.getPositions(box);

        var pos2 = app.getPositions(this);
        var horizontalMatch = app.comparePositions(pos[0], pos2[0]);
        var verticalMatch = app.comparePositions(pos[1], pos2[1]);
        var match = horizontalMatch && verticalMatch;

        if (match) {
            //

            //  var pos = $('#car').position();
            $('#car').addClass('spin');
            //  $('#car').css('transform','rotate('+360+'deg)');

            //$('#car').animate({
            //   'left': pos.left + 75 + 'px'


            //  },1,app.checkCollisions2);
            //

        }
    }
}



app.val1 = 0;


app.progress_bar = function () {
    var progressbar = $("#progressbar");


    progressbar.progressbar({
        value: false,
        change: function () {
            //  progressLabel.text(progressbar.progressbar("value") + "%");
        }
    });
    val1 = progressbar.progressbar("value");
    progress();

    function progress() {

        val = val1 || 100;

        //progressbar.progressbar("value", val - 0.1);
        val1 = val - 0.1;
        progressbar.progressbar("value", val1);


        if (val >= 2) {
            setTimeout(progress, 100);
        } else {
            alert("gameOver");
            app.countDown();
          //  $(".gameOver").click();
          //  $(".start").off().on('click', function () {
          //      app.countDown();
         //   });
            
        }
    }

}





app.moveCarOnButtonPress = function () {
    clearInterval(intervalPress);
    var road = $('#track'),
        myCar = $('#car'),
        w = road.width() - myCar.width(),
        d = {},
        x = 3;

    function newv(v, a, b) {
        var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
        return n < 0 ? 0 : n > w ? w : n;
    }

    $(window).keydown(function (e) {
        d[e.which] = true;
    });
    $(window).keyup(function (e) {
        d[e.which] = false;
    });

    var intervalPress = setInterval(function () {
        myCar.css({
            left: function (i, v) {
                return newv(v, 37, 39);
            },
            //  top: function(i,v) { return newv(v, 38, 40); }
        });
    }, 12);

}




app.gameOver = function () {
    console.log(app.interval_car_1);
    clearInterval(app.intervalTrack);
        clearInterval(app.intervalTrafficCar_1);

        clearInterval(app.intervalTrafficCar_2);

        clearInterval(app.intervalFuelTank);

        clearInterval(app.intervalOilSpill);

  

    
      clearInterval(app.interval_car_1);
      clearInterval(app.interval_car_2);
      clearInterval(app.fuel_tank);
      clearInterval( app.oilSpill);
  //app.interval_car_1=null;
    //app.interval_car_2 = null;
      //  app.fuel_tank = null;
   //app.oilSpill=null;
   
    //app.progress_bar = null;
    

}