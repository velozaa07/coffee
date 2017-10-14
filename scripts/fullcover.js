// full cover

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



// action will be a mapping from a time increment (in ms) to pixel increment

// sample derivative function below
// time is in units of 10 milliseconds
function constant(incrNum){
  let delPixel = 4;
  return delPixel;
}

function constant1(incrNum){
  let delPixel = 3;
  return delPixel;
}
function eAndHAdjacent(eBlock, hBlock, vertical, rate, timeIncrement){

  let pixelsLeft = vertical? hBlock.getDimen().h : hBlock.getDimen().w;
  let positiveBlock = vertical?(eBlock.getCoord().y < hBlock.getCoord().y? eBlock : hBlock):(eBlock.getCoord().x > hBlock.getCoord().x? eBlock : hBlock); // block up or to the right
  let negativeBlock = (positiveBlock === hBlock)? eBlock : hBlock; // block below or to the left
  let numTimeIncr = 0;
  let sign = (positiveBlock === hBlock)? 1 : -1;

  let timer = setInterval(function(){
    if(pixelsLeft >= rate(numTimeIncr)){
      tandemBlocks(positiveBlock, negativeBlock, vertical, sign*rate(numTimeIncr));
      numTimeIncr++;
      pixelsLeft -= rate(numTimeIncr);
    } else {
      tandemBlocks(positiveBlock, negativeBlock, vertical, sign*pixelsLeft);
      clearInterval(timer);
    }
  }, timeIncrement);

}

let labels = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

function Blocks(labelArray){
  for(let i = 0; i < labels.length; ++i){
    this[labelArray[i]] = new Block(labelArray[i], "sub-box-" + labelArray[i]);
  }
}

let blocks = new Blocks(labels);
let timeIt = 4;

blocks.c.elem.addEventListener("click", function(){
  setTimeout(function(){
    eAndHAdjacent(blocks.a, blocks.b, true, constant, timeIt);
  }, 200);

  setTimeout(function(){
    eAndHAdjacent(blocks.d, blocks.e, false, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.i, true, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.g, blocks.h, false, constant, timeIt);
  }, 600);


  setTimeout(function(){
    eAndHAdjacent(blocks.c, blocks.a, false, constant, timeIt);
  }, 600);

  setTimeout(function(){
    eAndHAdjacent(blocks.c, blocks.d, true, constant, timeIt);
  }, 1000);


  setTimeout(function(){
    eAndHAdjacent(blocks.g, blocks.f, true, constant, timeIt);
  }, 1000);

  setTimeout(function(){
    eAndHAdjacent(blocks.c, blocks.g, false, constant, 4);
  }, 1400);
});


blocks.a.elem.addEventListener("click", function(){
  setTimeout(function(){
    eAndHAdjacent(blocks.a, blocks.b, true, constant, timeIt);
  }, 200);

  setTimeout(function(){
    eAndHAdjacent(blocks.d, blocks.e, false, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.i, true, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.g, false, constant, timeIt);
  }, 600);


  setTimeout(function(){
    eAndHAdjacent(blocks.a, blocks.c, false, constant1, timeIt);
  }, 600);

  setTimeout(function(){
    eAndHAdjacent(blocks.f, blocks.h, true, constant, timeIt);
  }, 1000);


  setTimeout(function(){
    eAndHAdjacent(blocks.a, blocks.d, true, constant, timeIt);
  }, 1600);

  setTimeout(function(){
    eAndHAdjacent(blocks.a, blocks.f, false, constant, timeIt);
  }, 1900);

});



blocks.b.elem.addEventListener("click", function(){
  setTimeout(function(){
    eAndHAdjacent(blocks.b, blocks.a, true, constant, timeIt);
  }, 200);

  setTimeout(function(){
    eAndHAdjacent(blocks.d, blocks.e, false, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.i, true, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.g, false, constant, timeIt);
  }, 600);


  setTimeout(function(){
    eAndHAdjacent(blocks.b, blocks.c, false, constant1, timeIt);
  }, 600);

  setTimeout(function(){
    eAndHAdjacent(blocks.f, blocks.h, true, constant, timeIt);
  }, 1000);



  setTimeout(function(){
    eAndHAdjacent(blocks.b, blocks.d, true, constant, timeIt);
  }, 1600);


  setTimeout(function(){
    eAndHAdjacent(blocks.b, blocks.f, false, constant, timeIt);
  }, 1900);

});


// block d

blocks.d.elem.addEventListener("click", function(){
  setTimeout(function(){
    eAndHAdjacent(blocks.a, blocks.b, true, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.d, blocks.e, false, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.i, true, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.g, blocks.h, false, constant, timeIt);
  }, 600);


  setTimeout(function(){///////
    eAndHAdjacent(blocks.c, blocks.a, false, constant, timeIt);
  }, 600);


  setTimeout(function(){
    eAndHAdjacent(blocks.f, blocks.g, true, constant, timeIt);
  }, 1000);


  setTimeout(function(){
    eAndHAdjacent(blocks.d, blocks.c, true, constant, timeIt);
  }, 1000);

  setTimeout(function(){
    eAndHAdjacent(blocks.d, blocks.f, false, constant, timeIt);
  }, 1650);

});


// block e
blocks.e.elem.addEventListener("click", function(){

  setTimeout(function(){
    eAndHAdjacent(blocks.b, blocks.a, true, constant, timeIt);
  }, 200);

  setTimeout(function(){
    eAndHAdjacent(blocks.e, blocks.d, false, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.i, blocks.h, true, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.g, blocks.i, false, constant, timeIt);
  }, 600);


  setTimeout(function(){
    eAndHAdjacent(blocks.b, blocks.c, false, constant, timeIt);
  }, 1000);

  setTimeout(function(){
    eAndHAdjacent(blocks.f, blocks.g, true, constant, timeIt);
  }, 1000);


  setTimeout(function(){
    eAndHAdjacent(blocks.e, blocks.b, true, constant, timeIt);
  }, 1700);

  setTimeout(function(){
    eAndHAdjacent(blocks.e, blocks.f, false, constant, timeIt);
  }, 2300);

});

// block f

blocks.f.elem.addEventListener("click", function(){
  setTimeout(function(){
    eAndHAdjacent(blocks.a, blocks.b, true, constant, timeIt);
  }, 200);

  setTimeout(function(){
    eAndHAdjacent(blocks.d, blocks.e, false, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.i, true, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.g, blocks.h, false, constant, timeIt);
  }, 600);


  setTimeout(function(){
    eAndHAdjacent(blocks.c, blocks.a, false, constant, timeIt);
  }, 600);

  setTimeout(function(){
    eAndHAdjacent(blocks.f, blocks.g, true, constant, timeIt);
  }, 1000);


  setTimeout(function(){
    eAndHAdjacent(blocks.d, blocks.c, true, constant, timeIt);
  }, 1000);

  setTimeout(function(){
    eAndHAdjacent(blocks.f, blocks.d, false, constant, timeIt);
  }, 1650);

});

// block g

blocks.g.elem.addEventListener("click", function(){
  setTimeout(function(){
    eAndHAdjacent(blocks.b, blocks.a, true, constant, timeIt);
  }, 200);

  setTimeout(function(){
    eAndHAdjacent(blocks.d, blocks.e, false, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.i, true, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.g, blocks.h, false, constant, timeIt);
  }, 600);


  setTimeout(function(){
    eAndHAdjacent(blocks.c, blocks.b, false, constant, timeIt);
  }, 600);



  setTimeout(function(){
    eAndHAdjacent(blocks.g, blocks.f, true, constant, timeIt);
  }, 1000);


  setTimeout(function(){
    eAndHAdjacent(blocks.c, blocks.d, true, constant, timeIt);
  }, 1000);

  setTimeout(function(){
    eAndHAdjacent(blocks.g, blocks.c, false, constant, timeIt);
  }, 1400);

});


// block h

blocks.h.elem.addEventListener("click", function(){
  setTimeout(function(){
    eAndHAdjacent(blocks.a, blocks.b, true, constant, timeIt);
  }, 200);

  setTimeout(function(){
    eAndHAdjacent(blocks.d, blocks.e, false, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.i, true, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.g, false, constant, timeIt);
  }, 600);


  setTimeout(function(){
    eAndHAdjacent(blocks.c, blocks.a, false, constant, timeIt);
  }, 600);

  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.f, true, constant, timeIt);
  }, 1000);


  setTimeout(function(){
    eAndHAdjacent(blocks.c, blocks.d, true, constant, timeIt);
  }, 1000);

  setTimeout(function(){
    eAndHAdjacent(blocks.h, blocks.c, false, constant, timeIt);
  }, 1500);

});

// block i
blocks.i.elem.addEventListener("click", function(){
  setTimeout(function(){
    eAndHAdjacent(blocks.b, blocks.a, true, constant, timeIt);
  }, 200);

  setTimeout(function(){
    eAndHAdjacent(blocks.d, blocks.e, false, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.i, blocks.h, true, constant, timeIt);
  }, 200);


  setTimeout(function(){
    eAndHAdjacent(blocks.i, blocks.g, false, constant, timeIt);
  }, 600);


  setTimeout(function(){
    eAndHAdjacent(blocks.c, blocks.b, false, constant, timeIt);
  }, 600);

  setTimeout(function(){
    eAndHAdjacent(blocks.i, blocks.f, true, constant, timeIt);
  }, 1000);


  setTimeout(function(){
    eAndHAdjacent(blocks.c, blocks.d, true, constant, timeIt);
  }, 1000);

  setTimeout(function(){
    eAndHAdjacent(blocks.i, blocks.c, false, constant, timeIt);
  }, 1500);

});
;
