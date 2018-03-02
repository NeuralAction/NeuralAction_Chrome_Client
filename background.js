console.log('awdawd');

function getStyle(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}

function GetObjectinhtml() {
    var html = '';
    var all = document.getElementsByTagName("*");

    for (var i=0, max=all.length; i < max; i++) {
        // check html object
        if(all[i].localName == "button" || (all[i].localName == "input" && all[i].type != "hidden") || all[i].localName == "textarea" || (all[i].localName == "a" && all[i].href != "")) {
        var elemRect = all[i].getBoundingClientRect();
         html += all[i].outerHTML+ "\n\nwidth : " + all[i].offsetWidth + " height : " + getStyle(all[i], "height") + " left : " + elemRect.left + " top : " + elemRect.top + "\n\n";
        }
    }
    return html;
}

function connect() {
    var hostName = "neuralactiontest";
    port = chrome.runtime.connectNative(hostName);
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);
  }

  function sendNativeMessage(text) {
    message = {"text": text};
    port.postMessage(message);
    console.log("Sent message: <b>" + JSON.stringify(message) + "</b>");
  }
  
  function onNativeMessage(message) {
    console.log("Received message: <b>" + JSON.stringify(message) + "</b>");
  }
  
  function onDisconnected() {
    console.log("Failed to connect: " + chrome.runtime.lastError.message);
    port = null;
  }

  chrome.extension.onRequest.addListener(function(data, sender) {
    console.log("ok");
    if (data.length > 0) {
        connect();
        sendNativeMessage(data);
    }
});