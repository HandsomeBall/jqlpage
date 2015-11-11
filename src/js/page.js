var game;  // phaser 游戏实例
var graphics;  // phaser rectangle drawer
var marginLeft = 80;
var marginTop = 80;
var flagWidth = 100;
var flagHeight = 50;
var flagMargin = 10;

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
    drawnObject = game.add.sprite(
      marginLeft + (flagWidth + 2 * flagMargin) * j,
      marginTop + (flagHeight + 2 * flagMargin) * i,
      bmd
    );
    drawnObject.anchor.setTo(0.5, 0.5);
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
  var input = game.input; //当前游戏的input对象
  input.addMoveCallback(function(){
    console.log(input.mousePointer);
  }, this);
  // var signal = input.onDown; //鼠标按下时的 Signal对象
  // signal.add(function(){}); //给Signal 绑定事件处理函数
}

function update() {

}

$(function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: preload, create: create, update: update });
});
