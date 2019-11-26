function dis(val) {
  document.getElementById("result").value+=val
}

function solve() {
  let x = document.getElementById("result").value
  let y = eval(x)
  document.getElementById("result").value = y
}

function clr() {
  document.getElementById("result").value = ""
}

class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getTopBox() {
    if (this.y === 0) return null;
    return new Box(this.x, this.y - 1);
  }

  getRightBox() {
    if (this.x === 3) return null;
    return new Box(this.x + 1, this.y);
  }

  getBottomBox() {
    if (this.y === 3) return null;
    return new Box(this.x, this.y + 1);
  }

  getLeftBox() {
    if (this.x === 0) return null;
    return new Box(this.x - 1, this.y);
  }

  getNextdoorBoxes() {
    return [
      this.getTopBox(),
      this.getRightBox(),
      this.getBottomBox(),
      this.getLeftBox()
    ].filter(box => box !== null);
  }

  getRandomNextdoorBox() {
    const nextdoorBoxes = this.getNextdoorBoxes();
    return nextdoorBoxes[Math.floor(Math.random() * nextdoorBoxes.length)];
  }
}

const swapBoxes = (grid, box1, box2) => {
  const temp = grid[box1.y][box1.x];
  grid[box1.y][box1.x] = grid[box2.y][box2.x];
  grid[box2.y][box2.x] = temp;
};

const isSolved = grid => {
  return (
    grid[0][0] === 1 &&
    grid[0][1] === 2 &&
    grid[0][2] === 3 &&
    grid[0][3] === 4 &&
    grid[0][4] === 5 &&
    grid[0][5] === 6 &&
    grid[0][6] === 7 &&
    grid[0][7] === 8 &&
    grid[1][0] === 9 &&
    grid[1][1] === 10 &&
    grid[1][2] === 11 &&
    grid[1][3] === 12 &&
    grid[1][4] === 13 &&
    grid[1][5] === 14 &&
    grid[1][6] === 15 &&
    grid[1][7] === 16 &&
    grid[2][0] === 17 &&
    grid[2][1] === 18 &&
    grid[2][2] === 19 &&
    grid[2][3] === 20 &&
    grid[2][4] === 21 &&
    grid[2][5] === 22 &&
    grid[2][6] === 23 &&
    grid[2][7] === 24 &&
    grid[3][0] === 25 &&
    grid[3][1] === 26 &&
    grid[3][2] === 27 &&
    grid[3][3] === 28 &&
    grid[3][4] === 29 &&
    grid[3][5] === 30 &&
    grid[3][6] === 31 &&
    grid[3][7] === 32 &&
    grid[4][0] === 33 &&
    grid[4][1] === 34 &&
    grid[4][2] === 35 &&
    grid[4][3] === 36 &&
    grid[4][4] === 37 &&
    grid[4][5] === 38 &&
    grid[4][6] === 39 &&
    grid[4][7] === 40 &&
    grid[5][0] === 41 &&
    grid[5][1] === 42 &&
    grid[5][2] === 43 &&
    grid[5][3] === 44 &&
    grid[5][4] === 45 &&
    grid[5][5] === 46 &&
    grid[5][6] === 47 &&
    grid[5][7] === 48 &&
    grid[6][0] === 49 &&
    grid[6][1] === 50 &&
    grid[6][2] === 51 &&
    grid[6][3] === 52 &&
    grid[6][4] === 53 &&
    grid[6][5] === 54 &&
    grid[6][6] === 55 &&
    grid[6][7] === 56 &&
    grid[7][0] === 57 &&
    grid[7][1] === 58 &&
    grid[7][2] === 59 &&
    grid[7][3] === 60 &&
    grid[7][4] === 61 &&
    grid[7][5] === 62 &&
    grid[7][6] === 63 &&
    grid[7][7] === 0
  );
};

const getRandomGrid = () => {
  let grid = [[1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15, 16], [17, 18, 19, 20, 21, 22, 23, 24], [25, 26, 27, 28, 29, 30, 31, 32], [33, 34, 35, 36, 37, 38, 39, 40], [41, 42, 43, 44, 45, 46, 47, 48], [49, 50, 51, 52, 53, 54, 55, 56], [57, 58, 59, 60, 61, 62, 63, 0]];

  // Shuffle
  let blankBox = new Box(7, 7);
  for (let i = 0; i < 1000; i++) {
    const randomNextdoorBox = blankBox.getRandomNextdoorBox();
    swapBoxes(grid, blankBox, randomNextdoorBox);
    blankBox = randomNextdoorBox;
  }

  if (isSolved(grid)) return getRandomGrid();
  return grid;
};

class State {
  constructor(grid, move, time, status) {
    this.grid = grid;
    this.move = move;
    this.time = time;
    this.status = status;
  }

  static ready() {
    return new State(
      [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
      0,
      0,
      "ready"
    );
  }

  static start() {
    return new State(getRandomGrid(), 0, 0, "playing");
  }
}

class Game {
  constructor(state) {
    this.state = state;
    this.tickId = null;
    this.tick = this.tick.bind(this);
    this.render();
    this.handleClickBox = this.handleClickBox.bind(this);
  }

  static ready() {
    return new Game(State.ready());
  }

  tick() {
    this.setState({ time: this.state.time + 1});
  }

  setState(newState) {
    this.state = { ...this.state, ...newState};
    this.render();
  }

  handleClickBox(box) {
    return function() {
      const nextdoorBoxes = box.getNextdoorBoxes();
      const blankBox = nextdoorBoxes.find(
        nextdoorBox => this.state.grid[nextdoorBox.y][nextdoorBox.x] === 0
      );
      if (blankBox) {
        const newGrid = [...this.state.grid];
        swapBoxes(newGrid, box, blankBox);
        if (isSolved(newGrid)) {
          clearInterval(this.tickId);
          this.setState({
            status: "won",
            grid: newGrid,
            move: this.state.move + 1
          });
        } else {
          this.setState({
            grid: newGrid,
            move: this.state.move + 1
          });
        }
      }
    }.bind(this);
  }

  render() {
    const { grid, move, time, status } = this.state;

    // Render grid
    const newGrid = document.createElement("div");
    newGrid.className = "grid";
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const button = document.createElement("button");

        if (status === "playing") {
          button.addEventListener("click", this.handleClickBox(new Box(j, i)));
        }

        button.textContent = grid[i][j] === 0 ? "" : grid[i][j].toString();
        newGrid.appendChild(button);
      }
    }
    document.querySelector(".grid").replaceWith(newGrid);

    // Render button
    const newButton = document.createElement("button");
    if (status === "ready") newButton.textContent = "Play";
    if (status === "playing") newButton.textContent = "Reset";
    if (status === "won") newButton.textContent = "Play";
    newButton.addEventListener("click", () => {
      clearInterval(this.tickId);
      this.tickId = setInterval(this.tick, 1000);
      this.setState(State.start());
    });
    document.querySelector(".footer button").replaceWith(newButton);

    // Render move
    document.getElementById("move").textContent = `Move ${move}`;

    // Render time
    document.getElementById("time").textContent = `Time ${time}`;

    // Render message
    if (status === "won") {
      document.querySelector(".message").textContent = "Earth wins!";
    } else {
      document.querySelector(".message").textContent = "";
    }
  }
}

const GAME = Game.ready();
