// YAM BAKSHI'S CODE ////////////////////////////////////////////////////////////////////

var currentCarousel = 0;
var carousels = [0, 0, 0, 0, 0];
function updateCurrentCarousel(i) {
  currentCarousel = i;
}

function rotateCarousel() {
  $(`.item${currentCarousel + 1}`).removeClass("active");
  carousels[currentCarousel] = (carousels[currentCarousel] > 0) ? carousels[currentCarousel] - 1 : 4;
  $(`#slide_${currentCarousel + 1}${carousels[currentCarousel]}`)[0].classList.add("active");

  let selectedItem = carousels[currentCarousel];
  // let selectedItem = (carousels[currentCarousel - 1] > 0) ? carousels[currentCarousel - 1] - 1 : 4;
  for (let i = 0; i < 5; i++) {

    // Clockwise
    $(`.item${currentCarousel + 1}`)[i].style.top = radiusLength * Math.sin((radianSectionDeg * (selectedItem - i)) - 1.5708) + 'px';
    $(`.item${currentCarousel + 1}`)[i].style.left = radiusLength * Math.cos((radianSectionDeg * (selectedItem - i)) + 1.5708) + 'px';

    // Counter Clockwise
    // $(`.item${currentCarousel}`)[i].style.top = radiusLength * Math.sin((radianSectionDeg * (selectedItem + i)) - 1.5708) + 'px';
    // $(`.item${currentCarousel}`)[i].style.left = radiusLength * Math.cos((radianSectionDeg * (selectedItem + i)) - 1.5708) + 'px';
  }
}


// FIVER CODE ///////////////////////////////////////////////////////////////////////////

var slide1;


$(".circle-slide").each(function (index) {
  slide1 = document.getElementsByClassName('item1');
});
//var htmlCollection = document.getElementsByClassName('item');
//var controlerClass = document.getElementsByClassName("slide-num");
//getting elements by class name into an HTMLCollection

var itemsId = Array.from(slide1);

//turning the HTMLcollection into an array for easier manipulation of the elements

//var sectionDeg = 360/itemsId.length;
var sectionDeg = 360 / 5;


//console.log(sectionDeg);
//sectioning the (imaginary) circle into a number of section equalling the number of items
//it can be used on more elements

var radianSectionDeg = sectionDeg * Math.PI * 2 / 360;
//transforming from degrees into radians
var dWidth = innerWidth;
if (dWidth < 767) {
  var radiusLength = 115;
}
else {
  var radiusLength = 250;
}

//the distance between the center of the circle to the element
//edit this number to increase/decrease that distance

for (var i = 0; i < itemsId.length; i++) {
  itemsId[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
  itemsId[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
}
//setting the top and left positions of each elemenent based on the following formula:
//(x, y) = (r * cos(θ), r * sin(θ)) like this:
//x = (r * cos(θ) => left
//y = r * sin(θ) => top
//1.5708 is a radian used put the first element on top - basically 90deg

function makeATurn() {
  for (var i = 0; i < itemsId.length; i++) {

    itemsId[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
    //	  console.log("Top", itemsId[i].style.top);
    itemsId[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
    //	  console.log("Left", itemsId[i].style.left);
  }
}
//function used to set the new position of the elements

var list = [];
//var slideLength = $(".controls").find(".slide-num").length;
//for (var i = 0; i < slideLength; i++) {
//    list.push(i);
//}


function turnRight(el) {

  //	var cName = el.parentElement.className;
  //	cName = cName.split(" ");
  //	console.log(cName[1]);
  //			console.log(el.parentElement.className);
  //			console.log();
  //el.parentElement.children.classList.remove("active")	

  $(".item1").removeClass("active");
  el.classList.add("active");
  var currentClick = el.getAttribute("data-val");
  //	$("#slide_"+currentClick).addClass("active");	

  var holder = [];
  for (var j = 0; j < currentClick; j++) {

    var getEl = itemsId.shift();
    holder.push(getEl);
  }
  itemsId = itemsId.concat(holder);

  makeATurn();
  itemsId = Array.from(slide1);
  //	}
}






// slide 2
var slide2 = document.getElementsByClassName('item2');
$(".circle-slide").each(function (index) {
  slide2 = document.getElementsByClassName('item');
});

var itemsId2 = Array.from(slide2);
for (var i = 0; i < itemsId2.length; i++) {
  itemsId2[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
  itemsId2[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
}

function makeATurn2() {
  for (var i = 0; i < itemsId2.length; i++) {

    itemsId2[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
    //	  console.log("Top", itemsId[i].style.top);
    itemsId2[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
    //	  console.log("Left", itemsId[i].style.left);
  }
}

function turnRight2(el) {
  $(".item2").removeClass("active");
  el.classList.add("active");
  var currentClick = el.getAttribute("data-val");
  //	$("#slide_"+currentClick).addClass("active");	

  var holder = [];
  for (var j = 0; j < currentClick; j++) {

    var getEl = itemsId2.shift();
    holder.push(getEl);
  }
  itemsId2 = itemsId2.concat(holder);

  makeATurn2();
  itemsId2 = Array.from(slide2);
}

// slide 3
var slide3;
$(".circle-slide").each(function (index) {
  slide3 = document.getElementsByClassName('item3');
});

var itemsId3 = Array.from(slide3);

for (var i = 0; i < itemsId3.length; i++) {
  itemsId3[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
  itemsId3[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
}
function makeATurn3() {
  for (var i = 0; i < itemsId3.length; i++) {

    itemsId3[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
    //	  console.log("Top", itemsId[i].style.top);
    itemsId3[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
    //	  console.log("Left", itemsId[i].style.left);
  }
}

function turnRight3(el) {

  $(".item3").removeClass("active");
  el.classList.add("active");
  var currentClick = el.getAttribute("data-val");
  //	$("#slide_"+currentClick).addClass("active");	

  var holder = [];
  for (var j = 0; j < currentClick; j++) {

    var getEl = itemsId3.shift();
    holder.push(getEl);
  }
  itemsId3 = itemsId3.concat(holder);

  makeATurn3();
  itemsId3 = Array.from(slide3);
}

// slide 4
var slide4;
$(".circle-slide").each(function (index) {
  slide4 = document.getElementsByClassName('item4');
});

var itemsId4 = Array.from(slide4);

for (var i = 0; i < itemsId4.length; i++) {
  itemsId4[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
  itemsId4[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
}
function makeATurn4() {
  for (var i = 0; i < itemsId4.length; i++) {

    itemsId4[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
    //	  console.log("Top", itemsId[i].style.top);
    itemsId4[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
    //	  console.log("Left", itemsId[i].style.left);
  }
}

function turnRight4(el) {

  $(".item4").removeClass("active");
  el.classList.add("active");
  var currentClick = el.getAttribute("data-val");
  //	$("#slide_"+currentClick).addClass("active");	

  var holder = [];
  for (var j = 0; j < currentClick; j++) {

    var getEl = itemsId4.shift();
    holder.push(getEl);
  }
  itemsId4 = itemsId4.concat(holder);

  makeATurn4();
  itemsId4 = Array.from(slide4);
}



// slide 5
var slide5;
$(".circle-slide").each(function (index) {
  slide5 = document.getElementsByClassName('item5');
});

var itemsId5 = Array.from(slide5);

for (var i = 0; i < itemsId5.length; i++) {
  itemsId5[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
  itemsId5[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
}
function makeATurn5() {
  for (var i = 0; i < itemsId5.length; i++) {

    itemsId5[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
    //	  console.log("Top", itemsId[i].style.top);
    itemsId5[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
    //	  console.log("Left", itemsId[i].style.left);
  }
}

function turnRight5(el) {

  $(".item5").removeClass("active");
  el.classList.add("active");
  var currentClick = el.getAttribute("data-val");
  //	$("#slide_"+currentClick).addClass("active");	

  var holder = [];
  for (var j = 0; j < currentClick; j++) {

    var getEl = itemsId5.shift();
    holder.push(getEl);
  }
  itemsId5 = itemsId5.concat(holder);

  makeATurn5();
  itemsId5 = Array.from(slide5);
}