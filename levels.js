var aclevel = 1;

function level(nname, nnr) {
	this.nr = nnr;
	this.name = nname;
	this.hint = "";
	this.elements = new Array(); 
}

function load_first_level() {
	aclevel = 1;
	doload(load_this_level(aclevel));
}

function load_next_level() {
	aclevel++;
	fadeout(0);
	//doload(load_this_level(aclevel));
}
function reload_level() {
	fadeout(0);
}

var helptext = ""
function doload(levelobj) {
	board = levelobj.elements;
	$('#level_title').html(levelobj.name);
	$('#level_number td').removeClass('selected').addClass('unselected');
	$("#lv_" + levelobj.nr).removeClass('unselected').addClass('selected');
	helptext = levelobj.hint;
	onoff_gl = true;
	sort();
	if (levelobj.hint.length > 0) $('#help_text').html(levelobj.hint).slideDown('slow');
	setCookie('level', levelobj.nr, 365);
	fadein(0);
}
function load_level(numb) {
	doload(load_this_level(numb));
}

function load_this_level(numb) {
	aclevel = numb;
	$('#op_level').val(numb);
	switch (numb) {
		case 1:
			return load_level_1();
		case 2:
			return load_level_2();
		case 3:
			return load_level_3();
		case 4:
			return load_level_4();
		case 5:
			return load_level_5();
		case 6:
			return load_level_6();
		case 7:
			return load_level_7();
		case 8:
			return load_level_8();
		case 9:
			return load_level_9();
		case 10:
			return load_level_10();
		case 11:
			return load_level_11();
		case 12:
			return load_level_12();
		case 13:
			return load_level_13();
		case 14:
			return load_level_14();
		case 15:
			return load_level_15();
		case 16:
			return load_level_16();
		case 17:
			return load_level_17();
		case 18:
			return load_level_18();
		case 19:
			return load_level_19();
		case 20:
			return load_level_20();
		case 21:
			return load_level_21();
		case 22:
			return load_level_22();
		case 23:
			return load_level_23();
		case 24:
			return load_level_24();
		default:
			alert("You did it!");
			$('#options').slideDown();
			return load_this_level(24);
	}
}

function load_level_1() {
	var one = new level("motion", 1);
	one.hint = "arrow keys";
	var fix1 = new fixElement(2, 0, 2);
	var fix2 = new fixElement(2, 1, 2);
	var fix3 = new fixElement(7, 1, 2);
	var fix4 = new fixElement(7, 2, 2);
	var start = new moveElement(0, 1, 0);
	var finish = new fixElement(9, 1, 9);

	one.elements.push(fix1, fix2, fix3, fix4, start, finish);
	return one;
}

function load_level_2() {
	var two = new level("pathway", 2);
	var e1 = new fixElement(0, 0, 2);
	var e2 = new fixElement(0, 2, 2);
	var e3 = new fixElement(1, 0, 2);
	var e4 = new fixElement(2, 0, 2);
	var e5 = new fixElement(2, 1, 2);
	var e6 = new fixElement(3, 0, 2);
	var e7 = new fixElement(4, 2, 2);
	var e8 = new fixElement(5, 1, 2);
	var e9 = new fixElement(5, 2, 2);
	var e10 = new fixElement(7, 0, 2);
	var e11 = new fixElement(7, 1, 2);
	var e12 = new fixElement(8, 0, 2);
	var e13 = new fixElement(9, 0, 2);
	var e14 = new fixElement(9, 2, 2);

	two.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14);

	var start = new moveElement(0, 1, 0);
	var finish = new fixElement(9, 1, 9);
	
	two.elements.push(start, finish);
	return two;
}

function load_level_3() {
	var three = new level("wrap", 3);
	var e1 = new fixElement(2, 0, 2);
	var e2 = new fixElement(2, 1, 2);
	var e3 = new fixElement(3, 1, 2);
	var e4 = new fixElement(4, 1, 2);
	var e5 = new fixElement(4, 2, 2);
	var e6 = new fixElement(5, 1, 2);
	var e7 = new fixElement(5, 2, 2);
	var e8 = new fixElement(6, 1, 2);
	var e9 = new fixElement(7, 0, 2);
	var e10 = new fixElement(7, 1, 2);
	three.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10);

	var start = new moveElement(0, 1, 0);
	var finish = new fixElement(9, 1, 9);
	
	three.elements.push(start, finish);
	return three;
}

function load_level_4() {
	var l = new level("surprise", 4);
	var e1 = new moveElement(2, 1, 5);
	var e2 = new moveElement(2, 2, 5);
	var e3 = new moveElement(4, 0, 5);
	var e4 = new moveElement(4, 2, 5);
	var e5 = new moveElement(5, 0, 5);
	var e6 = new moveElement(5, 2, 5);
	var e7 = new moveElement(7, 0, 5);
	var e8 = new moveElement(7, 1, 5);
	
	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8);

	var start = new moveElement(0, 1, 0);
	var finish = new fixElement(9, 1, 9);
	
	l.elements.push(start, finish);
	return l;
}

function load_level_5() {
	var l = new level("going up", 5);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new fixElement(1, 0, 2);
	var e3 = new fixElement(1, 1, 2);
	var e4 = new moveElement(2, 1, 5);
	var e5 = new moveElement(2, 2, 5);
	var e6 = new fixElement(3, 1, 2);
	var e7 = new fixElement(3, 2, 2);
	var e8 = new moveElement(4, 1, 5);
	var e9 = new moveElement(4, 2, 5);
	var e10 = new fixElement(5, 0, 2);
	var e11 = new fixElement(5, 2, 2);
	var e12 = new fixElement(6, 2, 2);
	var e13 = new fixElement(7, 1, 2);
	var e14 = new fixElement(7, 2, 2);
	var e15 = new moveElement(8, 1, 5);
	var e16 = new moveElement(8, 2, 5);
	var e17 = new fixElement(9, 0, 2);
	var e18 = new fixElement(9, 1, 9);
	var e19 = new fixElement(9, 2, 2);

	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19);
	return l;
}

function load_level_6() {
	var l = new level("phase", 6);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new fixElement(1, 2, 2);
	var e3 = new moveElement(2, 1, 5);
	var e4 = new moveElement(2, 2, 5);
	var e5 = new fixElement(3, 1, 2);
	var e6 = new moveElement(4, 0, 5);
	var e7 = new moveElement(4, 1, 5);
	var e8 = new fixElement(5, 0, 2);
	var e9 = new moveElement(6, 2, 5);
	var e10 = new moveElement(7, 1, 5);
	var e11 = new moveElement(7, 2, 5);
	var e12 = new fixElement(8, 1, 2);
	var e13 = new fixElement(8, 2, 2);
	var e14 = new fixElement(9, 1, 9);
	var e15 = new fixElement(9, 2, 2);
	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15);
	return l;
}

function load_level_7() {
	var l = new level("weave", 7);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new moveElement(1, 1, 5);
	var e3 = new moveElement(1, 2, 5);
	var e4 = new moveElement(2, 0, 7);
	var e5 = new moveElement(2, 1, 7);
	var e6 = new fixElement(3, 1, 2);
	var e7 = new fixElement(3, 2, 2);
	var e8 = new moveElement(4, 0, 7);
	var e9 = new moveElement(4, 1, 7);
	var e10 = new moveElement(5, 1, 5);
	var e11 = new moveElement(5, 2, 5);
	var e12 = new fixElement(6, 0, 2);
	var e13 = new fixElement(6, 1, 2);
	var e14 = new moveElement(7, 1, 5);
	var e15 = new moveElement(7, 2, 5);
	var e16 = new moveElement(8, 0, 7);
	var e17 = new moveElement(8, 1, 7);
	var e18 = new fixElement(9, 1, 9);

	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18);
	return l;
}

function load_level_8() {
	var l = new level("lock", 8);

	var e1 = new fixElement(0, 0, 2);
	var e2 = new moveElement(0, 1, 0);
	var e3 = new fixElement(0, 2, 2);
	var e4 = new moveElement(1, 0, 7);
	var e5 = new fixElement(1, 2, 2);
	var e6 = new moveElement(2, 1, 5);
	var e7 = new fixElement(2, 2, 2);
	var e8 = new moveElement(3, 1, 7);
	var e9 = new moveElement(3, 2, 7);
	var e10 = new moveElement(4, 0, 5);
	var e11 = new moveElement(4, 1, 5);
	var e12 = new fixElement(5, 0, 2);
	var e13 = new moveElement(5, 1, 7);
	var e14 = new moveElement(6, 0, 7);
	var e15 = new moveElement(6, 1, 7);
	var e16 = new fixElement(7, 1, 2);
	var e17 = new moveElement(7, 2, 5);
	var e18 = new moveElement(8, 1, 5);
	var e19 = new moveElement(8, 2, 5);
	var e20 = new fixElement(9, 0, 2);
	var e21 = new fixElement(9, 1, 9);
	var e22 = new fixElement(9, 2, 2);
	
	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22);
	return l;
}

function load_level_9() {
	var l = new level("bridge", 9);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new moveElement(1, 0, 7);
	var e3 = new moveElement(1, 1, 7);
	var e4 = new moveElement(2, 1, 5);
	var e5 = new fixElement(2, 2, 2);
	var e6 = new moveElement(3, 0, 5);
	var e7 = new moveElement(3, 1, 5);
	var e8 = new fixElement(4, 0, 2);
	var e9 = new moveElement(4, 1, 5);
	var e10 = new fixElement(5, 0, 2);
	var e11 = new moveElement(5, 1, 7);
	var e12 = new moveElement(6, 0, 7);
	var e13 = new moveElement(6, 1, 7);
	var e14 = new moveElement(7, 1, 7);
	var e15 = new fixElement(7, 2, 2);
	var e16 = new moveElement(8, 0, 5);
	var e17 = new moveElement(8, 1, 5);
	var e18 = new fixElement(9, 1, 9);

	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18);
	return l;
}

function load_level_10() {
	var l = new level("flash", 10);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new fixElement(2, 0, 2);
	var e3 = new onoffElement(2, 1, 3, true);
	var e4 = new fixElement(2, 2, 2);
	var e5 = new fixElement(4, 0, 2);
	var e6 = new fixElement(4, 1, 2);
	var e7 = new onoffElement(4, 2, 3, true);
	var e8 = new onoffElement(6, 0, 3, true);
	var e9 = new fixElement(6, 1, 2);
	var e10 = new fixElement(6, 2, 2);
	var e11 = new onoffElement(7, 1, 3, true);
	var e12 = new onoffElement(8, 1, 3, true);
	var e13 = new fixElement(9, 0, 2);
	var e14 = new fixElement(9, 1, 9);
	var e15 = new fixElement(9, 2, 2);

	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15);
	return l;
}

function load_level_11() {
	var l = new level("deception", 11);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new fixElement(1, 0, 2);
	var e3 = new onoffElement(1, 1, 3, true);
	var e4 = new fixElement(1, 2, 2);
	var e5 = new moveElement(2, 1, 5);
	var e6 = new onoffElement(3, 0, 3, true);
	var e7 = new fixElement(3, 1, 2);
	var e8 = new onoffElement(3, 2, 3, true);
	var e9 = new moveElement(4, 1, 7);
	var e10 = new moveElement(4, 2, 7);
	var e11 = new moveElement(5, 0, 5);
	var e12 = new moveElement(5, 1, 5);
	var e13 = new fixElement(5, 2, 2);
	var e14 = new fixElement(6, 1, 2);
	var e15 = new onoffElement(6, 2, 3, true);
	var e16 = new fixElement(7, 0, 2);
	var e17 = new onoffElement(7, 1, 3, true);
	var e18 = new onoffElement(7, 2, 3, true);
	var e19 = new moveElement(8, 1, 7);
	var e20 = new moveElement(8, 2, 7);
	var e21 = new fixElement(9, 0, 2);
	var e22 = new fixElement(9, 1, 9);
	var e23 = new fixElement(9, 2, 2);

	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22,e23);
	return l;
}

function load_level_12() {
	var l = new level("sidestep", 12);

	var e1 = new fixElement(0, 0, 2);
	var e2 = new moveElement(0, 1, 0);
	var e3 = new moveElement(1, 0, 5);
	var e4 = new onoffElement(1, 1, 3, true);
	var e5 = new moveElement(1, 2, 5);
	var e6 = new onoffElement(2, 0, 3, true);
	var e7 = new onoffElement(2, 2, 3, true);
	var e8 = new fixElement(3, 0, 2);
	var e9 = new fixElement(3, 2, 2);
	var e10 = new moveElement(4, 0, 5);
	var e11 = new onoffElement(4, 1, 3, true);
	var e12 = new moveElement(4, 2, 5);
	var e13 = new onoffElement(5, 0, 3, true);
	var e14 = new onoffElement(5, 2, 3, true);
	var e15 = new moveElement(6, 0, 5);
	var e16 = new onoffElement(6, 1, 3, true);
	var e17 = new fixElement(7, 0, 2);
	var e18 = new fixElement(7, 2, 2);
	var e19 = new moveElement(8, 1, 7);
	var e20 = new moveElement(8, 2, 7);
	var e21 = new fixElement(9, 0, 2);
	var e22 = new fixElement(9, 1, 9);
	var e23 = new fixElement(9, 2, 2);
	
	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22,e23);
	return l;
}

function load_level_13() {
	var l = new level("offbeat", 13);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new onoffElement(2, 1, 3, true);
	var e3 = new onoffElement(2, 2, 3, true);
	var e4 = new onoffElement(3, 0, 4, false);
	var e5 = new onoffElement(3, 1, 4, false);
	var e6 = new onoffElement(4, 0, 3, true);
	var e7 = new onoffElement(4, 2, 3, true);
	var e8 = new onoffElement(5, 1, 4, false);
	var e9 = new onoffElement(5, 2, 4, false);
	var e10 = new onoffElement(6, 0, 3, true);
	var e11 = new onoffElement(6, 1, 3, true);
	var e12 = new onoffElement(7, 0, 4, false);
	var e13 = new onoffElement(7, 2, 4, false);
	var e14 = new fixElement(9, 1, 9);
	
	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14);
	return l;
}

function load_level_14() {
	var l = new level("hurdle", 14);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new onoffElement(1, 0, 4, false);
	var e3 = new fixElement(1, 1, 2);
	var e4 = new fixElement(1, 2, 2);
	var e5 = new moveElement(2, 1, 7);
	var e6 = new moveElement(2, 2, 7);
	var e7 = new onoffElement(3, 0, 3, true);
	var e8 = new onoffElement(3, 1, 3, true);
	var e9 = new fixElement(3, 2, 2);
	var e10 = new moveElement(4, 1, 5);
	var e11 = new onoffElement(4, 2, 4, false);
	var e12 = new fixElement(5, 0, 2);
	var e13 = new fixElement(5, 1, 2);
	var e14 = new moveElement(6, 1, 7);
	var e15 = new onoffElement(6, 2, 4, false);
	var e16 = new moveElement(7, 1, 5);
	var e17 = new fixElement(7, 2, 2);
	var e18 = new fixElement(8, 1, 2);
	var e19 = new onoffElement(8, 2, 3, true);
	var e20 = new fixElement(9, 0, 2);
	var e21 = new fixElement(9, 1, 9);

	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21);
	return l;
}

function load_level_15() {
	var l = new level("backdoor", 15);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new fixElement(1, 0, 2);
	var e3 = new fixElement(1, 1, 2);
	var e4 = new onoffElement(1, 2, 4, false);
	var e5 = new onoffElement(2, 0, 3, true);
	var e6 = new moveElement(2, 1, 5);
	var e7 = new onoffElement(2, 2, 4, false);
	var e8 = new onoffElement(3, 0, 3, true);
	var e9 = new fixElement(3, 1, 2);
	var e10 = new fixElement(3, 2, 2);
	var e11 = new onoffElement(4, 1, 4, false);
	var e12 = new onoffElement(4, 2, 4, false);
	var e13 = new fixElement(5, 0, 2);
	var e14 = new moveElement(5, 1, 5);
	var e15 = new moveElement(5, 2, 5);
	var e16 = new moveElement(6, 1, 7);
	var e17 = new onoffElement(6, 2, 4, false);
	var e18 = new moveElement(7, 0, 5);
	var e19 = new fixElement(7, 1, 2);
	var e20 = new moveElement(7, 2, 5);
	var e21 = new fixElement(8, 1, 2);
	var e22 = new onoffElement(9, 0, 3, true);
	var e23 = new fixElement(9, 1, 9);
	var e24 = new onoffElement(9, 2, 3, true);

	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22,e23,e24);
	return l;
}

function load_level_16() {
	var l = new level("axis", 16);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new fixElement(1, 1, 2);
	var e3 = new fixElement(1, 2, 2);
	var e4 = new moveElement(2, 1, 11);
	var e5 = new fixElement(3, 0, 2);
	var e6 = new moveElement(4, 1, 7);
	var e7 = new moveElement(4, 2, 7);
	var e8 = new moveElement(5, 0, 11);
	var e9 = new moveElement(5, 1, 11);
	var e10 = new fixElement(6, 0, 2);
	var e11 = new fixElement(6, 2, 2);
	var e12 = new moveElement(7, 2, 11);
	var e13 = new moveElement(8, 2, 11);
	var e14 = new fixElement(9, 0, 2);
	var e15 = new fixElement(9, 1, 9);
	var e16 = new fixElement(9, 2, 2);
	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16);
	return l;
}

function load_level_17() {
	var l = new level("sweep", 17);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new fixElement(1, 0, 2);
	var e3 = new fixElement(1, 2, 2);
	var e4 = new moveElement(2, 0, 11);
	var e5 = new moveElement(3, 0, 11);
	var e6 = new onoffElement(3, 2, 3, true);
	var e7 = new moveElement(4, 0, 11);
	var e8 = new moveElement(5, 0, 11);
	var e9 = new moveElement(5, 2, 7);
	var e10 = new moveElement(6, 0, 11);
	var e11 = new moveElement(7, 0, 11);
	var e12 = new moveElement(7, 1, 5);
	var e13 = new moveElement(7, 2, 5);
	var e14 = new moveElement(8, 0, 11);
	var e15 = new fixElement(9, 0, 2);
	var e16 = new fixElement(9, 1, 9);
	var e17 = new fixElement(9, 2, 2);
	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17);
	return l;
}

function load_level_18() {
	var l = new level("gate", 18);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new fixElement(1, 1, 2);
	var e3 = new fixElement(1, 2, 2);
	var e4 = new moveElement(2, 1, 11);
	var e5 = new fixElement(3, 0, 2);
	var e6 = new fixElement(3, 1, 2);
	var e7 = new onoffElement(3, 2, 3, true);
	var e8 = new fixElement(4, 0, 2);
	var e9 = new moveElement(5, 1, 7);
	var e10 = new moveElement(5, 2, 7);
	var e11 = new moveElement(6, 0, 11);
	var e12 = new moveElement(6, 1, 11);
	var e13 = new onoffElement(7, 0, 3, true);
	var e14 = new moveElement(7, 1, 5);
	var e15 = new moveElement(7, 2, 5);
	var e16 = new moveElement(8, 1, 11);
	var e17 = new moveElement(8, 2, 11);
	var e18 = new fixElement(9, 1, 9);
	var e19 = new fixElement(9, 2, 2);

	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19);
	return l;
}

function load_level_19() {
	var l = new level("unzip", 19);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new moveElement(2, 0, 11);
	var e3 = new moveElement(2, 2, 11);
	var e4 = new moveElement(3, 0, 12);
	var e5 = new moveElement(3, 2, 12);
	var e6 = new moveElement(4, 0, 5);
	var e7 = new moveElement(4, 2, 5);
	var e8 = new moveElement(5, 0, 7);
	var e9 = new moveElement(5, 2, 7);
	var e10 = new moveElement(6, 0, 11);
	var e11 = new moveElement(6, 2, 11);
	var e12 = new moveElement(7, 0, 12);
	var e13 = new moveElement(7, 2, 12);
	var e14 = new fixElement(9, 1, 9);

	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14);
	return l;
}

function load_level_20() {
	var l = new level("twins", 20);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new onoffElement(1, 0, 3, true);
	var e3 = new fixElement(1, 1, 2);
	var e4 = new onoffElement(1, 2, 4, false);
	var e5 = new moveElement(2, 0, 12);
	var e6 = new moveElement(2, 1, 12);
	var e7 = new moveElement(3, 1, 11);
	var e8 = new moveElement(3, 2, 11);
	var e9 = new moveElement(4, 0, 7);
	var e10 = new moveElement(4, 1, 7);
	var e11 = new onoffElement(5, 0, 4, false);
	var e12 = new fixElement(5, 1, 2);
	var e13 = new onoffElement(5, 2, 3, true);
	var e14 = new moveElement(6, 0, 11);
	var e15 = new moveElement(6, 1, 11);
	var e16 = new moveElement(7, 1, 12);
	var e17 = new moveElement(7, 2, 12);
	var e18 = new moveElement(8, 0, 5);
	var e19 = new moveElement(8, 1, 5);
	var e20 = new fixElement(9, 0, 2);
	var e21 = new fixElement(9, 1, 9);
	var e22 = new fixElement(9, 2, 2);
	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22);
	return l;
}

function load_level_21() {
	var l = new level("machine", 21);

	var e1 = new moveElement(0, 0, 5);
	var e2 = new moveElement(0, 1, 0);
	var e3 = new moveElement(0, 2, 5);
	var e4 = new fixElement(1, 1, 2);
	var e5 = new moveElement(1, 2, 12);
	var e6 = new moveElement(2, 0, 7);
	var e7 = new moveElement(2, 1, 7);
	var e8 = new onoffElement(2, 2, 3, true);
	var e9 = new moveElement(3, 1, 11);
	var e10 = new moveElement(4, 0, 5);
	var e11 = new fixElement(4, 1, 2);
	var e12 = new moveElement(4, 2, 5);
	var e13 = new fixElement(5, 1, 2);
	var e14 = new moveElement(5, 2, 12);
	var e15 = new moveElement(6, 0, 7);
	var e16 = new moveElement(6, 1, 7);
	var e17 = new onoffElement(6, 2, 3, true);
	var e18 = new moveElement(7, 1, 11);
	var e19 = new moveElement(8, 0, 5);
	var e20 = new fixElement(8, 1, 2);
	var e21 = new moveElement(8, 2, 5);
	var e22 = new fixElement(9, 1, 9);
	var e23 = new moveElement(9, 2, 12);
	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22,e23);
	return l;
}

function load_level_22() {
	var l = new level("reduction", 22);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new onoffElement(2, 0, 13, true);
	var e3 = new onoffElement(2, 2, 13, true);
	var e4 = new onoffElement(3, 0, 14, true);
	var e5 = new onoffElement(3, 1, 14, true);
	var e6 = new onoffElement(3, 2, 14, true);
	var e7 = new moveElement(5, 0, 5);
	var e17 = new onoffElement(6, 0, 4, false);
	var e8 = new onoffElement(5, 1, 13, true);
	var e9 = new moveElement(5, 2, 5);
	var e10 = new moveElement(6, 1, 12);
	var e11 = new fixElement(7, 0, 2);
	var e12 = new moveElement(7, 1, 12);
	var e13 = new onoffElement(7, 2, 13, true);
	var e14 = new onoffElement(8, 1, 14, false);
	var e15 = new fixElement(8, 2, 2);
	var e16 = new fixElement(9, 1, 9);
	
	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17);
	return l;
}

function load_level_23() {
	var l = new level("lure", 23);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new fixElement(1, 1, 2);
	var e3 = new onoffElement(2, 0, 4, false);
	var e4 = new moveElement(2, 1, 11);
	var e5 = new moveElement(2, 2, 11);
	var e6 = new moveElement(3, 0, 12);
	var e7 = new moveElement(3, 1, 12);
	var e8 = new onoffElement(3, 2, 13, true);
	var e9 = new moveElement(4, 0, 5);
	var e10 = new moveElement(4, 1, 5);
	var e11 = new onoffElement(4, 2, 14, true);
	var e12 = new moveElement(5, 1, 11);
	var e13 = new moveElement(5, 2, 11);
	var e14 = new onoffElement(6, 0, 13, true);
	var e15 = new moveElement(6, 1, 12);
	var e16 = new fixElement(7, 0, 2);
	var e17 = new onoffElement(7, 1, 13, true);
	var e18 = new fixElement(7, 2, 2);
	var e19 = new fixElement(8, 0, 2);
	var e20 = new onoffElement(8, 1, 14, true);
	var e21 = new fixElement(8, 2, 2);
	var e22 = new fixElement(9, 1, 9);
	
	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22);
	return l;
	return l;
}

function load_level_24() {
	var l = new level("final dance", 24);

	var e1 = new moveElement(0, 1, 0);
	var e2 = new moveElement(1, 0, 11);
	var e3 = new moveElement(1, 2, 11);
	var e4 = new onoffElement(2, 0, 13, true);
	var e5 = new moveElement(2, 1, 12);
	var e6 = new moveElement(2, 2, 12);
	var e7 = new onoffElement(3, 0, 14, true);
	var e8 = new onoffElement(4, 1, 3, true);
	var e9 = new moveElement(4, 2, 12);
	var e10 = new moveElement(5, 0, 11);
	var e11 = new onoffElement(5, 1, 4, false);
	var e12 = new fixElement(6, 0, 2);
	var e13 = new onoffElement(6, 1, 13, true);
	var e14 = new fixElement(6, 2, 2);
	var e15 = new fixElement(7, 0, 2);
	var e16 = new onoffElement(7, 1, 13, true);
	var e17 = new fixElement(7, 2, 2);
	var e18 = new fixElement(8, 0, 2);
	var e19 = new onoffElement(8, 1, 14, true);
	var e20 = new fixElement(8, 2, 2);
	var e21 = new fixElement(9, 0, 2);
	var e22 = new fixElement(9, 1, 9);
	var e23 = new fixElement(9, 2, 2);

	l.elements.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22,e23);
	return l;
}
