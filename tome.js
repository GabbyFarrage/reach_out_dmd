/************
 *     Prompt(s): 
 *     AI tool: Claude, version Sonnet 4.6 by Anthropic
   "for some reason the text is not opaque nd make the size change way more dramatic so it fills almost whole page"
 ************/
let arrowX, arrowY;
const arrowR = 40;
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Georgia');
  textStyle(ITALIC);
  textAlign(CENTER, CENTER);
}
function draw() {
  background('#CC3D20');
  let cx = width / 2;
  let cy = height / 2;
  let d = dist(mouseX, mouseY, cx, cy);
  let minD = 80;
  let maxD = 500;
  let t = constrain(map(d, minD, maxD, 1, 0), 0, 1);
  let eased = pow(t, 0.5);
  let size = lerp(8, height * 0.55, eased);
  let alpha = lerp(50, 255, eased);
  textSize(size);
  fill(238, 228, 184, alpha);
  noStroke();
  text('to me', cx, cy);
  fill('#4D94CF');
  ellipse(mouseX, mouseY, 12, 12);
  drawArrow();
  noCursor();
}
function drawArrow() {
  arrowX = width - 60;
  arrowY = height - 60;
  let hovering = dist(mouseX, mouseY, arrowX, arrowY) < arrowR;
  let s = hovering ? 32 : 26;
  push();
  translate(arrowX, arrowY);
  fill('#4D94CF');
  noStroke();
  triangle(-s / 2, -s / 2, -s / 2, s / 2, s / 2, 0);
  pop();
}
function mousePressed() {
  if (dist(mouseX, mouseY, arrowX, arrowY) < arrowR) {
    window.location.href = 'about.html';
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
