let targetX, targetY;
let letterPositions = [];
let arrowX, arrowY;
const arrowR = 40;
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Georgia');
  textSize(80);
  textStyle(ITALIC);
}
function draw() {
  background('#CC3D20');
  let word = 'reach';
  let cx = width / 2;
  let cy = height / 2;
  let baseWidths = [];
  let totalBase = 0;
  for (let i = 0; i < word.length; i++) {
    let w = textWidth(word[i]);
    baseWidths.push(w);
    totalBase += w;
  }
  let startX = cx - totalBase / 2;
  fill('#EEE4B8');
  noStroke();
  textAlign(LEFT, CENTER);
  for (let i = 0; i < word.length; i++) {
    let letterCX = startX + baseWidths[i] / 2;
    let d = dist(letterCX, cy, mouseX, mouseY);
    let pull = constrain(200 - d, 0, 200) / 200;
    let angle = atan2(mouseY - cy, mouseX - cx);
    let offsetX = cos(angle) * pull * 200;
    let offsetY = sin(angle) * pull * 200;
    text(word[i], startX + offsetX, cy + offsetY);
    startX += baseWidths[i];
  }
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
  fill('#4D94CF');
  noStroke();
  triangle(-s / 2, -s / 2, -s / 2, s / 2, s / 2, 0);
  pop();
}
function mousePressed() {
  if (dist(mouseX, mouseY, arrowX, arrowY) < arrowR) {
    window.location.href = 'out.html';
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
