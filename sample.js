const Game = function() {  
    let width;
    let height;
    const cubes = [];
    const colors = ['red', 'blue', 'pink', 'purple', 'green', 'yellow'];
    let points = 0;

    const gameBoard = document.getElementById('gameBoard');
  
    let swapCube1 = null;
    let swapCube2 = null;

    this.initBoard = (_width, _height) => {
      width = _width;
      height = _height;
      for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
          const cube = {
            x: j,
            y: i,
            color: colors[Math.floor(Math.random() * colors.length)]
          };
          row.push(cube);
        }
        cubes.push(row);
      } 
      this.render();
    };
  
    this.render = () => {
      gameBoard.innerHTML = '';
      cubes.forEach(row => {
        const rowDom = document.createElement('div');
        rowDom.className = 'cube-row';
        row.forEach(cube => {
          const cubeDom = document.createElement('div');
          cubeDom.className = `cube ${cube.color}`;
          rowDom.appendChild(cubeDom);
          cube.dom = cubeDom;
          cubeDom.addEventListener('click', e => {
            // swap 구현 
            if (swapCube1 == null) {
              swapCube1 = cube;
            } else if (swapCube2 == null) {
              swapCube2 = cube;
            }
  
            if (swapCube1 && swapCube2) {
              this.swap(swapCube1, swapCube2);
              swapCube1 = null;
              swapCube2 = null;
            }
          });
        });
        gameBoard.appendChild(rowDom);
      });
    };
    
    // 3match가 일어난 cube를 리턴
    this.getMatchedCubes = () => {

      const matchedCubes = [];

      return matchedCubes;
    };

    this.generateNewBlocks = () => {

    };

    this.handle3Match = () => {
      setTimeout(() => {
        const matchedCubes = this.getMatchedCubes();
        if(getMatchedCubes.length === 0) return;

        points += getMatchedCubes.length;
        getMatchedCubes.remove();
        this.generateNewBlocks();
        this.render();
        this.handle3Match();
      }, 1000);
    };

    this.swap = (cube1, cube2) => {
      cubes[cube2.y][cube2.x] = cube1;
      cubes[cube1.y][cube1.x] = cube2;
      const tempCoords = [cube1.y, cube1.x];
      cube1.y = cube2.y;
      cube1.x = cube2.x;
      cube2.y = tempCoords[0];
      cube2.x = tempCoords[1];
      this.render();
      
      this.handle3Match();
    };
  };
  
const game = new Game();

const form = document.getElementById('form');

const init = () => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let width = this.querySelector('[name="width"]').value;
    let height = this.querySelector('[name="height"]').value;
    game.initBoard(width, height);
  });
};

init();
