function calculageWindowDimensions(width, height) {
  const xScale = window.innerWidth / width;
  const yScale = window.innerHeight / height;
  const scale = (xScale < yScale) ? xScale : yScale;
  return { width: scale * width, height: scale * height};
}

var SCALE = {
  calculageWindowDimensions: calculageWindowDimensions
};
