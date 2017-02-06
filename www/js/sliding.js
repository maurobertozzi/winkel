var pictures = ['http://i0.kym-cdn.com/photos/images/newsfeed/000/669/034/120.gif', 'https://media.giphy.com/media/X93eEahgIFlcc/giphy.gif', 'http://www.ipwatchdog.com/wp-content/uploads/2015/12/donald-trump-300-300x300.jpg', 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=139607809', 'http://www.hercampus.com/sites/default/files/styles/full_width_embed/public/2016/02/24/kanye-scowl-resting-bitch-face-300x300.jpg', 'http://cdn01.cdn.justjared.com/wp-content/uploads/headlines/2015/10/drake-hotline-bling-music-video.jpg', 'http://orig10.deviantart.net/8471/f/2014/239/3/7/profile_picture_by_the__clarinet__squid-d7wul0f.jpg', 'http://www.gloryofwar.com/forums/download/file.php?avatar=94_1463321500.gif', 'https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTIwNjA4NjMzOTU5NTgxMTk2/bob-ross-9464216-1-402.jpg' ];

var context = document.getElementById('puzzle').getContext('2d');
var random = Math.floor(Math.random() * pictures.length);
var img = new Image();
img.src = pictures[random];
console.log(pictures[random])
img.addEventListener('load', drawTiles, false);

var boardSize = document.getElementById('puzzle').width;
var tileCount = document.getElementById('scale').value;

var tileSize = boardSize / tileCount;

var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

var solved = false;

var boardParts;
setBoard();

document.getElementById('scale').onchange = function() {
  tileCount = this.value;
  tileSize = boardSize / tileCount;
  setBoard();
  drawTiles();
};

document.getElementById('puzzle').onclick = function(e) {
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
  if (solved) {
    setTimeout(function() {alert("je heb gewonnen!");}, 500);
  }
};

function setBoard() {
  boardParts = new Array(tileCount);
  for (var i = 0; i < tileCount; ++i) {
    boardParts[i] = new Array(tileCount);
    for (var j = 0; j < tileCount; ++j) {
      boardParts[i][j] = new Object;
      boardParts[i][j].x = (tileCount - 1) - i;
      boardParts[i][j].y = (tileCount - 1) - j;
    }
  }
  emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
  emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
  solved = false;
}

function drawTiles() {
  context.clearRect ( 0 , 0 , boardSize , boardSize );
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      var x = boardParts[i][j].x;
      var y = boardParts[i][j].y;
      if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
        context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
            i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }
  }
}

function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) {
  if (!solved) {
    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
    boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
    boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
    toLoc.x = fromLoc.x;
    toLoc.y = fromLoc.y;
    checkSolved();
  }
}

function checkSolved() {
  var flag = true;
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
        flag = false;
      }
    }
  }
  solved = flag;
}
