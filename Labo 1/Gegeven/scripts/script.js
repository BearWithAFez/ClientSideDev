;(function () {
    let kenIdle = {
        sprite: 'ken.png',
        top: 10,
        height: 180,
        steps: [10, 110, 210, 310],
        width: [90, 90, 90, 90],
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

    window.onload = function() {

    };
})();
