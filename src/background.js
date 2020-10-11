var imageAddr = "https://besthqwallpapers.com/img/original/50555/american-wirehair-cat-4k-pets-cute-animals-cats.jpg"; 
var downloadSize = 2430649 ; //bytes

chrome.browserAction.setBadgeBackgroundColor({color: "#20B2AA"});

var timer = setInterval(MeasureConnectionSpeed, 10000);


function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        chrome.browserAction.setBadgeText({text: 'ERR'});
        console.log(err);

    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;  
    download.src = imageAddr + cacheBuster;
    
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
    download = null;
}        
