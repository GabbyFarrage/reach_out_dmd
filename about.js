let bioText = "This project is about the space between struggling alone and asking for help. Reach. Out. To me. Three words, one motion — the hardest step is often just saying something, to someone. If you're going through something difficult, you don't have to carry it by yourself. Reaching out isn't weakness. It's the beginning of getting better.";
let arrowX, arrowY;
const arrowR = 40;
const margin = 100;
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Georgia');
  textStyle(NORMAL);
}
function draw() {
  background('#EEE4B8');
  fill('#CC3D20');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  textLeading(30);
  text(bioText, margin, margin, width - margin * 2, height - margin * 2);
  // blue cursor dot, matching the other pages
  fill('#4D94CF');
  noStroke();
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
  fill('#CC3D20');
  noStroke();
  triangle(-s / 2, -s / 2, -s / 2, s / 2, s / 2, 0);
  pop();
}
function mousePressed() {
  if (dist(mouseX, mouseY, arrowX, arrowY) < arrowR) {
    window.location.href = 'reach.html';
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
