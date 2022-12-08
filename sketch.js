let archive;
let paintings = [];
let w, h;
let artBoard = [];
let missingArt;
let missionCompletion;
function preload() {
  archive = loadImage("assets/Black and White.png");
}

function setup() {
  createCanvas(2016, 2016);
  w = width / 4;
  h = height / 4;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(w, h);
      img.copy(archive, x, y, w, h, 0, 0, w, h);
      let index = i + j * 4;
      artBoard.push(index);
      let painting = new Artwork(index, img);
      paintings.push(painting);
    }
  }
  paintings.pop();
  artBoard.pop();
  artBoard.push(-1);
  simpleShuffle(artBoard);
}
function swap(i, j, arr) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function randomMove(arr) {
  let r1 = floor(random(4));
  let r2 = floor(random(4));
  move(r1, r2, arr);
}
function simpleShuffle(arr) {
  for (let i = 0; i < 1000; i++) {
    randomMove(arr);
  }
}
function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);
  move(i, j, artBoard);
}

function draw() {
  background(35, 41, 120);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let index = i + j * 4;
      let x = i * w;
      let y = j * h;
      let paintingIndex = artBoard[index];
      if (paintingIndex > -1) {
        let img = paintings[paintingIndex].img;
        image(img, x, y, w, h);
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let x = i * w;
      let y = j * h;
    }
  }
  if (isSolved()) {
    strokeWeight(12);
    stroke("#232978");
    textSize(126);
    fill("#FFB400");
    text("Mission Completion!", 456, 1044);
    // missionCompletion = select("#vincentVanGogh");
    // missionCompletion.mousePressed(buttonPressed);
    // missionCompletion.parent("#ludwigVanBeethoven");
  }
}
function isSolved() {
  for (let i = 0; i < artBoard.length - 1; i++) {
    if (artBoard[i] !== paintings[i].index) {
      return false;
    }
  }
  background(archive);
  return true;
}
function move(i, j, arr) {
  let blank = findBlank();
  let blankCol = blank % 4;
  let blankRow = floor(blank / 4);
  if (isNeighbor(i, j, blankCol, blankRow)) {
    swap(blank, i + j * 4, arr);
  }
}
function isNeighbor(i, j, x, y) {
  if (i !== x && j !== y) {
    return false;
  }

  if (abs(i - x) == 1 || abs(j - y) == 1) {
    return true;
  }
  return false;
}
function findBlank() {
  for (let i = 0; i < artBoard.length; i++) {
    if (artBoard[i] == -1) return i;
  }
}
