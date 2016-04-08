app.gameOver = function () {
    clearInterval(app.intervalPress);
    clearInterval(app.interval_car_1);
    clearInterval(app.interval_car_2);
    clearInterval(app.fuelTank);
    clearInterval(app.oilSpill);
    clearInterval(app.intervalTrack);
    clearInterval(app.intervalTrafficCar_1);
    clearInterval(app.intervalTrafficCar_2);
    clearInterval(app.intervalFuelTank);
    clearInterval(app.intervalOilSpill);
    clearInterval(app.finishline1);
    clearTimeout(app.progressBarTimeout);
    clearInterval(app.intervalTruck);
    clearInterval(app.truckGenerate);
    clearInterval(app.interval_car_3);
    clearInterval(app.intervalTrafficCar_3);
    app.speedCar1 = 1;
    app.speedCar2 = 1.5;
    app.speedCar3 = 1;

    $(".track").empty();
}


app.gameOverDialog = function () {

    $(".cargame").append(
        $('<div />', {
            class: "gameover"

        }).append($('<p />', {
            class: "gameovertext",
            text: "Game Over"
        })).append($('<img />', {
            src: "images/accident.png"

        })).append($('<p />', {
            class: "gameovertextcrached",
            text: "Crashed"
        })).append($('<button />', {
            class: "gameoverbutton btn btn-primary",
            text: "Try again"
        })));


    $(".gameoverbutton").off().on("click", function () {
        $('.gameover').remove();
        app.countDown();
    });

}

app.emptyFuelDialog = function () {

    $(".cargame").append(
        $('<div />', {
            class: "gameover"

        }).append($('<p />', {
            class: "gameovertext",
            text: "Game Over"
        })).append($('<img />', {
            src: "images/emptyfuel.jpg"

        })).append($('<p />', {
            class: "gameovertextcrached",
            text: "Empty Fuel Tank"
        })).append($('<button />', {
            class: "gameoverbutton btn btn-primary",
            text: "Try again"
        })));


    $(".gameoverbutton").off().on("click", function () {
        $('.gameover').remove();
        app.countDown();
    });

}

app.finishDialog = function () {

    $(".cargame").append(
        $('<div />', {
            class: "gameover"

        }).append($('<p />', {
            class: "gameovertext",
            text: "Congratulations"
        })).append($('<img />', {
            src: "images/trophy.png"

        })).append($('<p />', {
            class: "gameovertextcrached",
            text: "Success"
        })).append($('<button />', {
            class: "gameoverbutton btn btn-primary",
            text: "Next Level"
        })));


    $(".gameoverbutton").off().on("click", function () {
        $('.gameover').remove();
        app.countDown();
    });

}


app.finishline = function () {
    app.finishline1 = setInterval(function () {
        if (($(".finish").position()) === undefined) {
            return;
        }

        if (($(".finish").position().top) <= ($("#track").position().top + $("#track").outerHeight())) {
            $(".finish").animate({
                top: "+=" + 4 + "px",
            }, 10);
            //     }, 10, app.collisionFinshLine);
            app.checkCollisions($("#car"), $(".finish"), 4);

        } else {

            $('.finish').remove();

            clearInterval(app.finishline);

        }

    }, 10);
}