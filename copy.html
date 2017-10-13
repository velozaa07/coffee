

// block constructor
function Block(idName, elementId){
  this.idn = idName;
  this.elem = document.getElementById(elementId);

  this.getCoord = function(){
    coord = {};
    coord.x = +(window.getComputedStyle(this.elem).getPropertyValue('left').slice(0,-2));
    coord.y = +(window.getComputedStyle(this.elem).getPropertyValue('top').slice(0,-2));

    return coord;
  };

  this.setX = function(coordX){
      this.elem.style.left = coordX;
  };

  this.shiftX = function(shift){
    let newPosition = "" + (this.getCoord().x + shift) + "px";
    this.setX(newPosition);
  };


  this.setY = function(coordY){
      this.elem.style.top = coordY;
  };

  this.shiftY = function(shift){
    let newPosition = "" + (this.getCoord().y - shift) + "px";
    this.setY(newPosition);
  };





  this.getDimen = function(){
    dimen = {};
    dimen.w = +(window.getComputedStyle(this.elem).getPropertyValue('width').slice(0,-2));
    dimen.h = +(window.getComputedStyle(this.elem).getPropertyValue('height').slice(0,-2));

    return dimen;
  };

  this.setW = function(dimenW){
    this.elem.style.width = dimenW;
  };

  this.stretchW = function(stretch){
    let newSize = "" + (this.getDimen().w + stretch) + "px";
    this.setW(newSize);
  };

  this.setH = function(dimenH){
    this.elem.style.height = dimenH;
  };

  this.stretchH = function(stretch){
    let newSize = "" + (this.getDimen().h + stretch) + "px";
    this.setH(newSize);
  };

}


// Proper T-intersection: functions that collapse them and the order in which
// (ctd) they are collapsed
// only blocks that under the head of the T can be controllers: function that
// (ctd) picks out controller block
// use construtor function to build intersections by accepting three blocks
// should have access to coordinate and dimen objects of every block passed into
// (ctd) the constructor


// fblock is the top or right block

function tandemBlocks(fBlock, sBlock, vertical, displacement){
  // direction: true if vertical, false if horizontal
  let axisMov =  {shift: vertical? "shiftY": "shiftX",
   stretch: vertical? "stretchH": "stretchW"};


  if((displacement > 0) && vertical){

    fBlock[axisMov.stretch]((-displacement));
    sBlock[axisMov.shift](displacement);
    sBlock[axisMov.stretch](displacement);

  } else if((displacement < 0) && vertical) {

    sBlock[axisMov.stretch](displacement);
    sBlock[axisMov.shift](displacement);
    fBlock[axisMov.stretch](-displacement);

  } else if((displacement > 0) && !vertical){

    fBlock[axisMov.stretch]((displacement * -1));
    fBlock[axisMov.shift](displacement);
    sBlock[axisMov.stretch](displacement);

  } else if((displacement < 0) && !vertical){

    sBlock[axisMov.stretch](displacement);
    fBlock[axisMov.shift](displacement);
    fBlock[axisMov.stretch](-displacement);


  }


}



function animateHide(fBlock, sBlock, tBlock){

  let increment = 4;
  let totalDisplacement = sBlock.getDimen().h;
  let totalDisplacement1 = tBlock.getDimen().w;

  let timer = setInterval(function(){
    if(totalDisplacement >= 0){
      tandemBlocks(fBlock, sBlock, true, -increment);
      totalDisplacement -= increment;
    } else if(totalDisplacement1 >= 0){

      tandemBlocks(tBlock, fBlock, false, increment);
      totalDisplacement1 -= increment;

    } else {
      clearInterval(timer);
    }
  }, 10);

}

function animateHide1(fBlock, sBlock){

  let increment = 1;
  let totalDisplacement = sBlock.getDimen().w;


  let timer = setInterval(function(){
    if(totalDisplacement > 0){
      tandemBlocks(fBlock, sBlock, false, -increment);
      totalDisplacement -= increment;
    } else {
      clearInterval(timer);
    }
  }, 10);

}
let firstBlock = new Block("a", "sub-box-a");
let secondBlock = new Block("b", "sub-box-b");
let thirdBlock = new Block("c", "sub-box-c");
let fourthBlock = new Block("d", "sub-box-d");
let fifthBlock = new Block("e", "sub-box-e");

animateHide(firstBlock, secondBlock, thirdBlock);
animateHide1(fifthBlock, fourthBlock);
