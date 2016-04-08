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


app.countDown = function () {
    app.actualScore = 0;
    $(".track").append(
        $('<div />', {
            class: "count_down"

        }));
    count = app.flag--;
    if (app.flag === 0) {
        $('.count_down').html('GO!');
    } else {
        $('.count_down').html(count - 1);

    }

    if (app.flag >= 0) {
        setTimeout(app.countDown, 1000);
    } else {
        $('.count_down').remove();
        app.flag = 3;
        app.start();

    }
}

$(document).ready(function () {
    app.init();
});


app.init = function () {
    $(".gameOver").hide();
    $(".popup").hide();
    $(".popup").click();
    $(".start").off().on('click', function () {
        app.countDown();
    });
}


app.start = function () {
    app.obstacles();
    app.collision = 0;
    $(".progress").removeClass("progressclick1");
    $(".progress").removeClass("progressclick");
    $(".progress").addClass("progressclick");
    app.track();
    app.moveCarOnButtonPress();
    app.traffic_car_1();
    app.progress_bar();
};

app.track = function () {
    var speedTrack = 4;
    var counter = 0;
    $('.track').empty();
    $(".track").append(
        $('<div />', {
            class: "car",
            id: "car"
        }));
    app.position = 0;
    if (app.actualScore < 0) {
        app.actualScore = 0;
    }
    app.intervalTrack = setInterval(function () {
        $(".progress").addClass("progressclick1");
        counter++;
        $('.score').text(counter);
        $('.actualscore').text(app.actualScore);
        app.position += speedTrack;
        $("#track").css({
            "background-position": "0px " + app.position + "px"
        });
        $(".sideright").css({
            "background-position": "0px " + (app.position - 1) + "px"
        });
        $(".sideleft").css({
            "background-position": "0px " + (app.position - 1) + "px"
        });
        //finish line
        if (counter === 20000) {
            $(".track").append(
                $('<div />', {
                    class: "finish"
                }));
            app.finishline();
        }
        speedTrack += 0.001;

    }, 10);
}

app.traffic_car_1 = function () {
    //    $('.traffic_car_1').remove();
    $(".track").append(
        $('<div />', {
            class: "traffic_car_1",
            id: "traffic_car_1"
        }));
    var randomLeft = app.randomNumber();
    while (1) {
        if ((app.randomObstacle - $("#traffic_car_1").width()) <= randomLeft && (app.randomObstacle + $("#traffic_car_1").width()) >= randomLeft) {
            randomLeft = app.randomNumber();
        } else {
            break;
        }
    }
    app.randomObstacle = randomLeft;
    $("#traffic_car_1").css({
        'left': randomLeft + 'px'
    });
    app.intervalTrafficCar_1 = setInterval(function () {
        if (($("#traffic_car_1").position()) === undefined) {
            return;
        }
        if (($("#traffic_car_1").position().top) <= ($("#track").position().top + $("#track").outerHeight())) {

            $("#traffic_car_1").css({
                'top': "+=" + app.speedCar1 + "px",
            })
            app.checkCollisions($("#car"), $("#traffic_car_1"), 0);
        } else {
            app.actualScore += 10;
            $('.traffic_car_1').remove();
            clearInterval(app.intervalTrafficCar_1);
            app.randomLeft = 0;
        }
    }, 1);
    app.speedCar1 += 0.1;
}
app.traffic_car_2 = function () {
    $('.traffic_car_2').remove();
    $(".track").append(
        $('<div />', {
            class: "traffic_car_2",
            id: "traffic_car_2"
        }));
    var randomLeft = app.randomNumber();
    while (1) {
        if ((app.randomObstacle - $(".traffic_car_2").width()) <= randomLeft && (app.randomObstacle + $(".traffic_car_2").width()) >= randomLeft) {
            randomLeft = app.randomNumber();
        } else {
            break;
        }
    }
    app.randomObstacle = randomLeft;
    $("#traffic_car_2").css({
        'left': randomLeft + 'px'
    });
    console.log(randomLeft)
    var randomno = app.randomNumbercar2();
    app.intervalTrafficCar_2 = setInterval(function () {
        if (($("#traffic_car_2").position()) === undefined) {
            return;
        }
        if (($("#traffic_car_2").position().top) <= 700) {

            //            $("#traffic_car_2").animate({
            //                top: "+=" + 3 + "px",
            //            }, 1);
            $("#traffic_car_2").css({
                'top': "+=" + app.speedCar2 + "px",
            })
            app.checkCollisions($("#car"), $("#traffic_car_2"), 1);
            //app.checkCollisions($(".fuel"), $("#traffic_car_2"), 5);
            // app.checkCollisions($(".oilSpill"), $("#traffic_car_2"), 5);
            if (Math.floor(($("#traffic_car_2").position().top)) === 99) {
                console.log(($("#traffic_car_2").position().left + randomno + $("#traffic_car_2").width()) > $('.track').width());
                if (($("#traffic_car_2").position().left + randomno + $("#traffic_car_2").width()) > $('.track').width()) {
                    console.log(randomno);
                    randomno = (-1) * (randomno);
                    console.log(randomno);
                } else if ($("#traffic_car_2").position().left - randomno < 0) {
                    randomno = (-1) * (randomno);
                }

                $("#traffic_car_2").animate({
                    left: "-=" + randomno + "px",
                }, 100, app.leftMoveCollision);
                //();

            }
        } else {
            app.actualScore += 10;
            $('.traffic_car_2').remove();
            clearInterval(app.intervalTrafficCar_2);
        }
    }, 1);
    app.speedCar2 += 0.1;

}


app.fuel_tank = function () {
    $('.fuel').remove();
    $(".track").append(
        $('<div />', {
            class: "fuel",
            id: "fuel"
        }));
    var randomLeft = app.randomNumber();
    while (1) {
        if ((app.randomObstacle - $(".fuel").width()) <= randomLeft && (app.randomObstacle + $(".fuel").width()) >= randomLeft) {
            randomLeft = app.randomNumber();
        } else {
            break;
        }
    }
    app.randomObstacle = randomLeft;
    $("#fuel").css({
        'left': randomLeft + 'px'
    });
    app.intervalFuelTank = setInterval(function () {
        if (($("#fuel").position()) === undefined) {
            return;
        } else {
            if (($("#fuel").position().top) <= 768) {
                //                $("#fuel").animate({
                //                    top: "+=" + 3 + "px",
                //                }, 1);
                $("#fuel").css({
                    'top': "+=" + 1 + "px",
                })
                app.checkCollisions($("#car"), $("#fuel"), 2);
            } else {
                $('#fuel').remove();
                clearInterval(app.intervalFuelTank);
            }
        }
    }, 1);
}



app.oil_spill = function () {
    app.collisionSpill = 0;
    $('#car').removeClass('spin');
    $('.oilSpill').remove();
    $(".track").append(
        $('<div />', {
            class: "oilSpill",
            id: "spill"
        }));
    var randomLeft = app.randomNumber();
    while (1) {
        if ((app.randomObstacle - $(".oilSpill").width()) <= randomLeft && (app.randomObstacle + $(".oilSpill").width()) >= randomLeft) {
            randomLeft = app.randomNumber();
        } else {
            break;
        }
    }
    app.randomObstacle = randomLeft;

    $("#spill").css({
        'left': randomLeft + 'px'
    });
    app.intervalOilSpill = setInterval(function () {
        if (($("#spill").position()) === undefined) {
            return;
        }
        if (($("#spill").position().top) <= 768) {
            //            $("#spill").animate({
            //                top: "+=" + 3 + "px",
            //            }, 1);
            $("#spill").css({
                'top': "+=" + 1.6 + "px",
            })
            app.checkCollisions($("#car"), $("#spill"), 3);
        } else {
            $('#spill').remove();
            clearInterval(app.intervalOilSpill);
        }
    }, 1);
}


app.progress_bar = function () {
    var progressbar = $("#progressbar");


    progressbar.progressbar({
        value: false,
        change: function () {}
    });
    val1 = progressbar.progressbar("value");
    progress();

    function progress() {
        if (val1 > 100) {
            val1 = 100;
        }
        val = val1 || 100;
        val1 = val - 0.1;
        progressbar.progressbar("value", val1);
        if (val > 1) {
            app.progressBarTimeout = setTimeout(progress, 100);
        } else {
            app.gameOver();
            app.emptyFuelDialog();
        }
    }

}

app.randomNumber = function () {
    return Math.floor(Math.random() * ($("#track").width() - 100)) + 40;
}

app.randomNumbercar2 = function () {
    return Math.floor(Math.random() * 60) - 30;
}


app.leftMoveCollision = function () {
    app.checkCollisions($("#traffic_car_1"), $("#traffic_car_2"), 5);
    app.checkCollisions($("#spill"), $("#traffic_car_2"), 5);
    app.checkCollisions($("#fuel"), $("#traffic_car_2"), 5);
    app.checkCollisions($("#car"), $("#traffic_car_2"), 1);
}


app.truck = function () {

    $(".track").append(
        $('<div />', {
            class: "truck",
            id: "truck"
        }));
    var randomLeft = app.randomNumber();
    while (1) {
        if ((app.randomObstacle - $("#truck").width()) <= randomLeft && (app.randomObstacle + $("#truck").width()) >= randomLeft) {
            randomLeft = app.randomNumber();
        } else {
            break;
        }
    }
    app.randomObstacle = randomLeft;
    $("#truck").css({
        'left': randomLeft + 'px'
    });
    app.intervalTruck = setInterval(function () {
        if (($("#truck").position()) === undefined) {
            return;
        }
        if (($("#truck").position().top) <= ($("#track").position().top + $("#track").outerHeight())) {

            $("#truck").css({
                'top': "+=" + 1 + "px",
            })
            app.checkCollisions($("#car"), $("#truck"), 0);
        } else {
            app.actualScore += 10;
            $('.truck').remove();
            clearInterval(app.intervalTruck);
            app.randomLeft = 0;
        }
    }, 1);
    //app.speedCar1 += 0.1;
}





app.traffic_car_3 = function () {
    $('.traffic_car_3').remove();
    $(".track").append(
        $('<div />', {
            class: "traffic_car_3",
            id: "traffic_car_3"
        }));
    var randomLeft = app.randomNumber();
    while (1) {
        if ((app.randomObstacle - $("#traffic_car_3").width()) <= randomLeft && (app.randomObstacle + $("#traffic_car_3").width()) >= randomLeft) {
            randomLeft = app.randomNumber();
        } else {
            break;
        }
    }
    app.randomObstacle = randomLeft;
    $("#traffic_car_3").css({
        'left': randomLeft + 'px'
    });
    app.intervalTrafficCar_3 = setInterval(function () {
        if (($("#traffic_car_3").position()) === undefined) {
            return;
        }
        if (($("#traffic_car_3").position().top) <= ($("#track").position().top + $("#track").outerHeight())) {

            $("#traffic_car_3").css({
                'top': "+=" + app.speedCar3 + "px",
            })
            app.checkCollisions($("#car"), $("#traffic_car_3"), 0);
        } else {
            app.actualScore += 10;
            $('.traffic_car_3').remove();
            clearInterval(app.intervalTrafficCar_3);
            app.randomLeft = 0;
        }
    }, 1);
    app.speedCar3 += 0.1;
}