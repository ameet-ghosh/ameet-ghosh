app.obstacles = function () {
    app.interval_car_1 = setInterval(function () {
        app.traffic_car_1();
    }, 6700);
    app.interval_car_2 = setInterval(function () {
        app.traffic_car_2();
    }, 8000);
    app.fuelTank = setInterval(function () {
        app.fuel_tank();
    }, 35000);
    app.oilSpill = setInterval(function () {
        app.oil_spill();
    }, 30000);
    app.truckGenerate = setInterval(function () {
        app.truck();
    }, 50000);
    app.interval_car_3 = setInterval(function () {
        app.traffic_car_3();
    }, 3000);
}