var ctx, canvas;
var counter = 0;
var zoom = 60;
var boardsize = [10, 3];
var board = new Array();
var col_finish = 'rgb(150, 219 ,113)';
var col_player = 'rgb(255, 255, 255)';
var col_rock = 'rgb(122, 122, 122)';
var col_up = 'rgb(255, 149, 93)';
var col_up2 = 'rgb(254, 243, 119)';
var col_down = 'rgb(164, 121, 254)';
var col_down2 = 'rgb(0, 153, 255)';
var col_blink1 = 'rgb(97, 251, 255)';
var col_blink2 = 'rgb(255, 102, 174)';
var col_block = 'rgb(204, 0, 0)';
var col_switch = 'rgb(0, 168, 92)';
var col_black = 'rgb(0, 0, 0)';
var timeout = 3;
var animation_steps = 16;
var animen_gl = true;
var startatlevel = 1;
var onoff_gl = true;
var fade_gl = 1;
var fade_steps_gl = 3;
var fade_speed_gl = 30;
var a_move = null;
var a_fail = null;
var a_win = null;

function updateStage() {
	if (!checkpermittet()) return;
	a_move.pause();
	a_move.play();
	calcnext();
	drawall(true);
}

function drawall(animen) {
	if (canvas == undefined) return;
	canvas.width = canvas.width;
	drawbackground();
	if (!animen || !animen_gl) {
		for (var i in board) {
			board[i].draw(0);
			board[i].lastx = board[i].x;
			board[i].lasty = board[i].y;
		}
		checkloseorwin();
		blur(canvas);
	} else {
		anim(animation_steps);
	}
}
var inanim = false;
var animstep = 0;
var animsteps = 1;
function anim(steps) {
	canvas.width = canvas.width;
	drawbackground();
	animsteps = steps;
	inanim = true;
	animstep++;
	for (var i in board) {
		board[i].draw(animstep);
	}
	if (animstep < steps) {
		setTimeout("anim(" + steps + ");", timeout);
	} else {
		animstep = 0;
		inanim = false;
		for (var i in board) {
			board[i].lastx = board[i].x;
			board[i].lasty = board[i].y;
		}
		drawall(false);
	}
}
function calcnext() {
	getElement(0).nextPos();
	for (var i in board) {
		if (board[i].id == 0) continue;
		board[i].nextPos();
	}
	doremove();
}
function doremove() {
	for (var i = 0; i < board.length; i++) {
		if (board[i].markdel) {
			board.splice(i, 1);
			i = i - 1;
		}
	}
}

function checkpermittet() {
	player = getElement(0);
	step = (player.direction)?1:-1;
	if (player.orientation) {
		newx = 0;
	} else {
		newx = player.x + step;
	}
	if (newx < 0) return false;
	if (newx >= boardsize[0]) return false;
	return true;
}

function checkloseorwin() {
	player = getElement(0)
	for (var i in board) {
		if (sameplace(board[i], player)) {
			switch (board[i].id) {
				case 0:
					//self
					break;
				case 3:
				case 4:
					if (board[i].state) {
						reload_level();
						a_fail.play();
					}
					return;
				case 9:
					load_next_level();
					a_win.play();
					return;
				case 14:
					if (onoff_gl) {
						reload_level();
						a_fail.play();
					}
					return;
				case 13:
					break;
				default:
					reload_level();
					a_fail.play();
					return;
			}
		}
	}
}

function sameplace(a, b) {return (a.x == b.x && a.y == b.y)?true:false;}

function getElement(id) {
	for (var i in board) {
		if (board[i].id == id) return board[i];
	}
}
function removeElement(e) {
	for (var i in board) {
		if (board[i].id == e.id && board[i].x == e.x && board[i].y == e.y) {
			//board.splice(i, 1);
			board[i].markdel = true;
		}
	}
}

function setup() {
	a_move = document.createElement('audio');
	a_move.setAttribute('src', 'move.wav');
	a_move.load();
	a_fail = document.createElement('audio');
	a_fail.setAttribute('src', 'fail.wav');
	a_fail.load();
	a_win = document.createElement('audio');
	a_win.setAttribute('src', 'win.wav');
	a_win.load();
	setVolume(1);
	otherstuff();
	canvas = document.getElementById('canvas');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
	} else {
		alert("Your browser don't support canvas.");
	}
	canvas.width = boardsize[0] * zoom;
	canvas.height = boardsize[1] * zoom;
	//load_first_level();
	var level = parseInt(getCookie('level'));
	if (level > 0 && level <= 24) {
		doload(load_this_level(level));
	} else {
		load_first_level();
	}
}

function handleArrowKeys(evt) {
	if (inanim) return;
	switch (evt.keyCode) {
		case 37:
			//right
			getElement(0).setDirection(0, 0);
			updateStage();
			break;
		case 38:
			//up
			if (!$('#help_text').is(':hidden')) $('#help_text').slideUp();
			getElement(0).setDirection(1, 0);
			updateStage();
			break;
		case 39:
			//left
			if (!$('#help_text').is(':hidden')) $('#help_text').slideUp();
			getElement(0).setDirection(0, 1);
			updateStage();
			break;
		case 40:
			//down
			if (!$('#help_text').is(':hidden')) $('#help_text').slideUp();
			getElement(0).setDirection(1, 1);
			updateStage();
			break;
	}
}
document.onkeydown = handleArrowKeys;


function moveElement(nx, ny, nid) {
	this.id = nid;
	this.x = nx;
	this.y = ny
	this.lastx = nx;
	this.lasty = ny;
	this.color = getcolor(nid);
	var ad = getDirection(nid);
	this.orientation = ad[0];
	this.direction = ad[1];
	this.markdel = false;
}
moveElement.prototype.draw = drawElement;
moveElement.prototype.nextPos = moveElementNextPos;
moveElement.prototype.setDirection = ElementSetDirection;

function fixElement(nx, ny, nid) {
	this.id = nid;
	this.x = nx;
	this.y = ny;
	this.color = getcolor(nid);
	this.markdel = false;
}	
fixElement.prototype.draw = drawElement;
fixElement.prototype.nextPos = doNothing;

function onoffElement(nx, ny, nid, nstate) {
	this.id = nid;
	this.x = nx;
	this.y = ny;
	this.color = getcolor(nid);
	this.state = nstate;
	this.markdel = false;
}

onoffElement.prototype.draw = drawElement;
onoffElement.prototype.nextPos = toggleElement;

function doNothing() {};
function drawElement(step) {
	if (step != 0) {
		var bx = this.lastx * zoom;
		var by = this.lasty * zoom;
		if (this.id == 0) {
			if (this.orientation){tmpid = (this.direction)?7:5;}
			else {tmpid = (this.direction)?6:8;}
		}
		else {tmpid = this.id;}
		var animdist = zoom/animsteps*step;
		var ori = getElement(0).orientation;
		var holo = null;
		switch (tmpid) {
			case 5:
				if (ori) {
					by -= animdist;
					if (this.lasty == 0) {var code=(this.id)?5:0;var holo = new  moveElement(this.x, 3, code);holo.draw(step);}
				}
				break;
			case 6:
				bx += animdist;
				break;
			case 7:
				if (ori) by += animdist;
				if (this.lasty == 2) {var code=(this.id)?7:0;var holo = new moveElement(this.x, -1, code);holo.setDirection(1, 1);holo.draw(step);}
				break;
			case 8:
				bx -= animdist;
				break;
			case 11:
				if (!ori) {
					by -= animdist;
					if (this.lasty == 0) {var code=(this.id)?11:0;var holo = new  moveElement(this.x, 3, code);holo.draw(step);}
				}
				break;
			case 12:
				if (!ori) {
					by += animdist;
					if (this.lasty == 2) {var code=(this.id)?12:0;var holo = new moveElement(this.x, -1, code);holo.setDirection(1, 1);holo.draw(step);}
				}
				break;
			default:
				bx = this.x * zoom;
				by = this.y * zoom;
		}
	} else {
		var bx = this.x * zoom;
		var by = this.y * zoom;
	}
	

	var cx = bx + zoom/2;
	var cy = by + zoom/2;

	ctx.beginPath();

	var lw = 5;

	switch (this.id) {
		case 0:
			Elementdrawground(this, cx, cy);
			ctx.moveTo(cx, cy - zoom/6);
			ctx.lineTo(cx, cy + zoom/6);
			ctx.moveTo(cx - zoom/6, cy);
			ctx.lineTo(cx + zoom/6, cy);
			break;
		case 2:
			Elementdrawground(this, cx, cy);
			break;
		case 3:
			if (!this.state) break;
			Elementdrawground(this, cx, cy);
			ctx.moveTo(cx - zoom/6, cy);
			ctx.lineTo(cx + zoom/6, cy);
			break;
		case 4:
			if (!this.state) break;
			Elementdrawground(this, cx, cy);
			ctx.moveTo(cx - zoom/6, cy);
			ctx.lineTo(cx + zoom/6, cy);
			break;
		case 9:
			Elementdrawground(this, cx, cy);
			ctx.moveTo(cx - zoom/6, cy);
			ctx.lineTo(cx - zoom/18, cy + zoom/9);
			ctx.lineTo(cx + zoom/6, cy - zoom/8);
			break;
		case 5:
		case 11:
			var m = new Array(cx, cy - zoom/12);
			var w = new Array(zoom/28, -zoom/12);
			Elementdrawground(this, cx, cy);
			ctx.lineWidth = lw
			ctx.moveTo(m[0], cy + zoom/6);
			ctx.lineTo(m[0], m[1]);
			ctx.lineTo(m[0] - w[0], cy + w[1]);
			ctx.lineTo(m[0], cy - zoom/8);
			ctx.lineTo(m[0] + w[0], cy + w[1]);
			ctx.lineTo(m[0], m[1]);
			break;
		case 7:
		case 12:
			var m = new Array(cx, cy + zoom/12);
			var w = new Array(zoom/28,0);
			Elementdrawground(this, cx, cy);
			ctx.lineWidth = lw;
			ctx.moveTo(m[0], cy - zoom/6);
			ctx.lineTo(m[0], m[1]);
			ctx.lineTo(m[0] + w[0], m[1]);
			ctx.lineTo(m[0], cy + zoom/8);
			ctx.lineTo(m[0] - w[0], m[1]);
			ctx.lineTo(m[0], m[1]);
			break;
		case 13:
			//if (!this.state) break;
			Elementdrawground(this, cx, cy);
			var d = zoom/10;
			ctx.beginPath();
			ctx.arc(cx, cy, d, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fillStyle = col_black;
			ctx.fillStyle = toOpacity(col_black, fade_gl);
			break;
		case 14:
			if (!onoff_gl) break;
			var d = zoom/8;
			Elementdrawground(this, cx, cy);
			ctx.moveTo(cx - d, cy - d);
			ctx.lineTo(cx + d, cy + d);
			ctx.moveTo(cx + d, cy - d);
			ctx.lineTo(cx - d, cy + d);
			break;
	}
	ctx.strokeStyle = toOpacity(col_black, fade_gl);
	//ctx.fillStyle = toOpacity(col_black, fade_gl);
	ctx.fill();
	ctx.stroke();
}
function Elementdrawground(e, cx, cy) {
	ctx.fillStyle = toOpacity(e, 1);
	ctx.strokeStyle = toOpacity(col_black, fade_gl);
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.arc(cx, cy, zoom/3 , 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

function toOpacity(color, amount) {
	if (typeof color == 'object') {color = color.color;}
	var splittet = color.split("(");
	var witha = splittet[0].concat("a(", splittet[1]);
	var sp2 = witha.split(")");
	var fin = sp2[0].concat(", ", amount, ")");
	return fin;
}

function moveElementNextPos() {
	//check if move is permittet
	player = getElement(0);
	ori = player.orientation;
	if (ori && (this.id == 6 || this.id == 8 || this.id == 11 || this.id == 12)) return;
	if (!ori && (this.id == 5 || this.id == 7)) return;

	step = (this.direction)?1:-1;
	if (this.orientation) {
		this.y += step;
	} else {
		this.x += step;
	}
	if (this.x < 0) this.x = 0;
	if (this.x >= boardsize[0]) this.x = boardsize[0]-1;
	if (this.y < 0) this.y = boardsize[1]-1;
	if (this.y >= boardsize[1]) this.y = 0;
}
function ElementSetDirection(no, nd) {
	this.orientation = no;
	this.direction = nd;
}

function getcolor(id) {
	switch (id) {
		case 0:
			return col_player;
		case 2:
			return col_rock;
		case 3:
			return col_blink1;
		case 4:
			return col_blink2;
		case 5:
			return col_up;
		case 7:
			return col_down;
		case 9:
			return col_finish;
		case 11:
			return col_up2;
		case 12:
			return col_down2;
		case 13:
			return col_switch;
		case 14:
			return col_block;
		default:
			return col_rock;
	}
}

function getDirection(id) {
	switch (id) {
		case 5:
		case 11:
			return new Array(1, 0);
		case 6:
			return new Array(0, 1);
		case 7:
		case 12:
			return new Array(1, 1);
		case 8:
			return new Array(0, 0);
		default:
			return new Array(1, 0);

	}
}

function drawbackground() {
	grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width);
	grad.addColorStop(0, '#FFF');
	grad.addColorStop(0.5, 'rgb(160, 160, 160)');
	grad.addColorStop(1, '#FFF');
	ctx.fillStyle = grad;
	ctx.beginPath()
	ctx.fillRect(-canvas.width/2,0,2*canvas.width,canvas.height);
	ctx.fill();

	//Help Text
	ctx.font = '12px sans-serif';
	ctx.fillText("Canvas Text Functions", 0, 0);
	ctx.stroke();
}

function toggleElement() {
	switch (this.id) {
		case 3:
		case 4:
			if (getElement(0).orientation) this.state = !this.state;
			break;
		case 13:
			if (sameplace(getElement(0), this)) {
				onoff_gl = !onoff_gl;
				this.state = false;
				removeElement(this);
			}
			break;
		case 14:
			break;
	}
}

function sort() {
	var player = new Array();
	var verti = new Array();
	var hori = new Array();
	var onoff = new Array();
	var switcher = new Array();
	var fix = new Array();
	var dest = new Array();
	for (var i in board) {
		switch (board[i].id) {
			case 0:
				player.push(board[i]);
				break;
			case 2:
				fix.push(board[i]);
				break;
			case 3:
			case 4:
				onoff.push(board[i]);
				break;
			case 5:
			case 6:
			case 7:
			case 8:
				verti.push(board[i]);
				break;
			case 11:
			case 12:
				hori.push(board[i]);
				break;
			case 13:
			case 14:
				switcher.push(board[i]);
				break;
			case 9:
				dest.push(board[i]);
				break;
		}
	}
	var fin = new Array();
	board = fin.concat(fix, switcher, hori, verti, onoff, dest, player);
}

function fadeout(step) {
	if (step == fade_steps_gl) {
		fade_gl = 0;
		drawbackground();
		for (var i in board) {
			board[i].draw(0);
		}
		doload(load_this_level(aclevel));
		return;
	} else {
		fade_gl = 1 - (1 / fade_steps_gl) * step;
		drawbackground();
		for (var i in board) {
			board[i].draw(0);
		}
		step++;
		setTimeout("fadeout("+step+")", fade_speed_gl);
	}
}



function fadein(step) {
	if (step == fade_steps_gl) {
		fade_gl = 1;
		drawbackground();
		for (var i in board) {
			board[i].draw(0);
		}
		return;
	} else {
		fade_gl = (1 / fade_steps_gl) * step;
		drawbackground();
		for (var i in board) {
			board[i].draw(0);
		}
		step++;
		setTimeout("fadein("+step+")", fade_speed_gl);
	}
}

function otherstuff() {
	$('#options_title').click(function() {
		$('#options_wrap').slideToggle();
	});
	$('#op_steps').val(animation_steps);
	$('#op_delay').val(timeout);
	$('#op_fade_steps').val(fade_steps_gl);
	$('#op_fade_delay').val(fade_speed_gl);
	$('#op_volume').val(1);
	$('#op_level').bind('mouseup keyup', function() {
		if (isint($(this).val())) {
			var i = parseInt($(this).val());
			if (i<25&&i>0)load_level(i);
		}
	});
	$('#op_animen').mouseup(function() {
		animen_gl = !$(this).is(':checked');
	});
	$('#op_steps').bind('mouseup keyup', function() {
		if (isint($(this).val())) {
			var i = parseInt($(this).val());
			if (i>0) animation_steps = i;
		}
	});
	$('#op_delay').bind('mouseup keyup', function() {
		if (isint($(this).val())) {
			var i = parseInt($(this).val());
			if (i>=0) timeout = i;
		}
	});
	$('#op_fade_steps').bind('mouseup keyup', function() {
		if (isint($(this).val())) {
			var i = parseInt($(this).val());
			if (i>=0) fade_steps_gl = i;
		}
	});
	$('#op_fade_delay').bind('mouseup keyup', function() {
		if (isint($(this).val())) {
			var i = parseInt($(this).val());
			if (i>=0) fade_speed_gl = i;
		}
	});
	$('#op_volume').bind('mouseup keyup', function() {
		setVolume($(this).val());
	});
	
}

function isint(value) {
	if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
		return true;
	} else {
		alert("Please insert a valid number!");
	}
} 

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {
var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			return unescape(y);
		}
	}
}

function setVolume(vol) {
	a_move.volume = vol;
	a_win.volume = vol;
	a_fail.volume = vol;
}
