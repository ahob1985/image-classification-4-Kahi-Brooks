// Author:

// Global UI Variables
let canvasDiv;
let canvas; 
let textDiv;
let textP;
let submitButton;
let resetButton;
// Global ML Variables
let doodlenet;
let img;
let isModelReady

function setup() {
canvasDiv = createDiv();
canvas = createCanvas(640, 480);
canvas.parent(canvasDiv);
textDiv = createDiv();
textP = createP("Model Loading, please wait...");
textP.parent(textDiv);
//create Button UI
buttonDiv = createDiv();
submitButton = createButton("SUBMIT");
submitButton.parent(buttonDiv);
submitButton.mousePressed(predictImage);
resetButton = createButton("RESET");
resetButton.parent(buttonDiv);
resetButton.mousePressed(resetCanvas);
buttonDiv.style("display", "none");
//initialise ML Variables
isModelReady = false;
doodlenet = ml5.imageClassifier("DoodleNet", modelReady);

}

function draw() {
 if(mouseIsPressed && isModelReady) {
 strokeWeight(25);
 line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function resetCanvas() {
 background(255); 
 textP.html("Draw your image, then click submit")
}

function modelReady() {
isModelReady = true;
buttonDiv.style("display", "block");
textP.html("Draw your image, then click submit");
}

function predictImage() {
doodlenet.classify(canvas, gotResults);
}

function gotResults(error, results) {
if(error) {
 console.error(error);
} else {
let label = results[0].label;
let confidence = round(results[0].confidence, 2);
textP.html("Label: " + label + "- Confidence: " + confidence);


   }
 }
