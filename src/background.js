chrome.browserAction.setBadgeBackgroundColor({color: "#20B2AA"});

chrome.storage.local.get(['checked'], function(result){
    trackingMethodCheck = result.checked;

    if(!trackingMethodCheck){
        chromeMethod();
    }else{
        fileMethod();
    }

});

chrome.storage.onChanged.addListener(function(changes, namespace){
    chrome.runtime.reload();
})



function chromeMethod(){
    navigator.connection.onchange = function(){
        chrome.browserAction.setBadgeText({text: (navigator.connection.downlink/8).toFixed(1).toString()+ 'M'})    
    }
    chrome.browserAction.setBadgeText({text: (navigator.connection.downlink/8).toFixed(1).toString() + 'M'})
}


function fileMethod(){
    var imageAddr = "https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF.jpg"; 
    var downloadSize = 1194476; //bytes
    
    var startTime, endTime;
    var download = new Image();
    
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
        var timeOut = setTimeout(MeasureConnectionSpeed,5000);
    }
    
    download.onerror = function (err, msg) {
        chrome.browserAction.setBadgeText({text: '0'});
    
    }
    
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
    
        var speedBps = (downloadSize / duration).toFixed(0);
        var speedKbps = (speedBps / 1024).toFixed(0);
        var speedMbps = (speedKbps / 1024).toFixed(1);
    
        if(speedBps < 1024){
            chrome.browserAction.setBadgeText({text: speedBps + 'B'});
        }else if(speedKbps < 1024){
            chrome.browserAction.setBadgeText({text: speedKbps + 'K'}); 
        }else{
            chrome.browserAction.setBadgeText({text: speedMbps + 'M'});    
        }
    }
    
    
    
    // var timer = setInterval(MeasureConnectionSpeed, 5000);
    
    function MeasureConnectionSpeed() {
        
        startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;  
        download.src = imageAddr + cacheBuster;
        
    }        
    
    MeasureConnectionSpeed();
}


