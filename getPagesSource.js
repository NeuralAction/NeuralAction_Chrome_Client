var serialized_html = DOMtoString(document);

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

function DOMtoString(document_root) {
    var html = '';
    var all = document.getElementsByTagName("*");

    
    for (var i=0, max=all.length; i < max; i++) {
        if(all[i].localName == "button" || (all[i].localName == "input" && all[i].type != "hidden") || all[i].localName == "textarea") {

        var elemRect = all[i].getBoundingClientRect();

         html += all[i].outerHTML+ "\n\nwidth : " + getStyle(all[i], "width") + " height : " + getStyle(all[i], "height") + " left : " + elemRect.left + " top : " + elemRect.top + "\n\n";
        }
    }

    return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});