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

var prefix = "\x51\x51\x47\x61\x6d\x65\x20\x4a\x51\x4c\x20\x46\x69\x6c\x65\x00\x57\x04\x00\x00";
var datauriPrefix = "data:text/plain;base64,";
var coredata = [7,11,10,9,12,4,0,13,0,5,6,4,0,13,9,8,0,10,0,11,12,7,8,13,3,3,2,3,12,11].map(function(v){
  return String.fromCharCode(v);
}).join("");  // 默认布局
var coredataChanged = false;

var flagElements = [];  // 保存军棋元素
var flag2hex = {
    "司令": "\x05",
    "军长": "\x06",
    "师长": "\x07",
    "旅长": "\x08",
    "团长": "\x09",
    "营长": "\x0A",
    "连长": "\x0B",
    "排长": "\x0C",
    "工兵": "\x0D",
    "炸弹": "\x04",
    "地雷": "\x03",
    "军棋": "\x02",
    "": "\x00"
};
var hex2flag = {
  "\x05": "司令",
  "\x06": "军长",
  "\x07": "师长",
  "\x08": "旅长",
  "\x09": "团长",
  "\x0A": "营长",
  "\x0B": "连长",
  "\x0C": "排长",
  "\x0D": "工兵",
  "\x04": "炸弹",
  "\x03": "地雷",
  "\x02": "军棋",
  "\x00": ""
};

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
    drawnObject.i = i;
    drawnObject.j = j;
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
        // 更换下载数据
        var tmp = coredata[selected.i * 5 + selected.j];
        coredata[selected.i * 5 + selected.j] = coredata[drawnObject.i * 5 + drawnObject.j];
        coredata[drawnObject.i * 5 + drawnObject.j] = tmp;
        $("#savejql").prop("href", datauriPrefix + base64encode(prefix + coredata));

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
  for(var i in coredata) {
    flagElements.push(makeFlag(hex2flag[coredata[i]], [Math.floor(i/5), Math.floor(i%5)]));
  }
  // 初始化下载内容
  $("#savejql").prop("href", datauriPrefix + base64encode(prefix + coredata));
  borderGraphics = game.add.graphics(0, 0);
}

function update() {
  if(coredataChanged) {
    // 销毁之前的元素
    for(var k in flagElements) {
      var f = flagElements[k]
      if (f) {
        f.destroy();
      }
    }
    // 根据数据 coredata 创建新元素
    flagElements = [];
    for(var i in coredata) {
      flagElements.push(makeFlag(hex2flag[coredata[i]], [Math.floor(i/5), Math.floor(i%5)]));
    }
    // 更改下载内容
    $("#savejql").prop("href", datauriPrefix + base64encode(prefix + coredata));
    coredataChanged = false;
  }
}

$(function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: preload, create: create, update: update });
});
