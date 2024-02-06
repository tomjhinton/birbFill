
const order = 5;
let N;
let total;

let path = [];

let counter = 0;

function setup() {
  createCanvas(512, 512);
  background(0);

  N = int(pow(2, order));
  total = N * N;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    let len = width / N;
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }
}

function draw() {
  background(0);

  stroke(255);
  
  noFill();
	if(counter < path.length ){
  for (let i = 1; i < counter; i++) {
		strokeWeight(i*.01);
    stroke(path[i].x, path[i].y, 255);
    line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
  }
	}
  //endShape();

  counter += 1;
  if (counter >= path.length) {
    counter = 0;
  }

 
}


function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 2),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0)
  ];

  let v = points[i % 4]; // Use modulus operator to get the remainder of i divided by 4

  for (let j = 1; j < order; j++) {
    i = Math.floor(i / 4); // Use division operator to get the quotient of i divided by 4
    let index = i % 4; // Use modulus operator to get the remainder of the new i divided by 4
    let len = pow(2, j);
    if (index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      let temp = len - Math.random() - v.x;
      v.x = len - Math.random() - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  return v;
}