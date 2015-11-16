// React.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('content')
// );

var reader;
var filedata;

$("#loadjql").on("change", function() {
  var fs = document.getElementById("loadjql");
  if (fs && fs.files && fs.files[0]) {
    reader.readAsBinaryString(fs.files[0]);
  }
  return false;
})

$(function() {
  reader = new FileReader();
  reader.onload = function() {
    filedata = this.result;
    if(this.result.length != 50 || !this.result.startsWith(prefix)) {
      alert("这不是一个军棋布局文件");
      return false;
    }
    for(var i in this.result) {
      console.log(this.result.charCodeAt(i).toString(16));
      coredata = this.result.substr(prefix.length);
      coredataChanged = true;
    }
  }
});
