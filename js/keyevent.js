app.moveCarOnButtonPress = function () {
    clearInterval(app.intervalPress);
    var road = $('#track'),
        myCar = $('#car'),
        w = road.width() - myCar.width(),
        d = {},
        x = 3;
    function newv(v, a, b) {
        var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
        if(n===0 || n===235){
            app.gameOver();
            app.gameOverDialog();
            n=125;
            app.moveCarOnButtonPress();
        }
        return n < 0 ? 0 : n > w ? w : n;
    }
    $(window).keydown(function (e) {
        d[e.which] = true;
    });
    $(window).keyup(function (e) {
        d[e.which] = false;
    });
    app.intervalPress = setInterval(function () {

        myCar.css({
            left: function (i, v) {
                return newv(v, 37, 39);
            },
        });
    }, 12);

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