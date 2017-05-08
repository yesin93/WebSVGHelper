var shapesJSObj = {
    layers: []
}

function addLayertoJSON(layerID, name){

    //local storage object
    var KEY_NAME = "shapeJS";

    // layer object
    var layer = {};

    //layer data
    var custom = {};
    var cssProp = {};
    var contents = [];

    layer["layerID"] = layerID;
    layer["name"] = name;
    layer["custom"] = custom;
    layer["cssProp"] = cssProp;
    layer["contents"] = contents;
    layer["shapes"] = null;

    shapesJSObj.layers.push(layer);
    console.log(shapesJSObj);

    // var result = JSON.stringify(shapesJS);
    // window.localStorage.setItem(KEY_NAME, result);
    // alert('Saved');
};

function layerOjects(layerID, type, coords, customAttr ){

    // //checking the type of the object on the overlay
    // var type;
    var shapes = [];
    var shape = {};

    shape["type"] = type;
    shape["coords"] = coords;
    shape["customAttr"] = customAttr;


    //custom attributes
    // var customAttr = {};
    shapes.push(shape);

$.each(shapesJSObj.layers, function(i, n){
        if(n.layerID == layerID){
            n.shapes = shapes;
        }
    });

console.log(shapesJSObj);

};

//generate a unique default id
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};


var shapesJS = (function ( $ ) {
    var shade = "green";
    var imgEl = this;
    //image dimensions
    var imageHeight = $(imgEl).height();
    var imageWidth = $(imgEl).width();

    //display dimensions
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    $.fn.greenify = function() {
        this.css( "color", shade );
        return this;
    };

//bold text
    $.fn.bold = function(){
        this.css("font-weight", 900);
        return this;
    };

    //adding an SVG to given selector
    $.fn.addSVGOverlay = function(options){
        //creating an SVG on the target

            var layerID = generateUUID();

            var properties = $.extend({
                idLayer: layerID,
                name: "default",
                viewBox: "0 0 800 960",
                preserveAspectRatio: "xMinYMin meet",
                z_index: 0
            }, options);

            var layer = d3.select(this.selector)
                .append("svg")
                .attr("id", properties.idLayer)
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("version", "1.1")
                .attr("name", properties.name)
                .attr("preserveAspectRatio", properties.preserveAspectRatio)
                .attr("viewBox", properties.viewBox)
                // .style("z-index", 0)
                .classed("my-svg", true);


            $('#'+ properties.idLayer).css("z-index", properties.z_index);


            addLayertoJSON(properties.idLayer, properties.name);

            return layer;
            return this;

    };

    //Add a custom attribute to the relevant object
    $.fn.createCustomAttr = function(layerID, attrs){

        $.each(shapesJSObj.layers, function(i, d){
            if(d.layerID == layerID){
                d.customAttr = attrs;
            }
        });
        console.log(shapesJSObj);
        return this;
    };

    //Add a custom attribute to the relevant object
    $.fn.addCustomAttrTo = function(layerID, newAttr){

        $.each(shapesJSObj.layers, function(i, d){
            if(d.layerID == layerID){
                d.customAttr = $.extend(d.customAttr, newAttr);
            }
        });
        console.log(shapesJSObj);
        return this;
    };

    //Remove a custom attribute from the relevant object
    $.fn.removeCustomAttr = function(layerID, attrName){
        $.each(shapesJSObj.layers, function(i, d){
            if(d.layerID == layerID){
                console.log(d.customAttr[attrName]);
                d.customAttr[attrName] = "";
            }
        });
        return this;
    };

    //Clear all custom attributes
    $.fn.clearAllCustomAttr = function(layerID){
        $.each(shapesJSObj.layers, function(i, d){
            if(d.layerID == layerID){
                d.customAttr = "";
            }
        });
        return this;
    };

    $.fn.updateCustomAttr = function(layerID, attrName, attrValue){
        $.each(shapesJSObj.layers, function(i, d){
            if(d.layerID == layerID){
                d.customAttr[attrName] = attrValue;
            }
        });
        return this;
    };

    /*
     * Temporary test method Draw a rectangle on given SVG layer
     */
    $.fn.drawCircle = function(layer, options){
        var properties = $.extend({
            cx: 200,
            cy: 200,
            r: 100,
            fill: "red"
            // id: layer._groups
        }, options);

        var circle = layer.append("circle")
            .attr("cx", properties.cx)
            .attr("cy",properties.cy)
            .attr("r", properties.r)
            .attr("fill", properties.fill);
    };

    /*
    * Temporary test method Draw a rectangle on given SVG layer
     */
    $.fn.drawRect = function (layer, options) {
        console.log(layer);
        console.log(JSON.stringify(layer._groups[0]));
        console.log(layer._groups[0][0].id);
        console.log(layer._groups[0]);


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
            .attr("fill", properties.fill);


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
    $.fn.layerDescend = function(lowerBy){
        this.css("z-index", lowerBy*(-1));
        return this;
    };

    //raise the SVG layer position
    $.fn.layerAscend = function(raiseBy){
        this.css("z-index", raiseBy);
        return this;
    };

    $.fn.centeringImg = function(){

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

    $.fn.scaleImage = function(){
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


    //get image URL
    // var imageURL = $('#img-apple');
    $.fn.printImgDimensions = function(){
        console.log("Height:" + imageHeight + "px   Width:" + imageWidth +"px");
        return this;
    };

}( jQuery ));

