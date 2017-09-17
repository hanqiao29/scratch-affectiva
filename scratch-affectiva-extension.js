/* Extension for detecting sentiment of image using affectiva api */

new (function() {
    var ext = this;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.use_affectiva = function() {
        $.getScript("https://download.affectiva.com/js/3.2/affdex.js", function(){
            console.log('insdie getScript');
            var detector = new affdex.PhotoDetector();
            var test_var = detector.detectExpressions.smile;
            console.log('Test Var:', test_var);
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
