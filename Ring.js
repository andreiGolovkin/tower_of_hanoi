let maxSize = 6;
let ringHeight = 40;

function getX(pole){
  return width * ((2 * pole + 1) / 6);
}

function getY(h){
  return height - ringHeight * (h + 1);
}

function showRing(pole, h, size, color){
  noStroke();
  fill(color);
  let pixSize = (width / 3 - 40) * (size / maxSize);
  rect(getX(pole) - pixSize / 2, getY(h), pixSize, 40);
}
