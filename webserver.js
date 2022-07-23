var http=require('http').createServer(handler);
var fs=require('fs');
var url=require('path');
var io=require('path');
var Gpio=require('onoff').Gpio;
var LED26=new Gpio(26,'out');
var LED20=new Gpio(20,'out');
var LED21=new Gpio(21,'out');
var LED16=new Gpio(16,'out');

var GPIO26value=0;
var GPIO20value=0;
var GPIO21value=1;
var GPIO16value=1;

const WebPort=80;

http.listen(WebPort,function(){
    LED26.writeSync(GPIO26value);
    LED20.writeSync(GPIO20value);
    LED21.writeSync(GPIO21value);
    LED16.writeSync(GPIO16value);
    console.log('Server running on Port'+ WebPort);
    console.log('GPIO26'= '+GPIO26value');
    console.log('GPIO20'='+GPIO20value');
    console.log('GPIO21'="+GPIO21value");
    console.log('GPIO16'='+GPIO16value');
}
);
function handler(req,res){
    var q =url.parse(req.url,true);
    var filename="." + q.pathname;
    console.log('filename='+filename);
    var extname=path.extname(filename);
    if (filename=='./'){
        console.log('retriving default insex.html file');
        filename = './index.html';
    }

    var contentType = 'text/html';

    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.ico':
            contentType = 'image/png';
            break;
    }

    fs.readFile(__dirname + '/public/' + filename, function(err,content){
        if(err){
            console.log('File not found. Filename='+filename');
            fs.readFile(__dirname + '/public/404.html',function(err,content){
                res.writeHead(200,{'Content-Type':'text/html'});
                return res.end(content,'utf');
            });
        }
        else {
            res.writeHead(200,{'Content-Type': contentType});
            return res.end(content,'utf8');
        }
    });
}

process.on('SIGINT',function(){
    LED26.writeSync(0);
    LED26.unexport();

    LED20.writeSync(0);
    LED20.unexport();

    LED21.writeSync(0);
    LED21.unexport();

    LED16.writeSync(0);
    LED16.unexport();
});

io.sockets.on('connection',function (socket){
    console.log('A new cliend has connectioned. Send LED status');
    socket.emit('GPIO26',GPIO26value);
    socket.emit('GPIO20',GPIO20value);
    socket.emit('GPIO21',GPIO21value);
    socket.emit('GPIO16',GPIO16value);

    socket.on('GPIO26T',function(data){
        if (GPIO26value) GPIO26value = 0;
        else GPIO26value =1 ;
        console.log('new GPIO26 value='+GPIO26value);
        LED26.writeSync(GPIO26value);
        console.log('Send new GPIO26 state to ALL clients');
        io.emit('GPIO26',GPIO26value);
    });

    socket.on('GPIO20T',function(data){
        if (GPIO20value) GPIO20value = 0;
        else GPIO20value =1 ;
        console.log('new GPIO20 value='+GPIO20value);
        LED26.writeSync(GPIO20value);
        console.log('Send new GPIO20 state to ALL clients');
        io.emit('GPIO20',GPIO20value);
    });

    socket.on('GPIO21T',function(data){
        if (GPIO21value) GPIO21value = 0;
        else GPIO21value =1 ;
        console.log('new GPIO21 value='+GPIO21value);
        LED26.writeSync(GPIO21value);
        console.log('Send new GPIO21 state to ALL clients');
        io.emit('GPIO21',GPIO21value);
    });

    socket.on('GPIO16T',function(data){
        if (GPIO16value) GPIO16value = 0;
        else GPIO16value =1 ;
        console.log('new GPIO16 value='+GPIO16value);
        LED26.writeSync(GPIO16value);
        console.log('Send new GPIO16 state to ALL clients');
        io.emit('GPIO16',GPIO16value);
    });

    socket.on('GPIO26',function(data){
        GPIO26value= data;
        if (GPIO26value != LED26.readSync()){
            LED26.writeSync(GPIO26value);
            console.log('Send new GPIO26 state to ALL clients');
            io.emit('GPIO26',GPIO26value);
        };
    });

    socket.on('GPIO20',function(data){
        GPIO20value = data;
        if (GPIO20value != LED20.readSysc()){
            LED20.writeSync(GPIO20value);
            console.log('Send new GPIO20 state to ALL clients');
            io.emit('GPIO20',GPIO20value);
        };
    });

    socket.on('GPIO21',function(data){
        GPIO21value = data; 
        if (GPIO21value != LED21.readSysc()){
            LED21.writeSync(GPIO21value);
            console.log('Send new GPIO21 state to ALL clients');
            io.emit('GPIO21',GPIO21value);
        };
    });

    socket.on('GPIO16',function(data){
        GPIO16value = data;
        if (GPIO16value != LED16.readSysc()){
            LED16.writeSync(GPIO16value);
            console.log('Send new GPIO16 state to ALL clients');
            io.emit('GPIO16',GPIO16value);
        };
    });

    socket.on('disconnect',function(){
        console.log('A user disconnected');
    });
});