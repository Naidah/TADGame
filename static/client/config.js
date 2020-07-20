// declare global vars needed across the application
// variables used to communicate with server
let socket = io();
let tickRate = 1000/30;

// player id of this client instance
let pid = -1;

// setup for drawing to canvas
let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
let context = canvas.getContext('2d');