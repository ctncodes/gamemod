let env, osc;
let button;
let slider;
let playing = false;
function setup() {
  createCanvas(100, 100);
  env = new p5.Envelope();
  env.setADSR(.05, .1, .5, 1);
  env.setRange(1.2, 0);
  osc = new p5.Oscillator();
  slider = createSlider(100, 1200, 1000);
  osc.setType("sine");
  osc.start();
  osc.freq(1000);
  osc.amp(env);

  button = createButton("play/pause");
  button.mousePressed(toggle);
}

function draw() {
  osc.freq(slider.value());
  if (playing) {
    background(255, 0, 255);
  } else {
    background(51);
  }
}

function toggle() {
  // if (!playing) {
  //   osc.amp(.5, 1);
  //   playing = true;
  // } else {
  //   osc.amp(0, 1);
  //   playing = false;
  // }
  env.play();
}
