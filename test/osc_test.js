var osc = require('node-osc');

var sendCount = 0;
var oscClient = new osc.Client('127.0.0.1', 10000);
//var oscServer = new osc.Server(5000);

msg = [10, 20];

for(var i=0; i<msg.length; i++) {
    var sendMsg =  new osc.Message('/address'+String(i));
    console.log(msg[i]);
    sendMsg.append(msg[i]);
    console.log(sendMsg);
    oscClient.send(sendMsg);
}


var sendMsg0 =  new osc.Message('/add0');
console.log(msg[0]);
sendMsg0.append(msg[0]);
console.log(sendMsg0);

var sendMsg1 =  new osc.Message('/add1');
console.log(msg[1]);
sendMsg1.append(msg[1]);
console.log(sendMsg1);

oscClient.send(sendMsg1, sendMsg0);