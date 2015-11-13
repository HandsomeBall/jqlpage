var game;  // phaser 游戏实例
var marginLeft = 80;
var marginTop = 80;
var flagWidth = 100;
var flagHeight = 50;
var flagMargin = 10;

var selected = null;
var borderWidth = 5;
var borderGraphics;   // selected 图形设备

var flags = [
  ["司令", "司令", "司令", "司令", "司令"],
  ["司令", "", "司令", "", "司令"],
  ["司令", "司令", "", "司令", "司令"],
  ["司令", "", "司令", "", "司令"],
  ["司令", "司令", "司令", "司令", "司令"],
  ["司令", "司令", "司令", "司令", "司令"]
];

function makeFlag(text, pos) {
  if (text) {
    // [i, j] = pos;
    var i = pos[0];
    var j = pos[1];
    var bmd = game.add.bitmapData(flagWidth, flagHeight);
    bmd.rect(0, 0, flagWidth, flagHeight, '#55ff55');
    bmd.text("司令", 15, 25, '20px 宋体', 'black', false);
    var x = marginLeft + (flagWidth + 2 * flagMargin) * j;
    var y = marginTop + (flagHeight + 2 * flagMargin) * i;
    drawnObject = game.add.sprite(x, y, bmd);
    // var button = game.add.button(
    //   marginLeft + (flagWidth + 2 * flagMargin) * j,
    //   marginTop + (flagHeight + 2 * flagMargin) * i,
    //   text,
    //   function(){},
    //   this, 0, 0, 0);
    //
    // button.onInputOver.add(function(){
    //
    // }, this);
    // button.onInputOut.add(out, this);
    // button.onInputUp.add(up, this);
    // drawnObject.anchor.setTo(0.5, 0.5);

    drawnObject.inputEnabled = true;
    drawnObject.events.onInputOver.add(function(){
      console.log("当前位置 (" + i + ", " + j + ")");

      borderGraphics.lineStyle(borderWidth, 0xffffff, 1);
      borderGraphics.moveTo(x + 2 - borderWidth, y + 2 - borderWidth);
      borderGraphics.lineTo(x + 2 + flagWidth, y + 2 - borderWidth);
      borderGraphics.lineTo(x + 2 + flagWidth, y + 2 + flagHeight);
      borderGraphics.lineTo(x + 2 - borderWidth, y + 2 + flagHeight);
      borderGraphics.lineTo(x + 2 - borderWidth, y + 2 - borderWidth);
    }, this);
    drawnObject.events.onInputOut.add(function(){
      console.log("out (" + i + ", " + j + ")")
      borderGraphics.clear();
    }, this);
    return drawnObject;
  }
}

function preload() {
}

function create() {
  for(var i in flags) {
    for(var j in flags[i]) {
      makeFlag(flags[i][j], [i, j]);
    }
  }
  borderGraphics = game.add.graphics(0, 0);
  // var input = game.input; //当前游戏的input对象
  // input.addMoveCallback(function(){
  //   console.log(input.mousePointer);
  // }, this);
  // var signal = input.onDown; //鼠标按下时的 Signal对象
  // signal.add(function(){}); //给Signal 绑定事件处理函数
}

function update() {

}

$(function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: preload, create: create, update: update });
});
