import colors from '../assets/boxColors.json';

const moves = {
	left: moveLeft,
	right: moveRight,
	up: moveUp,
	down: moveDown,
};

const size = 4;
const boxs = [];
const emptyCharacter = '';

let score = 0;
let board = '';
let scoreDisplay = '';

function insertBoard(container) {
	container.appendChild(createDisplay());
	container.appendChild(createBoard());
}

function createBoard() {
	board = createElement('div', ['grid']);
	for (let i = 0; i < Math.pow(size, 2); ++i) {
		const box = createElement('div', ['box'], emptyCharacter);
		board.appendChild(box);
		boxs.push(box);
	}
	randomState();
	changeColors();
	return board;
}

function createDisplay() {
	scoreDisplay = createElement('div', ['score']);
	return scoreDisplay;
}

function createElement(type, classList, textContent) {
	const element = document.createElement(type);
	element.classList.add(...classList);
	element.textContent = textContent;
	return element;
}

function randomState() {
	const initialBoxes = 2;
	for (let i = 0; i < initialBoxes; ++i) initialBox();
}

function initialBox() {
	const randomNumber = Math.floor(Math.random() * boxs.length);
	if (boxs[randomNumber].textContent === emptyCharacter) {
		boxs[randomNumber].textContent = 2;
		isGameOver();
	} else initialBox();
}

function changeColors() {
	for (let i = 0; i < boxs.length; ++i) {
		if (boxs[i].textContent === emptyCharacter)
			boxs[i].style.backgroundColor = colors['0'];
		else boxs[i].style.backgroundColor = colors[boxs[i].textContent];
	}
}

function moveLeft() {
	for (let i = 0; i < boxs.length; ++i) {
		if (i % 4 === 0) {
			const boxValue1 = boxs[i].textContent;
			const boxValue2 = boxs[i + 1].textContent;
			const boxValue3 = boxs[i + 2].textContent;
			const boxValue4 = boxs[i + 3].textContent;

			const row = [
				Number(boxValue1),
				Number(boxValue2),
				Number(boxValue3),
				Number(boxValue4),
			];

			const filteredRow = row.filter((value) => value);
			const missing = 4 - filteredRow.length;
			const emptyFillArray = Array(missing).fill(emptyCharacter);
			const newRow = filteredRow.concat(emptyFillArray);

			let pos = 0;
			for (let j = i; j < i + size; ++j) {
				boxs[j].textContent = newRow[pos];
				++pos;
			}
		}
	}
}

function moveRight() {
	for (let i = 0; i < boxs.length; ++i) {
		if (i % 4 === 0) {
			const boxValue1 = boxs[i].textContent;
			const boxValue2 = boxs[i + 1].textContent;
			const boxValue3 = boxs[i + 2].textContent;
			const boxValue4 = boxs[i + 3].textContent;

			const row = [
				Number(boxValue1),
				Number(boxValue2),
				Number(boxValue3),
				Number(boxValue4),
			];

			const filteredRow = row.filter((value) => value);
			const missing = 4 - filteredRow.length;
			const emptyFillArray = Array(missing).fill(emptyCharacter);
			const newRow = emptyFillArray.concat(filteredRow);

			let pos = 0;
			for (let j = i; j < i + size; ++j) {
				boxs[j].textContent = newRow[pos];
				++pos;
			}
		}
	}
}

function moveDown() {
	for (let i = 0; i < size; ++i) {
		const boxValue1 = boxs[i].textContent;
		const boxValue2 = boxs[i + size].textContent;
		const boxValue3 = boxs[i + size * 2].textContent;
		const boxValue4 = boxs[i + size * 3].textContent;

		const column = [
			Number(boxValue1),
			Number(boxValue2),
			Number(boxValue3),
			Number(boxValue4),
		];

		const filteredColumn = column.filter((num) => num);
		const missing = 4 - filteredColumn.length;
		const emptyFillArray = Array(missing).fill(emptyCharacter);
		const newColumn = emptyFillArray.concat(filteredColumn);

		let pos = 0;
		for (let j = i; j < i + Math.pow(size, 2); j = i + size * pos) {
			boxs[j].textContent = newColumn[pos];
			++pos;
		}
	}
}

function moveUp() {
	for (let i = 0; i < size; ++i) {
		const boxValue1 = boxs[i].textContent;
		const boxValue2 = boxs[i + size].textContent;
		const boxValue3 = boxs[i + size * 2].textContent;
		const boxValue4 = boxs[i + size * 3].textContent;

		const column = [
			Number(boxValue1),
			Number(boxValue2),
			Number(boxValue3),
			Number(boxValue4),
		];

		const filteredColumn = column.filter((num) => num);
		const missing = 4 - filteredColumn.length;
		const emptyFillArray = Array(missing).fill(emptyCharacter);
		const newColumn = filteredColumn.concat(emptyFillArray);

		let pos = 0;
		for (let j = i; j < i + Math.pow(size, 2); j = i + size * pos) {
			boxs[j].textContent = newColumn[pos];
			++pos;
		}
	}
}

function combineRow() {
	for (let i = 0; i < boxs.length - 1; ++i) {
		if (boxs[i].textContent === boxs[i + 1].textContent) {
			const combinedTotal =
				Number(boxs[i].textContent) + Number(boxs[i + 1].textContent);
			boxs[i].textContent = combinedTotal;
			boxs[i + 1].textContent = emptyCharacter;

			score += combinedTotal;
			scoreDisplay.textContent = score;
		}
	}
	isWinner();
}

function combineColumn() {
	for (let i = 0; i < boxs.length - size; ++i) {
		if (boxs[i].textContent === boxs[i + size].textContent) {
			const combinedTotal =
				Number(boxs[i].textContent) +
				Number(boxs[i + size].textContent);
			boxs[i].textContent = combinedTotal;
			boxs[i + size].textContent = emptyCharacter;

			score += combinedTotal;
			scoreDisplay.textContent = score;
		}
	}
	isWinner();
}

function checkCombinations() {
	for (let i = 0; i < 12; ++i) {
		if (boxs[i].textContent === boxs[i + size].textContent) {
			return true;
		}
	}
	for (let j = 0; j < 15; ++j) {
		if (boxs[j].textContent === boxs[j + 1].textContent) {
			return true;
		}
	}
	return false;
}

function move(typeMove) {
	typeMove();
	if (typeMove === moves.left || typeMove === moves.right) combineRow();
	else combineColumn();
	typeMove();

	if (!isFull()) initialBox();

	changeColors();
}

function keyActions(event) {
	switch (event.keyCode) {
		case 39:
			move(moves.right);
			break;
		case 37:
			move(moves.left);
			break;
		case 38:
			move(moves.up);
			break;
		case 40:
			move(moves.down);
			break;
	}
}

function isWinner() {
	for (let i = 0; i < boxs.length; ++i) {
		if (boxs[i].textContent === '2048') {
			winner();
		}
	}
}

function isGameOver() {
	if (isFull() && !checkCombinations()) {
		gameOver();
	}
}

function winner() {
	scoreDisplay.textContent = 'WINNER!';
	document.removeEventListener('keyup', keyActions);
}

function gameOver() {
	scoreDisplay.textContent = 'GAME OVER!';
	document.removeEventListener('keyup', keyActions);
}

function isFull() {
	let empty = 0;
	for (let i = 0; i < boxs.length; ++i)
		if (boxs[i].textContent === emptyCharacter) ++empty;

	if (empty === 0) return true;

	return false;
}

function start(container) {
	insertBoard(container);
	document.addEventListener('keyup', keyActions);
}

start(document.querySelector('.container'));
