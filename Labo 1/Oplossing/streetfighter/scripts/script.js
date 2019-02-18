;(function () {
    
    // Global vars
    var lastRender = 0
    var kenState = 0
    var deejayState = 0

    let kenIdle = {
        sprite: 'ken.png', //img src
        top: 10, // px from top
        height: 180,
        steps: [10, 110, 210, 310], // translation to right o.e. frame
        width: [90, 90, 90, 90], // w. of each frame
        currentIteration: 0
    };

    let kenAttack = {
        sprite: 'ken.png',
        top: 210,
        height: 180,
        steps: [10, 110, 218, 376, 491],
        width: [90, 100, 155, 100, 90],
        currentIteration: 0
    };

    let deejayIdle = {
        sprite: 'deejay.png',
        top: 10,
        height: 200,
        steps: [10, 122, 233, 347],
        width: [105, 105, 105, 105],
        currentIteration: 0
    };

    let deejayAttack = {
        sprite: 'deejay.png',
        top: 225,
        height: 200,
        steps: [22, 130, 276, 432, 588],
        width: [110, 150, 150, 150, 150],
        currentIteration: 0
    };

    function update(progress) {
        // decalre if attack or defending
        var ken = kenState == 0? kenIdle : kenAttack
        var deejay = deejayState == 0? deejayIdle : deejayAttack

        // declare current timestep
        var kenTimestep = 1000/ken.steps.length
        var deejayTimestep = 1000/deejay.steps.length
        ken.currentIteration = Math.floor(lastRender / kenTimestep)        
        deejay.currentIteration = Math.floor(lastRender / deejayTimestep)

        var kenX = ken.steps[ken.currentIteration]
        var kenY = ken.top
        var kenW = ken.width[ken.currentIteration]
        var kenH = ken.height

        var deejayX = deejay.steps[deejay.currentIteration]
        var deejayY = deejay.top
        var deejayW = deejay.width[deejay.currentIteration]
        var deejayH = deejay.height

        // Set given CSS
        document.getElementById("ken").style.background = "url(images/" + ken.sprite + ") -" + kenX + "px -" + kenY + "px";
        document.getElementById("ken").style.width = kenW + "px";
        document.getElementById("ken").style.height = kenH + "px";

        document.getElementById("deejay").style.background = "url(images/" + deejay.sprite + ") -" + deejayX + "px -" + deejayY + "px";
        document.getElementById("deejay").style.width = deejayW + "px";
        document.getElementById("deejay").style.height = deejayH + "px";
    }


    function loop(timestamp) {
      var progress = timestamp - lastRender

      update(progress)

      lastRender = timestamp % 1000
      window.requestAnimationFrame(loop)
    }

    // Simple funcs.
    document.getElementById("kenIdle").onclick = function () {kenState = 0 };
    document.getElementById("kenAttack").onclick = function () {kenState = 1 };
    document.getElementById("deejayIdle").onclick = function () {deejayState = 0 };
    document.getElementById("deejayAttack").onclick = function () {deejayState = 1 };

    window.onload = function() {    
        window.requestAnimationFrame(loop)
    };
})();
