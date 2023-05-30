let points = ["50,300"];
let data = [167.5, 100, 80, 160, 100, 100, 150, 200, 300];

let scale = 100;
for (let i = 0; i < data.length; i++) {
  couple = scale + "," + data[i];
  points.push(couple);
  scale = scale + 50;
}

let str = "";

for (let i = 0; i < points.length; i++) {
  console.log(points[i]);
  str = str + points[i] + " ";
}

console.log(str);
