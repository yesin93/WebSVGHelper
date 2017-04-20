/**
 * Created by yesin on 3/28/17.
 */

//Manipulate css
var textCSS = (function ( $ ) {
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


    $.fn.bold = function(){
        this.css("font-weight", 900);
        return this;
    };

    $.fn.addSVGOverlay = function(){

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

