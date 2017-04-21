/**
 * Created by yesin on 4/21/17.
 */
$('h1').greenify().bold();
//$('img').centeringImg();
//$('img').scaleImageWidth('50%');
//$('img').scaleImage();

/*
* The data shapeJS data structure will be printed in the console
 * for every layer created
 */

//initializing an SVG layer with options
var layer1 = $('.svg-container').addSVGOverlay({
    idLayer: "layer1",
    name: "initial",
    viewBox: "0 0 800 960",
    preserveAspectRatio: "xMinYMin meet"
});

//Adding circle properties
var circleAttr = {
    cx: 100,
    cy: 100,
    r: 100,
    fill: "orange"
};

//initializing circle on a layer
var circle = $('svg').drawCircle(layer1, circleAttr);

//Initialize a second SVG
var layer2 = $('.svg-container').addSVGOverlay({
    idLayer: "layer2",
    name: "second layer",
    viewBox: "0 0 800 960",
    preserveAspectRatio: "xMinYMin meet"
});

//Adding rectangle properties
var squareAttr = {
    x:200,
    y:200,
    height: 200,
    width: 200,
    fill: "grey"
};

//Draw a square on second layer
var square = $('svg').drawRect(layer2, squareAttr);