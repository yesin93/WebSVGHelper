/**
 * Created by yesin on 4/18/17.
 */
//JSON object
var shapesJS = {
    layers: []
}

function addLayertoJSON(layerID, name){

    //local storage object
    var KEY_NAME = "shapeJS";

    // layer object
    var layer = {}

    //layer data
    var custom = {};
    var cssProp = {};
    var contents = [];

    layer["layerID"] = layerID;
    layer["name"] = name;
    layer["custom"] = custom;
    layer["cssProp"] = cssProp;
    layer["contents"] = contents;

    shapesJS.layers.push(layer);
    console.log(shapesJS);

    // var result = JSON.stringify(shapesJS);
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

function createNewLayer(options){

    var layerID = generateUUID();

    var properties = $.extend({
        idLayer: layerID,
        name: "",
        // height: "",
        // width: "",
        viewBox: "0 0 800 960",
        perserveAspectRatio: "xMidYMin"
    }, options);



    var layer = d3.select(".svg-container")
        .append("svg")
        .attr("id", properties.idLayer)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("version", "1.1")
        .attr("class","my-svg")
        .attr("name", properties.name)
        .attr("ViewBox", properties.viewBox)
        .attr("height", properties.height)
        .attr("width", properties.width);

    addLayertoJSON(properties.idLayer, properties.name);

    return layer;
}


function getlayer(){
    var KEY_NAME = "shapes";
    var shapes = JSON.parse(window.localStorage.getItem(KEY_NAME));

    $.get(shapes, function (data) {
        $.each(data, function(arr){
           console.log(arr);
        });
    });

}

function createCircle(layer, options){

    var properties = $.extend({
        cx: 200,
        cy: 200,
        r: 100,
        fill: "red"
    }, options);

    var circle = layer.append("circle")
        .attr("cx", properties.cx)
        .attr("cy",properties.cy)
        .attr("r", properties.r)
        .attr("fill", properties.fill);
};

function createRectangle(layer, options){

    var properties = $.extend({
        height: 200,
        width: 200,
        fill: "green"
    }, options);

    var rectangle = layer.append("rect")
        .attr("height", properties.height)
        .attr("width",properties.width)
        .attr("fill", properties.fill);
};

function createPoly(){

};