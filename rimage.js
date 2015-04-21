/*

  Goal:

  - Small file size
  - Semantic markup that is as close as possible to what is currently used today
  - Sensible defaults - use out of the box
  - Decent level of control

  To Do: 

  - Look at using: https://www.mobify.com/mobifyjs/v2/docs/ to include src element
  - Look into writing a grunt plugin

 */


var rimage = (function($) {

  var options = {
    imgFolder: 'img',
    imgWidths: {
      small: '480',
      medium: '960',
      large: '1440',
      xlarge: '2000'
    },
    mediaQueries: ["(min-width: 480px)", "(min-width: 960px)", "(min-width: 1200px)"]
  };

  var _getFilename = function(str) {
    var file = {
      path: str,
      name: str.slice(str.lastIndexOf("/")+1, str.lastIndexOf("-")),
      type: str.slice(str.lastIndexOf(".")+1)
    };
    return file;
  };


  /*
    Return a string for the sizes attribute on the img element
   */
  var _getSizesAttr = function($img) {
    var sizes = "";
    var sizesArr = $img.attr('data-sizes').split(",");
      for(var i = 0, mq = options.mediaQueries; i < mq.length; i++) {
        sizes += mq[i] + " " + sizesArr[i] + ",";
      }
      sizes = sizes.substr(0, sizes.length-1);

    return sizes;
  };


  /*
    Return a string for the srcset attribute on the img element
   */
  var _getSrcsetAttr = function(file) {
    var srcset = "";
    
    for(var width in options.imgWidths) {
      if(options.imgWidths.hasOwnProperty(width)) {
        srcset += options.imgFolder + "/" + file.name + "-" + width + "." + file.type + " " + options.imgWidths[width] + "w,";
      }
    }
    srcset = srcset.substr(0, srcset.length-1);

    return srcset;
  };



  return {

    init: function() {
      var _this = this;
      $(document).ready(function() {
        _this.render();
      });
    },

    render: function() {
      // Find every image in the file
      // Get the name of the files
      // Set its srcset property
      // Check if the data-sizes property is set - if so, set the sizes prop
      $("img").each(function() {
        // Cache the jQuery img element
        var $img = $(this);

        // Get the filename from the data-src attribute
        var file = _getFilename($img.attr('src'));
        console.log(file);

        $img
            .prop('srcset', _getSrcsetAttr(file))
            .prop('src', file.path)
            .prop('sizes', _getSizesAttr($img))
            .removeAttr('data-src')
            .removeAttr('data-sizes');
      });
    }
  };
})(jQuery);

rimage.init();