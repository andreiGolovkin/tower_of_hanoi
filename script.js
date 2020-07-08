let field;
let colors;

function place(f, ringSize, pole){
  let n = 0;
  let ans = 0;
  while(n < f[pole].length && f[pole][n] > ringSize) n++;
  if(n != f[pole].length) ans = f[pole][n];

  return ans;
}

function nextTurn(f, ringSize=maxSize, targetPole=2){
  let ans = [-1, -1];
  for(let pole = 0; pole < f.length; pole++){
    let finished = true;
    for(let ring = 0; ring < f[pole].length; ring++){
      if(f[pole][ring] == ringSize){
        if(pole != targetPole){
          let other = targetPole == (pole + 1) % f.length ? (pole + 2) % f.length : (pole + 1) % f.length;

          let p = place(f, ringSize, targetPole);
          if(p != 0 && (ring == f[pole].length - 1 || f[pole][ring + 1] < p)){
            //console.log("nextMove " + p + " to " + other);
            ans = nextTurn(f, p, other);
          }
          else if(ring < f[pole].length - 1){
            //console.log("nextMove " + f[pole][ring + 1] + " to " + other)
            ans = nextTurn(f, f[pole][ring + 1], other);
          }
          else if(ring == f[pole].length - 1){
            //console.log("nextMove " + f[pole][ring] + " to " + targetPole);
            ans = [pole, targetPole];
          }
        }
        else if(ringSize > 1) ans = nextTurn(f, ringSize - 1, targetPole); // ring is on top of the pole

        break;
      }
      else finished = false;

      if(finished) break;
    }
  }

  return ans;
}

function setup(){
  let canv = createCanvas(800, 500);
  canv.parent("canv");

  colors = [color('red'), color('blue'), color('yellow'), color('purple'), color('brown'), color('LimeGreen')];

  field = [[], [], []];

  for(let n = maxSize; n > 0; n--){
    field[0].push(n);
  }
  /*field[2] = [1];
  field[1] = [5, 3];
  field[0] = [6, 4, 2];*/
}

function draw(){
  if(frameCount % 20 == 0){
    let move = nextTurn(field);
    if(move[0] >= 0 && move[1] >= 0)
      field[move[1]].push(field[move[0]].pop());
  }

  background(0);

  noFill();
  stroke(255);

  rect(0, 0, width / 3, height);
  rect(width / 3, 0, width / 3, height);
  rect(width * 2 / 3, 0, width / 3, height);

  for(let pole = 0; pole < field.length; pole++){
    for(let r = 0; r < field[pole].length; r++){
      showRing(pole, r, field[pole][r], colors[(field[pole][r] - 1) % colors.length]);
    }
  }
}

$(document).ready(function(){
  $("#reset").click(function(){
    field = [[], [], []];

    for(let n = maxSize; n > 0; n--){
      field[0].push(n);
    }
  });

  $("#random").click(function(){
    field = [[], [], []];

    for(let n = maxSize; n > 0; n--){
      let index = Math.round(Math.random()*2.4);
      field[index].push(n);
    }
  });
});
