var blur_gl = true;
var ctx = null;
var data = null;
var nobj = null;
var width = null;
var height = null;
var influence = 6;
function blur(canvas) {
	if (!blur_gl) return;
	width = canvas.width;
	height = canvas.height;
	ctx = canvas.getContext("2d");
	data = ctx.getImageData(0, 0, width, height).data;
	nobj = ctx.getImageData(0, 0, width, height);
	blur_start();
}

function getPixel(x, y) {
	//line
	var l = y * width * 4;
	//position
	var p = x * 4 + l;
	var pxl = [data[p], data[p+1], data[p+2], data[p+3]];
	return pxl;
}

function blurPixel(x, y) {
	var o = getPixel(x,y);
	var tl = getPixel(x-1,y-1);
	var t = getPixel(x,y-1);
	var tr = getPixel(x+1,y-1);
	var ml = getPixel(x-1,y);
	var mr = getPixel(x+1,y);
	var bl = getPixel(x-1,y+1);
	var b = getPixel(x,y+1);
	var br = getPixel(x+1,y+1);

	var red = tl[0]+t[0]+tr[0]+ml[0]+mr[0]+bl[0]+b[0]+br[0];
	var green = tl[1]+t[1]+tr[1]+ml[1]+mr[1]+bl[1]+b[1]+br[1];
	var blue = tl[2]+t[2]+tr[2]+ml[2]+mr[2]+bl[2]+b[2]+br[2];

	var mred = red/8;
	var mgreen = green/8;
	var mblue = blue/8;
	mred=(mred+influence*o[0])/(influence+1);
	mgreen=(mgreen+influence*o[1])/(influence+1);
	mblue=(mblue+influence*o[2])/(influence+1);
	var offset = y*width*4+x*4;

	nobj.data[offset] = mred;
	nobj.data[offset + 1] = mgreen;
	nobj.data[offset + 2] = mblue;
}

function blur_start() {
	for (var x = 1; x<width-1; x++) {
		for (var y = 1; y<height-1; y++) {
			blurPixel(x, y);
		}
	}
	ctx.clearRect(0,0,width,height);
	ctx.putImageData(nobj, 0, 0);
	delete nobj;
	nobj = null;
}
