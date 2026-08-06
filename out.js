/************
 *     Prompt(s): 
 *       1. "make the text stretch even further even when the cursor isn't as close" 
 *     AI tool: Claude, version Sonnet 4.6 by Anthropic
  *    "an error came up and the hand still has a background" [fixing white-background removal + infinite loop error]
 *  Claude helped with the math equations for stretch interaction — specifically the distance calculation, 
 *         pull curve (pow), and angle logic (atan2, cos, sin).
 ************/
let hand;
let handHomeX, handHomeY, handW, handH;
let handX, handY;
let dragging = false;
let grabOffsetX = 0, grabOffsetY = 0;
let arrowX, arrowY;
const arrowR = 40;
async function setup() {
  createCanvas(windowWidth, windowHeight);
  hand = await loadImage('assets/hand.png');
  hand.resize(350, 0);
  removeWhiteBackground(hand);
  textFont('Georgia');
  textSize(80);
  textStyle(ITALIC);
  textAlign(CENTER, CENTER);
  placeHand();
}
function removeWhiteBackground(img) {
  img.loadPixels();
  let px = img.pixels;
  px.forEach((_, i) => {
    if (i % 4 === 0) {
      let r = px[i], g = px[i + 1], b = px[i + 2];
      if (r > 235 && g > 235 && b > 235) {
        px[i + 3] = 0;
      }
    }
  });
  img.updatePixels();
}
function placeHand() {
  handW = min(width * 0.32, 420);
  handH = handW * (hand.height / hand.width);
  handHomeX = width * 0.18;
  handHomeY = height / 2;
  if (handX === undefined) {
    handX = handHomeX;
    handY = handHomeY;
  }
}
function draw() {
  background('#4D94CF');
  let wordBaseX = width / 2;
  let wordCY = height / 2;
  // space between hand to out position?
  let d = dist(handX, handY, wordBaseX, wordCY);
  let closeness = constrain(map(d, 350, 0, 0, 1), 0, 1); // 0 far, 1 touching
  // word slides right the closer the hand gets
  let maxShift = width * 0.2;
  let wordCX = wordBaseX + closeness * maxShift;
  fill('#CC3D20');
  noStroke();
  text('out', wordCX, wordCY);
  // the hand 
  push();
  tint('#EEE4B8');
  imageMode(CENTER);
  image(hand, handX, handY, handW, handH);
  pop();
  if (!dragging) {
    handX = lerp(handX, handHomeX, 0.12);
    handY = lerp(handY, handHomeY, 0.12);
  }
  fill('#CC3D20');
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
function isOverHand(x, y) {
  return (
    x > handX - handW / 2 &&
    x < handX + handW / 2 &&
    y > handY - handH / 2 &&
    y < handY + handH / 2
  );
}
function mousePressed() {
  if (dist(mouseX, mouseY, arrowX, arrowY) < arrowR) {
    window.location.href = 'tome.html';
    return;
  }
  if (isOverHand(mouseX, mouseY)) {
    dragging = true;
    grabOffsetX = mouseX - handX;
    grabOffsetY = mouseY - handY;
  }
}
function mouseDragged() {
  if (dragging) {
    handX = mouseX - grabOffsetX;
    handY = mouseY - grabOffsetY;
  }
}
function mouseReleased() {
  dragging = false;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  placeHand();
}
