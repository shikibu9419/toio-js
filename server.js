// nodeのコアモジュールのhttpを使う
var http = require('http')
var server = http.createServer();
let port = 3000

//postがmesh→iftttから飛んでくる
server.on('request', function (req, res) {
    // https://kazuhira-r.hatenablog.com/entry/20180201/1517497871
    req.setEncoding("utf-8");
    req.on("data", chunk => {
        console.log(`received data[${chunk}]`)

        const data = JSON.parse(chunk);
        console.log(data["propery1"])
        switch (propery1) {
            case "on":
                console.log("get data from iftt [on]")
                break;
            case "off":
                console.log("get data from iftt [off]")
                break;
            default:
                console.log("unexpected value get from iftt")
                break;
        }
    })
    res.end();
});

// サーバを待ち受け状態にする
// 第1引数: ポート番号 第2引数: IPアドレス
server.listen(port);
