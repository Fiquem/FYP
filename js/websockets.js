// Test function
function WebSocketTest()
{
    if ("WebSocket" in window)
    {
        alert("WebSocket is supported by your Browser!");
        // Let us open a web socket
        var ws = new WebSocket("ws://localhost:9998/echo");
        ws.onopen = function()
        {
            // Web Socket is connected, send data using send()
            ws.send("Message to send");
            alert("Message is sent...");
        };
        ws.onmessage = function (evt) 
        { 
            var received_msg = evt.data;
            alert("Message is received...");
        };
        ws.onclose = function()
        { 
            // websocket is closed.
            alert("Connection is closed..."); 
        };
    }
    else
    {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }
}

function writeToScreen(message)
{
    output = document.getElementById("output");
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.style.fontSize = "11px";
    pre.innerHTML = message;
    output.appendChild(pre);
}

// Send Message!
function SendMessage(message)
{
    var ws = new WebSocket("ws://emma-fyp.netsoc.tcd.ie:80");
    ws.onopen = function() {
        message_form = document.forms["message_form"];
        message = message_form.elements["message_to_send"].value;
        message_form.elements["message_to_send"].value = "";
        ws.send(message);
    };
    ws.onmessage = function(evt) { writeToScreen(evt.data) };
}