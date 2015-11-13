var game;  // phaser 游戏实例
var marginLeft = 80;
var marginTop = 80;
var flagWidth = 100;
var flagHeight = 50;
var flagMargin = 10;

var selected;
var timer;

var borderWidth = 5;
var borderGraphics;   // selected 图形设备

var flags = [
  ["1", "2", "3", "4", "5"],
  ["6", "", "7", "", "8"],
  ["9", "0", "", "11", "22"],
  ["33", "", "44", "", "55"],
  ["66", "77", "88", "99", "00"],
  ["111", "222", "333", "444", "555"]
];

function makeFlag(text, pos) {
  if (text) {
    // [i, j] = pos;
    var i = pos[0];
    var j = pos[1];
    var bmd = game.add.bitmapData(flagWidth, flagHeight);
    bmd.rect(0, 0, flagWidth, flagHeight, '#55ff55');
    bmd.text(text, 15, 25, '20px 宋体', 'black', false);
    var x = marginLeft + (flagWidth + 2 * flagMargin) * j;
    var y = marginTop + (flagHeight + 2 * flagMargin) * i;
    var drawnObject = game.add.sprite(x, y, bmd);
    drawnObject.inputEnabled = true;
    // 鼠标悬停时有白色边框
    drawnObject.events.onInputOver.add(function(){
      // console.log("当前位置 (" + i + ", " + j + ")");
      borderGraphics.lineStyle(borderWidth, 0xffffff, 1);
      borderGraphics.moveTo(drawnObject.x + 2 - borderWidth, drawnObject.y + 2 - borderWidth);
      borderGraphics.lineTo(drawnObject.x + 2 + flagWidth, drawnObject.y + 2 - borderWidth);
      borderGraphics.lineTo(drawnObject.x + 2 + flagWidth, drawnObject.y + 2 + flagHeight);
      borderGraphics.lineTo(drawnObject.x + 2 - borderWidth, drawnObject.y + 2 + flagHeight);
      borderGraphics.lineTo(drawnObject.x + 2 - borderWidth, drawnObject.y + 2 - borderWidth);
    }, this);
    // 鼠标出边界时清除白色边框
    drawnObject.events.onInputOut.add(function(){
      // console.log("out (" + i + ", " + j + ")")
      borderGraphics.clear();
    }, this);
    drawnObject.events.onInputUp.add(function(){
      if (selected) {
        // 停止闪烁，交换位置，选中者清空
        timer.stop();
        timer.destroy();
        selected.visible = true;

        var tmpx, tmpy;
        tmpx = selected.x;
        tmpy = selected.y;
        selected.x = drawnObject.x;
        selected.y = drawnObject.y;
        drawnObject.x = tmpx;
        drawnObject.y = tmpy;

        selected = null;
      } else {
        // 当前按钮被选中，且闪烁
        selected = drawnObject;
        timer = game.time.create(false);
        timer.loop(500, function(){
          selected.visible = !selected.visible;
        }, this);
        timer.start();
      }
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
