"use strict";

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const imageUrl = "./assets/profile_flower.png";
const image = new Image();
let isImageLoaded = false;
let imageCropData = {
	sx: 0,
	sy: 0,
	sWidth: 0,
	sHeight: 0
};

let square = {
	x: 40,
	y: 40,
	width: 120,
	height: 120,

};

let isDragging = false;
let dragOffsetX, dragOffsetY;

image.onload = () => {
	isImageLoaded = true;

	const minDim = Math.min(image.width, image.height);

	const biggerImgOffset = minDim * (1 - Math.SQRT1_2);

	imageCropData.sx = biggerImgOffset / 2;
	imageCropData.sy = biggerImgOffset / 2;

	imageCropData.sWidth = minDim - biggerImgOffset;
	imageCropData.sHeight = minDim - biggerImgOffset;



	drawSquare();
};

image.onerror = () => {
	console.error("Failed to load image at URL:", imageUrl);

	drawSquare();
};

image.src = imageUrl;

function drawSquare() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (isImageLoaded) {

		ctx.drawImage(
			image,
			imageCropData.sx,
			imageCropData.sy,
			imageCropData.sWidth,
			imageCropData.sHeight,
			square.x,
			square.y,
			square.width,
			square.height
		);
	} else {

		ctx.fillStyle = 'lightgray';
		ctx.fillRect(square.x, square.y, square.width, square.height);
		ctx.fillStyle = 'black';
		ctx.font = '12px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('Loading...', square.x + square.width / 2, square.y + square.height / 2);
	}
}

function handleMouseDown(e) {

	if (e.offsetX > square.x && e.offsetX < square.x + square.width &&
		e.offsetY > square.y && e.offsetY < square.y + square.height) {
		isDragging = true;
		dragOffsetX = e.offsetX - square.x;
		dragOffsetY = e.offsetY - square.y;
	}
}

function handleMouseMove(e) {
	if (isDragging) {
		square.x = e.offsetX - dragOffsetX;
		square.y = e.offsetY - dragOffsetY;


		if (square.x + square.width > canvas.width) {
			square.x = canvas.width - square.width;
		}
		if (square.y + square.height > canvas.height) {
			square.y = canvas.height - square.height;
		}
		if (square.x < 0) {
			square.x = 0;
		}
		if (square.y < 0) {
			square.y = 0;
		}
		drawSquare();
	}
}

function handleMouseUp() {
	isDragging = false;
}

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);

drawSquare();