var socket=io();
window.addEventListener("load",function(){
    if(isMobile.any()){
        document.addEventListner("touchstart",ReportTouchStart,false);
        document.addEventListner("touchend",ReportTouchEnd,false);
        document.addEventListner("touchmove",TouchMove,false);
    }
    else{
        document.addEventListener("mouseup",ReportMouseUp,false);
        document.addEventListener("mousedown",ReportMouseDown,false);
    }
});

// ----------------------

socket.on('GPIO26',function(data){
    var myJSON=JSON.stringify(data);
    document.getElementById('GPIO26').checked=data;
});

socket.on('GPIO20',function(data){
    var myJSON=JSON.stringify(data);
    document.getElementById('GPIO20').checked=data;
});

socket.on('GPIO21',function(data){
    var myJSON=JSON.stringify(data);
    document.getElementById('GPIO21').checked-data;
});

socket.on('GPIO16',function(data){
    var myJSON=JSON.stringify(data);
    document.getElementById('GPIO16').checked=data;
});

// --------------

function ReportTouchStart(e){
    var y=e.target.previousElementSibling;
    if(y!==null) var x = y.id;
    if(x!==null){
        if(x==="GPIO26"){
            socket.emit("GPIO26T");
        }
        else if(x==="GPIO20"){
            socket.emit("GPIO20T");
        }
        else if(x==="GPIO21"){
            socket.emit("GPIO21T");
        }
        else if(x==="GPIO16"){
            socket.emit("GPIO16T");
        }
    }

    if (e.target.id==="GPIO26M"){
        socket.emit("GPIO26",1);
        document.getElementById('GPIO26').checked=1;
    }
    else if(e.target.id==="GPIO20M"){
        socket.emit("GPIO20",1);
        document.getElementById("GPIO20").checked=1;
    }
    else if(e.target.id==="GPIO21M"){
        socket.emit("GPIO21",1);
        document.getElementById("GPIO21").checked=1;
    }
    else if(e.target.id==="GPIO16M"){
        socket.emit("GPIO16",1);
        document.getElementById("GPIO16").checked=1;
    }
}

function ReportTouchEnd(e){
    if(e.target.id==="GPIO26M"){
        socket.emit("GPIO26",0);
        document.getElementById('GPIO26').checked=0;  
    }
    else if(e.target.id==="GPIO20M"){
        socket.emit("GPIO20",0);
        document.getElementById('GPIO20').checked=0;  
    }
    else if(e.target.id==="GPIO21M"){
        socket.emit("GPIO21",0);
        document.getElementById('GPIO21').checked=0;  
    }
    else if(e.target.id==="GPIO16M"){
        socket.emit("GPIO16",0);
        document.getElementById('GPIO16').checked=0;  
    }
}

function ReportMouseDown(e){
    var y=e.target.previousElementSibling;
    if(y!==null) var x = y.id;
    if(x!==null){
        if(x==="GPIO26"){
            socket.emit("GPIO26T");
        }
        else if(x==="GPIO20"){
            socket.emit("GPIO20T");
        }
        else if(x==="GPIO21"){
            socket.emit("GPIO21T");
        }
        else if(x==="GPIO16"){
            socket.emit("GPIO16T");
        }
    }

    if (e.target.id==="GPIO26M"){
        socket.emit("GPIO26",1);
        document.getElementById('GPIO26').checked=1;
    }
    else if(e.target.id==="GPIO20M"){
        socket.emit("GPIO20",1);
        document.getElementById("GPIO20").checked=1;
    }
    else if(e.target.id==="GPIO21M"){
        socket.emit("GPIO21",1);
        document.getElementById("GPIO21").checked=1;
    }
    else if(e.target.id==="GPIO16M"){
        socket.emit("GPIO16",1);
        
    }
}

function ReportMouseUp(e){
    if(e.target.id==="GPIO26M"){
        socket.emit("GPIO26",0);
        document.getElementById('GPIO26').checked=0;
    }
    else if(e.target.id==="GPIO20M"){
        socket.emit("GPIO20",0);
        document.getElementById("GPIO20").checked=0;
    }
    else if(e.target.id==="GPIO21M"){
        socket.emit("GPIO21",0);
        document.getElementById("GPIO21").checked=0;
    }
    else if(e.target.id==="GPIO16M"){
        socket.emit("GPIO16");
        document.getElementById("GPIO16").checked=0;
    }
}

function TouchMove(e){

}

// -------------

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };
  