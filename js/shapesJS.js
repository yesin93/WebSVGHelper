

var imgEl = this;
//image dimensions
var imageHeight = $(imgEl).height();
var imageWidth = $(imgEl).width();

//display dimensions
var windowHeight = $(window).height();
var windowWidth = $(window).width();

var shapesJSObj = {
    layers: []
};

d3.scaleImage = function(){
    // this.css( "width", width );
    function getAspectRatioFit(imgWidth, imgHeight, maxWidth, maxHeight) {

        var ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);

        return { width: imgWidth*ratio + "px", height: imgHeight*ratio + "px" };
    }

    var scaledImage = calculateAspectRatioFit(imageWidth, imageHeight, 554, 750);
    this.css( "width", scaledImage.width );
    this.css( "height", scaledImage.height);
    return this;
};

d3.centeringImg = function(){

    var imgEl = this;
    $(imgEl).load(function(){
        changeImage();

        $(window).bind("resize", function(){
            changeImage();
        });

        function changeImage(){

            //image dimensions
            var imageHeight = $(imgEl).height();
            var imageWidth = $(imgEl).width();

            //display dimensions
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();

            $(imgEl).css({
                "position":"absolute",
                "left": windowWidth/2 - imageWidth/2,
                "top": windowHeight/2 - imageHeight/2
            });
        }
    });
};

function addLayertoObject(layerID, name){

    //local storage object
    var KEY_NAME = "shapeJS";

    // layer object
    var layer = {}

    //layer data
    var cssProp = {};
    var contents = [];

    layer["layerID"] = layerID;
    layer["name"] = name;
    layer["cssProp"] = cssProp;
    layer["contents"] = contents;

    shapesJSObj.layers.push(layer);
    console.log(shapesJSObj);

    // var result = JSON.stringify(shapesJSObj);
    // window.localStorage.setItem(KEY_NAME, result);
    // alert('Saved');
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

d3.createNewLayer =  function(options){

    var layerID = generateUUID();

    var properties = $.extend({
        idLayer: layerID,
        name: "default",
        viewBox: "0 0 800 960",
        preserveAspectRatio: "xMinYMin meet"
    }, options);


    var layer = d3.select(".svg-container")
        .append("svg")
        .attr("id", properties.idLayer)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("version", "1.1")
        .attr("name", properties.name)
        .attr("preserveAspectRatio", properties.preserveAspectRatio)
        .attr("viewBox", properties.viewBox)
        .classed("my-svg", true);

    addLayertoObject(properties.idLayer, properties.name);

    return layer;
};

//adding a shape to a particular grouping
function addLayerToGrouping(layerID, groupingID, shapeType, shapeObj, customAttr){

    $.each(shapesJSObj.layers, function(i,d){

        if(d.layerID === layerID){
            console.log(layerID);
            $.each(d.contents, function(i,d){
                if(d.idGroupEl === groupingID) {
                    d.shapes.push(shapeObj);
                }
            });
        }

    });
    console.log(shapesJSObj);
}

//Add a custom attribute to the relevant object
d3.createCustomAttr = function(layerID, attrs){

    $.each(shapesJSObj.layers, function(i, d){
        if(d.layerID === layerID){
            d.customAttr = attrs;
        }
    });

};

//Add a custom attribute to the relevant object
d3.addCustomAttrTo = function(layerID, newAttr){

    $.each(shapesJSObj.layers, function(i, d){
        if(d.layerID === layerID){
            d.customAttr = $.extend(d.customAttr, newAttr);
        }
    });

};

//Remove a custom attribute from the relevant object
d3.removeCustomAttr = function(layerID, attrName){

    $.each(shapesJSObj.layers, function(i, d){
        if(d.layerID === layerID){
            console.log(d.customAttr[attrName]);
            d.customAttr[attrName] = "";
        }
    });

};

//Clear all custom attributes
d3.clearAllCustomAttr = function(layerID){

    $.each(shapesJSObj.layers, function(i, d){
        if(d.layerID === layerID){
            d.customAttr = "";
        }
    });

};

d3.updateCustomAttr = function(layerID, attrName, attrValue){

    $.each(shapesJSObj.layers, function(i, d){
        if(d.layerID === layerID){
            d.customAttr[attrName] = attrValue;
        }
    });

};

// adding a grouping
d3.addGroupEl = function(layerID, options){

    var groupingID = generateUUID();

    var grouping = $.extend({
        idGroupEl: groupingID,
        name: "default",
        shapes:[]
    },options);

    d3.select('#'+layerID)
        .append('g')
        .attr('name', grouping.name)
        .attr('id', grouping.idGroupEl);

    $.each(shapesJSObj.layers, function (i, d) {
        if(d.layerID === layerID){
            d.contents.push(grouping);
        }
    });

};

/*
 * Temporary test method Draw a rectangle on given SVG layer
 */
d3.drawCircle = function(grouping, options){
    console.log(grouping);

    var properties = $.extend({
        cx: 200,
        cy: 200,
        r: 100,
        fill: "red"
    }, options);

    var circle = d3.select('#'+grouping).append("circle")
        .attr("cx", properties.cx)
        .attr("cy",properties.cy)
        .attr("r", properties.r)
        .attr("fill", properties.fill);


    var shapeType = "circle";
    var layerID = grouping;
    var customAttr;

    addLayerToGrouping(layerID, groupingID, shapeType, circle, customAttr);
};

/*
 * Temporary test method Draw a rectangle on given SVG layer
 */
d3.drawRect = function (layer, options) {

    var properties = $.extend({
        x:200,
        y:200,
        height: 100,
        width: 100,
        fill: "red"
    }, options);


    var rectangle = layer.append("rect")
        .attr("x", properties.x)
        .attr("y", properties.y)
        .attr("height", properties.height)
        .attr("width",properties.width)
        .style({"stroke": "black", "stroke-width": "2px", "fill": properties.fill});


    var coords = {};

    coords["x"] = properties.x;
    coords["y"] = properties.y;
    coords["height"] =  properties.height;
    coords["width"] = properties.width;
    coords["styling"] = properties.fill;

    var shapeType = "rect";
    var layerID = layer._groups[0][0].id;
    var customAttr;

    layerOjects(layerID ,shapeType, coords, customAttr);
};

//lower the SVG layer position
d3.layerDescend = function(lowerBy){
    this.css("z-index", lowerBy*(-1));

};

//raise the SVG layer position
d3.layerAscend = function(raiseBy){
    this.css("z-index", raiseBy);
};

//bring svg to top of closest layer


//bring svg to the bottom of closest layer


//bring svg to the front of given layer


//bring svg to the back of given layer

