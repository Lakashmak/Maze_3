const pictureBox1 = document.getElementById('pictureBox1');
const label1 = document.getElementById('label1'); label1.style.left = "10px"; label1.style.top = "0px"; label1.style.color = 'blue';
const label2 = document.getElementById('label2'); label2.style.left = "10px"; label2.style.top = "64px";
const label3 = document.getElementById('label3'); label3.style.left = "100px"; label3.style.top = "100px";
const label4 = document.getElementById('label4'); label4.style.left = "117px"; label4.style.top = "0px"; label4.style.color = 'lime';
const menu = document.getElementById('menu');
const label5 = document.getElementById('label5');
const label6 = document.getElementById('label6');
const textBox1 = document.getElementById('textBox1');
const textBox2 = document.getElementById('textBox2');
const bitmap = document.createElement('canvas');
const comboBox1 = document.getElementById('comboBox1');

document.addEventListener('keydown', (e) => {this.KeyDown(e);});
window.addEventListener('resize', resizeCanvas); //reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee4ssssssssssssssssssssssssssssssjnhhhhhhhhhhhhhhhhhhhhhhhhhhbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
pictureBox1.addEventListener('wheel', (e) => {this.MouseWheel(e);});
pictureBox1.addEventListener('mousedown', (e) => {this.pictureBox1_MouseDown(e);});
// pictureBox1.addEventListener('mousemove', (e) => {this.pictureBox1_MouseMove(e);});
// pictureBox1.addEventListener('mouseup', (e) => {this.pictureBox1_MouseUp(e);});
// pictureBox1.addEventListener('mouseleave', (e) => {this.pictureBox1_MouseUp(e);});
pictureBox1.addEventListener('touchstart', (e) => {this.pictureBox1_TouchDown(e);});
pictureBox1.addEventListener('touchmove', (e) => {this.pictureBox1_TouchMove(e);});
// pictureBox1.addEventListener('touchend', (e) => {this.pictureBox1_MouseUp(e);});
label2.addEventListener('click', label2_Click);
label5.addEventListener('click', label5_Click);
label6.addEventListener('click', label6_Click);

var k = 51; // масштаб
var x = 1, y = 8; // кординаты игрока
var k2 = 64; // разрешение стены в слое
var bal = 0; // баллы
var win = false; // событие победы
var winTime = -2; // время выплывания надписи победы
var winEnd = false;
var dead = false; // событие проигрыша
var deadTime = -2; // время выплывания надписи проигрыша
var adead = false; // событие покушац
var adeadTime = -2; // время выплывания надписи покушац
var sizeX = 100; // ширина лаберинта
var sizeY = 100; // высота лаберинта
var Lx = 0, Ly = 0, Lx2 = 0, Ly2 = 0; // первичные координаты нажатий
var dx = 0, dy = 0, dx2 = 0, dy2 = 0; // вторичные координаты нажатий
var TouchWheel = false; // масштабирование
var color_bg = 'rgb(0, 0, 0)';
var color_wall = 'rgb(127, 127, 127)';
var lab = [ // матрица с первичным лабиринтом
    [ 1,1,1,1,1,1,1,1,1,0,1 ],
    [ 1,1,0,1,0,0,0,1,0,0,1 ],
    [ 1,0,0,1,0,1,0,0,0,1,0 ],
    [ 1,0,1,1,0,1,1,1,0,1,1 ],
    [ 1,0,0,1,0,0,0,1,0,1,0 ],
    [ 1,1,0,0,0,1,0,0,0,1,0 ],
    [ 1,1,0,1,0,0,0,0,1,1,0 ],
    [ 1,0,0,1,0,1,1,0,0,1,0 ],
    [ 1,0,1,0,0,1,0,0,1,1,0 ],
    [ 1,1,1,1,1,1,1,1,1,1,1 ]
]
var walls = [];
for(let i = 0; i < lab.length; i++) for(let j = 0; j < lab[i].length; j++) if (lab[i][j] == 1) walls.push([j, i]);
// while(sizeY < 100) walls.push([]);
// for(let i = 0; i < 100; i++) while(walls[i].length < 100) walls[i].push(0);

var pointers = [ //кординаты мобов
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100],
    [-100,-100]
];


DrawWalls();
resizeCanvas();
gr = pictureBox1.getContext('2d');
gr.fillStyle = color_bg;
gr.fillRect(0, 0, pictureBox1.width, pictureBox1.height); //gr.clearRect(0, 0, 930, 900);
gr2 = bitmap.getContext('2d');
setInterval(timer1_Tick, 64); //setInterval(timer2_Tick, timer2Interval);
Draw();
label3.textContent = "";
label3.style.zIndex = 0;

function resizeCanvas() {
    pictureBox1.width = window.innerWidth; //pictureBox1.width = this.width - 16;
    pictureBox1.height = window.innerHeight; //pictureBox1.height = this.height - 39;
	menu.style.height = window.innerHeight - 10 + "px";
    gr = pictureBox1.getContext('2d');
	label3.style.left = `${Math.round(pictureBox1.offsetWidth / 2 - label3.clientWidth / 2)}px`;
	label3.style.top = `${Math.round(pictureBox1.offsetHeight / 2 - label3.clientHeight / 2)}px`;
	Draw();
}

function MouseWheel(e) {
    if (e.deltaY < 0) k *= 1.35; //if (e.Delta > 0) k = Convert.ToInt32((k - 0.5) * 1.35 + 0.5);
    else k /= 1.35; //else k = Convert.ToInt32((k - 0.5) / 1.35 + 0.5);
	Draw();
}

function pictureBox1_TouchDown(e) {
    const rect = e.target.getBoundingClientRect();
    Lx = e.touches[0].clientX - rect.left; 
    Ly = e.touches[0].clientY - rect.top;

	if(e.touches.length > 1) {
        TouchWheel = true;
        Lx2 = e.touches[1].clientX - rect.left; 
        Ly2 = e.touches[1].clientY - rect.top;
    }
    else TouchWheel = false;
}

function pictureBox1_TouchMove(e) {
	const rect = e.target.getBoundingClientRect();
	dx = e.touches[0].clientX - rect.left; 
	dy = e.touches[0].clientY - rect.top;
	if(TouchWheel) {
		dx2 = e.touches[1].clientX - rect.left; 
		dy2 = e.touches[1].clientY - rect.top;
		k /= Math.sqrt((Lx - Lx2)*(Lx - Lx2) + (Ly - Ly2)*(Ly - Ly2)) / Math.sqrt((dx - dx2)*(dx - dx2) + (dy - dy2)*(dy - dy2));
		Lx2 = dx2;
		Ly2 = dy2;
	}
	Lx = dx;
	Ly = dy;
	Draw();
}

// function pictureBox1_MouseUp(e) {}
// function pictureBox1_MouseMove(e) {}

function timer1_Tick() {
    if (win && winTime < -1) {
		winTime = 15;
		label3.style.color = "lime"; 
		label3.textContent = "Поздровляю вы выбрались!";
		label3.style.zIndex = 1;
		bal += 10;
		label4.textContent = bal + " очков";
		if (bal > 0)label4.style.color = 'lime';
		if (bal == 0)label4.style.color = 'blue';
		if (bal < 0)label4.style.color = 'red';
	}
	if (winTime >= 0) winTime--;
	if (winTime == 0) {
		label3.textContent = "";
		label3.style.zIndex = 0;
	}
	if (!win && winTime >= -1) winTime--;
	if (!win) winTime = -2;

	if (dead && deadTime < -1) {
		deadTime = 30;
		label3.style.color = 'rgb(125, 0, 0)';
		label3.textContent = "Вы погибли!";
		label3.style.zIndex = 1;
		bal -= 2;
		label4.textContent = bal + " очков";
		if (bal > 0)label4.style.color = 'lime';
		if (bal == 0)label4.style.color = 'blue';
		if (bal < 0)label4.style.color = 'red';
	}
	if (deadTime >= 0) deadTime--;
	if (deadTime == 0) {
		label3.textContent = "";
		label3.style.zIndex = 0;
		Add();
	}
	if (!dead && deadTime >= -1) deadTime--;
	if (!dead) deadTime = -2;

	if (adead && adeadTime < -1) {
		adeadTime = 10;
		label3.style.color = 'lime';
		label3.textContent = "+1";
		label3.style.zIndex = 1;
		bal += 1;
		label4.textContent = bal + " очков";
		if (bal > 0)label4.style.color = 'lime';
		if (bal == 0)label4.style.color = 'blue';
		if (bal < 0)label4.style.color = 'red';
	}
	if (adeadTime >= 0) adeadTime--;
	if (adeadTime == 0) {
		label3.textContent = "";
		label3.style.zIndex = 0;
		adead = false;
	}
	if (!adead && adeadTime >= -1) adeadTime--;
	if (!adead) adeadTime = -2;

	if (deadTime < 0) Move();
	Draw();
	if (deadTime >= 0) {
        gr.fillStyle = 'rgba(255, 0, 0, 63)';
		gr.fillRect(0, 0, pictureBox1.width, pictureBox1.height);
	}
}

//function timer2_Tick() {}

function Draw() { // отрисовка
	gr.fillStyle = color_bg; // цвет фона
	gr.fillRect(0, 0, pictureBox1.width, pictureBox1.height); // очистка экрана
	gr.drawImage(bitmap, 0, 0, k2*bitmap.width, k2*bitmap.height, pictureBox1.width/2 - k/2 - k*x, pictureBox1.height/2 - k/2 - k*y, k*bitmap.width, k*bitmap.height);

	gr.fillStyle = 'rgb(255, 255, 255)'; // цвет игрока
	if (deadTime < 0) { gr.beginPath(); gr.ellipse(pictureBox1.width / 2, pictureBox1.height / 2, k/2, k/2, 0, 0, 2*Math.PI); gr.fill(); } // отрисовка игрока
	label1.textContent = 'Кординаты\nx: ' + x + '\ny: ' + y; // текст с кординатами // + '\nk: ' + k
	for (let i = 0; i < 15; i++) { // отрисовка мобов
		if (i == 0) gr.fillStyle = 'rgb(255, 0, 0)'; // цвет враждебных
		if (i == 5) gr.fillStyle = 'rgb(255, 255, 0)'; // нейтральных
		if (i == 10) gr.fillStyle = 'rgb(0, 255, 0)'; // мирных
		gr.beginPath(); gr.ellipse(pointers[i][0] * k - x * k + pictureBox1.width / 2, pointers[i][1] * k - y * k + pictureBox1.height / 2, k/2, k/2, 0, 0, 2*Math.PI); gr.fill();// отрисовка моба
	}
	//pictureBox1.Image = bitmap; // обновление кадра
}

function DrawWalls() {
	bitmap.width = sizeX * k2; bitmap.height = sizeY * k2; //bitmap.style.width = sizeX * k2 + 'px'; bitmap.style.height = sizeY * k2 + 'px';
	gr2 = bitmap.getContext('2d');
	color_bg = `rgb(${0}, ${0}, ${0})`;
	color_wall = `rgb(${127}, ${127}, ${127})`;
	gr2.fillStyle = color_bg; // цвет фона
	gr2.fillRect(0, 0, pictureBox1.width, pictureBox1.height); // очистка экрана
	for(let i = 0; i < walls.length; i++) { // диагональное сглаживание
		wall = walls[i];
		for(let j = 0; j < walls.length; j++) {
			wall1 = walls[j];
			if(wall1[0] - wall[0] == 1 && wall1[1] - wall[1] == 1) {
				gr2.fillStyle = color_wall; // цвет стены
				gr2.fillRect(wall[0] * k2 + k2 / 2, wall[1] * k2 + k2 / 2, k2, k2); // соединение
				gr2.fillStyle = color_bg; // цвет фона
				gr2.beginPath(); gr2.ellipse(wall[0] * k2 + k2 + k2/2, wall[1] * k2 + k2/2, k2/2, k2/2, 0, 0, 2*Math.PI); gr2.fill();// сглаживание
				gr2.beginPath(); gr2.ellipse(wall[0] * k2 + k2/2, wall[1] * k2 + k2 + k2/2, k2/2, k2/2, 0, 0, 2*Math.PI); gr2.fill();// сглаживание
			} 
			if(wall1[0] - wall[0] == -1 && wall1[1] - wall[1] == 1) {
				gr2.fillStyle = color_wall; // цвет стены
				gr2.fillRect(wall[0] * k2 - k2 / 2, wall[1] * k2 + k2 / 2, k2, k2); // соединение
				gr2.fillStyle = color_bg; // цвет фона
				gr2.beginPath(); gr2.ellipse(wall[0] * k2 - k2 + k2/2, wall[1] * k2 + k2/2, k2/2, k2/2, 0, 0, 2*Math.PI); gr2.fill(); // сглаживание
				gr2.beginPath(); gr2.ellipse(wall[0] * k2 + k2/2, wall[1] * k2 + k2 + k2/2, k2/2, k2/2, 0, 0, 2*Math.PI); gr2.fill();// сглаживание
			}
		}
	}
	// for (let i = 0; i < sizeY; i++) for (let j = 0; j < sizeX; j++) { // диагональное сглаживание
	// 	gr.fillStyle = 'rgb(127, 127, 127)'; // цвет стены
	// 	if (i != sizeY - 1 && j != sizeX - 1 && walls.includes([j, i]) && walls.includes([j + 1, i + 1])) { // поиск диагональных стен
	// 		gr.fillRect(j * k + k / 2 - x * k + pictureBox1.width / 2 - k / 2, i * k + k / 2 - y * k + pictureBox1.height / 2 - k / 2, k, k); // соединение
	// 		gr.fillStyle = 'rgb(0, 0, 0)'; // цвет фона
	// 		gr.beginPath(); gr.ellipse(j * k + k - x * k + pictureBox1.width / 2, i * k - y * k + pictureBox1.height / 2, k/2, k/2, 0, 0, 2*Math.PI); gr.fill();// сглаживание
	// 		gr.beginPath(); gr.ellipse(j * k - x * k + pictureBox1.width / 2, i * k + k - y * k + pictureBox1.height / 2, k/2, k/2, 0, 0, 2*Math.PI); gr.fill();// сглаживание
	// 		gr.fillStyle = 'rgb(127, 127, 127)'; // цвет стены
	// 	}
	// 	if (i != sizeY - 1 && j != 0 && walls.includes([j, i]) && walls.includes([j - 1, i + 1])) { // поиск диагональных стен
	// 		gr.fillRect(j * k - k / 2 - x * k + pictureBox1.width / 2 - k / 2, i * k + k / 2 - y * k + pictureBox1.height / 2 - k / 2, k, k); // соединение
	// 		gr.fillStyle = 'rgb(0, 0, 0)'; // цвет фона
	// 		gr.beginPath(); gr.ellipse(j * k - k - x * k + pictureBox1.width / 2, i * k - y * k + pictureBox1.height / 2, k/2, k/2, 0, 0, 2*Math.PI); gr.fill(); // сглаживание
	// 		gr.beginPath(); gr.ellipse(j * k - x * k + pictureBox1.width / 2, i * k + k - y * k + pictureBox1.height / 2, k/2, k/2, 0, 0, 2*Math.PI); gr.fill();// сглаживание
	// 		gr.fillStyle = 'rgb(127, 127, 127)'; // цвет стены
	// 	}
	// }
	for(let i = 0; i < walls.length; i++) { // поперечное сглаживание
		wall = walls[i];
		gr2.fillStyle = color_wall; // цвет стены
		gr2.beginPath(); gr2.ellipse(wall[0] * k2 + k2/2, wall[1] * k2 + k2/2, k2/2, k2/2, 0, 0, 2*Math.PI); gr2.fill(); // круг
		for(let j = 0; j < walls.length; j++) {
			wall1 = walls[j];
			if(wall1[0] == wall[0] && wall1[1] - wall[1] == 1) {
				gr2.fillStyle = color_wall; // цвет стены
				gr2.fillRect(wall[0] * k2, wall[1] * k2 + k2 / 2, k2, k2); // соединение по высоте
			}
			if(wall1[0] - wall[0] == 1 && wall1[1] == wall[1]) {
				gr2.fillStyle = color_wall; // цвет стены
				gr2.fillRect(wall[0] * k2 + k2 / 2, wall[1] * k2, k2, k2); // соединение по ширине
			}
		}
	}
	// for (let i = 0; i < sizeY; i++) for (let j = 0; j < sizeX; j++) { // поперечное сглаживание
	// 	if (walls.includes([j, i])) { gr.beginPath(); gr.ellipse(j * k - x * k + pictureBox1.width / 2, i * k - y * k + pictureBox1.height / 2, k/2, k/2, 0, 0, 2*Math.PI); gr.fill(); } // круг
	// 	if (i != sizeY - 1 && walls.includes([j, i]) == 1 && walls.includes([j, i + 1])) gr.fillRect(j * k - x * k + pictureBox1.width / 2 - k / 2, i * k + k / 2 - y * k + pictureBox1.height / 2 - k / 2, k, k); // соединение по высоте
	// 	if (j != sizeX - 1 && walls.includes([j, i]) == 1 && walls.includes([j + 1, i])) gr.fillRect(j * k + k / 2 - x * k + pictureBox1.width / 2 - k / 2, i * k - y * k + pictureBox1.height / 2 - k / 2, k, k); // соединение по ширине
	// }
}

function pictureBox1_MouseDown(e) {
    var direction = "";
    const rect = e.target.getBoundingClientRect();
    Lx = e.clientX - rect.left; 
    Ly = e.clientY - rect.top;
	// label2.textContent = "x: " + Lx / pictureBox1.width + " y: " + Ly / pictureBox1.height;
    if (Math.abs(Lx - pictureBox1.width / 2) / pictureBox1.width > Math.abs(Ly - pictureBox1.height / 2) / pictureBox1.height) {
        if(Lx > pictureBox1.width / 2) direction = "right";
        else direction = "left";
    } else {
        if (Ly > pictureBox1.height / 2) direction = "down";
        else direction = "up";
    }
    step(direction);
}

function KeyDown(e) { 
    var direction = "";
	if (e.key == 'w' ||e.key == 'W' ||e.key == 'ц' ||e.key == 'Ц' || e.key == 'ArrowUp' || e.key == 'Numpad8') direction = "up";
    if (e.key == 'a' ||e.key == 'A' ||e.key == 'ф' ||e.key == 'Ф' || e.key == 'ArrowLeft' || e.key == 'Numpad4') direction = "left";
    if (e.key == 's' ||e.key == 'S' ||e.key == 'ы' ||e.key == 'Ы' || e.key == 'ArrowDown' || e.key == 'Numpad6') direction = "down";
    if (e.key == 'd' ||e.key == 'D' ||e.key == 'в' ||e.key == 'В' || e.key == 'ArrowRight' || e.key == 'Numpad2') direction = "right";
    step(direction);
}

function step(direction) { // передвижение игрока
    if (deadTime < 0) {
		target = [x, y]; if (direction == "up") target[1]--; if (direction == "left") target[0]--; if (direction == "down") target[1]++; if (direction == "right") target[0]++;
		poss = true;
		for(let i = 0; i < walls.length; i++) { // диагональное сглаживание
			wall = walls[i];
			if(target[0] == wall[0] && target[1] == wall[1]) poss = false;
		}
		if(poss) {x = target[0]; y = target[1];}
		// if (direction == "up" && (y - 1 < 0 || y - 1 >= sizeY || x < 0 || x >= sizeX)) y--; //перемещение с проверкой на стены
		// else if (direction == "up" && !walls.includes([x, y - 1])) y--;
		// if (direction == "left" && (x - 1 < 0 || x - 1 >= sizeX || y < 0 || y >= sizeY)) x--;
		// else if (direction == "left" && !walls.includes([x - 1, y])) x--;
		// if (direction == "down" && (y + 1 < 0 || y + 1 >= sizeY || x < 0 || x >= sizeX)) y++;
		// else if (direction == "down" && !walls.includes([x, y + 1])) y++;
		// if (direction == "right" && (x + 1 < 0 || x + 1 >= sizeX || y < 0 || y >= sizeY)) x++;
		// else if (direction == "right" && !walls.includes([x + 1, y])) x++;
	}
	if (x >= sizeX || x < 0 || y >= sizeY || y < 0) { // выход из лабиринта
		if (!winEnd) {
			win = true;
			winEnd = true;
		}
	}
	else win = false;  // вход в лабиринт
	for (let i = 0; i < 5; i++) if (pointers[i][0] == x && pointers[i][1] == y) dead = true;; // столкновение с врагом
	for (let i = 10; i < 15; i++) if (pointers[i][0] == x && pointers[i][1] == y) { // столкновение с мирным
		adead = true;
		do {
			pointers[i][0] = Math.floor(Math.random() * (1 + sizeX - 0) + 0);
			pointers[i][1] = Math.floor(Math.random() * (1 + sizeY - 0) + 0);
			poss = true;
			for(let ii = 0; ii < walls.length; ii++) { // диагональное сглаживание
				wall = walls[ii];
				if(pointers[i][0] == wall[0] && pointers[i][1] == wall[1]) poss = false;
			}
		} while (!poss);
	}
	Draw();
}

function Move() {// передвижение мобов
	for (let n = 0; n < 15; n++) {
		if (Math.floor(Math.random() * (1 + 2 - 0) + 0) == 0) {
			let v = Math.floor(Math.random() * (1 + 5 - 1) + 1);
			target = [pointers[n][0], pointers[n][1]]; if (v == 1) target[1]--; if (v == 2) target[0]--; if (v == 3) target[1]++; if (v == 4) target[0]++;
			poss = true;
			for(let i = 0; i < walls.length; i++) { // диагональное сглаживание
				wall = walls[i];
				if(target[0] == wall[0] && target[1] == wall[1]) poss = false;
			}
			if(poss) {pointers[n][0] = target[0]; pointers[n][1] = target[1];}
			// switch (v) {
			// case 1:
			// 	if (pointers[n][1] - 1 < 0 || pointers[n][1] - 1 >= sizeY || pointers[n][0] < 0 || pointers[n][0] >= sizeX) pointers[n][1]--;
			// 	else if (walls[pointers[n][1] - 1][pointers[n][0]] != 1) pointers[n][1]--;
			// 	break;
			// case 2:
			// 	if (pointers[n][0] - 1 < 0 || pointers[n][0] - 1 >= sizeY || pointers[n][1] < 0 || pointers[n][1] >= sizeX) pointers[n][0]--;
			// 	else if (walls[pointers[n][1]][pointers[n][0] - 1] != 1) pointers[n][0]--;
			// 	break;
			// case 3:
			// 	if (pointers[n][1] + 1 < 0 || pointers[n][1] + 1 >= sizeY || pointers[n][0] < 0 || pointers[n][0] >= sizeX) pointers[n][1]++;
			// 	else if (walls[pointers[n][1] + 1][pointers[n][0]] != 1) pointers[n][1]++;
			// 	break;
			// case 4:
			// 	if (pointers[n][0] + 1 < 0 || pointers[n][0] + 1 >= sizeY || pointers[n][1] < 0 || pointers[n][1] >= sizeX) pointers[n][0]++;
			// 	else if (walls[pointers[n][1]][pointers[n][0] + 1] != 1) pointers[n][0]++;
			// 	break;
			// default:
			// 	break;
			// }
			for (let i = 0; i < 5; i++) if (pointers[i][0] == x && pointers[i][1] == y) dead = true;; // столкновение с врагом
			for (let i = 10; i < 15; i++) if (pointers[i][0] == x && pointers[i][1] == y) { // столкновение с мирным
				adead = true;
				do {
					pointers[i][0] = Math.floor(Math.random() * (1 + sizeX - 0) + 0);
					pointers[i][1] = Math.floor(Math.random() * (1 + sizeY - 0) + 0);
					poss = true;
					for(let ii = 0; ii < walls.length; ii++) { // диагональное сглаживание
						wall = walls[ii];
						if(pointers[i][0] == wall[0] && pointers[i][1] == wall[1]) poss = false;
					}
				} while (!poss);
			}
			for (let i = 5; i < 10; i++) for (let j = 10; j < 15; j++) if (pointers[i][0] == pointers[j][0] && pointers[i][1] == pointers[j][1]) { // столкновение нейтрального с мирным
				do {
					pointers[j][0] = Math.floor(Math.random() * (1 + sizeX - 0) + 0);
					pointers[j][1] = Math.floor(Math.random() * (1 + sizeY - 0) + 0);
					poss = true;
					for(let ii = 0; ii < walls.length; ii++) { // диагональное сглаживание
						wall = walls[ii];
						if(pointers[j][0] == wall[0] && pointers[j][1] == wall[1]) poss = false;
					}
				} while (!poss);
			}
		}
	}
}

function Add() {
	sizeX = Math.round(textBox1.value);
	sizeY = Math.round(textBox2.value);
	x = Math.round(sizeX / 2);
	y = Math.round(sizeY / 2);
	walls = [];
	if(comboBox1.value == 3) {
		for (let i = 0; i < sizeY; i++) for (let j = 0; j < sizeX; j++) {
			if (i != 0 && i != sizeY - 1 && j != 0 && j != sizeX - 1) {
				let a = Math.floor(Math.random() * (1 + 11 - 0) + 0);
				if (a >= 7 && Math.sqrt(Math.pow(x - j, 2) + Math.pow(y - i, 2)) > 2) walls.push([j, i]);
			} else {
				let a = Math.floor(Math.random() * (1 + 51 - 0) + 0);
				if (a >= 1) walls.push([j, i]);
			}
		}
		for (let i = 0; i < 15; i++) { // респавн мобов
			do {
				pointers[i][0] = Math.floor(Math.random() * (1 + sizeX - 0) + 0);
				pointers[i][1] = Math.floor(Math.random() * (1 + sizeY - 0) + 0);
				poss = true;
				for(let ii = 0; ii < walls.length; ii++) { // диагональное сглаживание
					wall = walls[ii];
					if(pointers[i][0] == wall[0] && pointers[i][1] == wall[1]) poss = false;
				}
			} while (!poss);
		}
	}
	win = false;
	winTime = -2;
	winEnd = false;
	dead = false;
	deadTime = -2;
	adead = false;
	adeadTime = -2;
	label3.textContent = "";
	label3.style.zIndex = 0;
	DrawWalls();
	Draw();
}

function label2_Click() { 
	menu.style.transform = 'translateX(220px)';
}

function label5_Click() { 
	menu.style.transform = 'translateX(-220px)';
}

function label6_Click() { // генерация лаберинта
	Add();
}