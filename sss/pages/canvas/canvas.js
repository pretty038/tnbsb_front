// pages/canvas/canvas.js
import Canvas from '../../utils/scoreCanvas.js'
Page({
  ...Canvas.options,
  data: {
    ...Canvas.data,
  },
  
  onLoad: function (options) {
    this.draw('runCanvas', 60, 1000);
  },
})