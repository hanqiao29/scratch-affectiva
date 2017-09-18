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
            /*
               Face detector configuration - If not specified, defaults to
               affdex.FaceDetectorMode.LARGE_FACES
               affdex.FaceDetectorMode.LARGE_FACES=Faces occupying large portions of the frame
               affdex.FaceDetectorMode.SMALL_FACES=Faces occupying small portions of the frame
            */
            var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
            var detector = new affdex.PhotoDetector(faceMode);

            //Enable detection of all Expressions, Emotions and Emojis classifiers.
            detector.detectAllEmotions();
            detector.detectAllExpressions();
            detector.detectAllEmojis();
            detector.detectAllAppearance();

            //Add a callback to notify when the detector is initialized and ready for runing.
            detector.addEventListener("onInitializeSuccess", function() {
                console.log("The detector reports initialized");
            });

            //********************** Need to look more into this part ****************************
            //Add a callback to receive the results from processing an image.
            //The faces object contains the list of the faces detected in an image.
            //Faces object contains probabilities for all the different expressions, emotions and appearance metrics
            detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
                drawImage(image);
                console.log("Number of faces found: " + faces.length);
                if (faces.length > 0) {
                    console.log("Appearance: " + JSON.stringify(faces[0].appearance));
                    console.log("Emotions: " + JSON.stringify(faces[0].emotions, function(key, val) {
                        return val.toFixed ? Number(val.toFixed(0)) : val;
                    }));
                    console.log("Expressions: " + JSON.stringify(faces[0].expressions, function(key, val) {
                        return val.toFixed ? Number(val.toFixed(0)) : val;
                    }));
                    console.log("Emoji: " + faces[0].emojis.dominantEmoji);
                    drawFeaturePoints(image, faces[0].featurePoints);
                }
            });

            //Add a callback to notify if failed receive the results from processing an image.
            detector.addEventListener("onImageResultsFailure", function(image, timestamp, error) {
                console.log('Failed to process image err=' + error);
            });

            //Initialize the emotion detector
            console.log("Starting the detector .. please wait");
            detector.start();

            //Once the image is loaded, pass it down for processing
            function imageLoaded(event) {}
                var context = document.createElement('canvas').getContext('2d');
                var img = new Image();
                img.onload = function(){
                    context.drawImage(this, 0, 0, canvas.width, canvas.height);
                }
                //img.src = <base64 data from camera block> getting this from Jibo

                // Pass the image to the detector to track emotions after loaded
                if (detector && detector.isRunning) {
                    detector.process(context.getImageData(0, 0, this.width, this.height), 0);
                }
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
