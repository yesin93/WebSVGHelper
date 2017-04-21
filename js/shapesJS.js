//JSON object
var shapesJS = {
    layers: []
}

function addLayertoJSON(layerID, name){

    //local storage object
    // var KEY_NAME = "shapeJS";

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
}

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


            addLayertoJSON(properties.idLayer, properties.name);

            return layer;
            return this;

    };

    //draw a circle on given SVG layer
    $.fn.drawCircle = function(layer, options){
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

    //draw a rectangle on given SVG layer
    $.fn.drawRect = function (layer, options) {
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
    };

    //lower the SVG layer position
    $.fn.layerDescend = function(lowerBy){


        this.css("z-index", lowerBy);
        return this;
    };

    //raise the SVG layer position
    $.fn.layerAscend = function(lowerBy){
        this.css("z-index", lowerBy);
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
        function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

            var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

            return { width: srcWidth*ratio + "px", height: srcHeight*ratio + "px" };
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

