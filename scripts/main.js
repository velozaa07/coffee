// main
// action will be a mapping from a time increment (in ms) to pixel increment

// sample derivative function below
function linear(timeInterval){
  let delPixel = timeInterval;
  return delPixel;
}

function expandAndHide(eBlock, hBlock, vertical, derivative, timeIncrement){

  let pixelsLeft = vertical? hBlock.getDimen().h : hBlock.getDimen().w;
  let positiveBlock = vertical?
  (eBlock.getDimen().y < hBlock.getDimen().y? eBlock : hBlock)
  :(eBlock.getDimen().x > hBlock.getDimen().x? eBlock : hBlock); // block up or to the right
  let negativeBlock = (positiveBlock === hBlock)? eBlock : hBlock; // block below or to the left
  let time = 0;

  let timer = setInterval(function(){
    if(pixelsLeft >= derivative(time)){
      tandemBlocks(positiveBlock, negativeBlock, vertical, derivative(time));
      time += timeIncrement;
      pixelsLeft -= derivative(time);
    } else {
      tandemBlocks(positiveBlock, negativeBlock, vertical, pixelsLeft);
      clearInterval(timer);
    }
  }, timeIncrement);

}
