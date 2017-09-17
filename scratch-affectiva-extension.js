/* Extension for deteting sentiment of a simple text */

new (function() {
    var ext = this;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // affectiva ajax call
    ext.use_affectiva = function() {

        // window.addEventListener('load', function()){
        //     var script = document.createElement('script');
        //     script.type = 'text/javascript';
        //     script.src = "https://download.affectiva.com/js/3.2/affdex.js";
        // }

        $.getScript("https://download.affectiva.com/js/3.2/affdex.js", function(){
            console.log('insdie get script');
            var detector = new affdex.PhotoDetector();
            var test_var = detector.detectExpressions.smile;
            console.log('TestVar:', test_var);
        })

    };


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'get sentiment of picture', 'use_affectiva'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Text Sentiment extension', descriptor, ext);
})();
