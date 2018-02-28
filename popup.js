chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "GetObjectinhtml") {
      sendNativeMessage(request.source);
    }
  });

  function onWindowLoad() {
  
    var message = document.querySelector('#message');
    chrome.tabs.executeScript(null, {
      file: "GetObjectinhtml.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
    connect();
  }
  
  window.onload = onWindowLoad;

  function appendMessage(text) {
    document.getElementById('message').innerHTML += "<p>" + text + "</p>";
  }

  function sendNativeMessage(text) {
    message = {"text": text};
    port.postMessage(message);
    appendMessage("Sent message: <b>" + JSON.stringify(message) + "</b>");
  }
  
  function onNativeMessage(message) {
    appendMessage("Received message: <b>" + JSON.stringify(message) + "</b>");
  }
  
  function onDisconnected() {
    appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
    port = null;
  }

  function connect() {
    var hostName = "neuralactiontest";
    appendMessage("Connecting to native messaging host <b>" + hostName + "</b>");
    port = chrome.runtime.connectNative(hostName);
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);
  }