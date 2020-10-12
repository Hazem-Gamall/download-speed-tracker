document.addEventListener('DOMContentLoaded', function(){
    var checkbox = document.getElementById('checkbox_id');

    chrome.storage.local.get(['checked'], function(result){

        checkbox.checked = result.checked;

        var checkbox_span = document.getElementById('checkbox_span');
        checkboxState(checkbox, checkbox_span);
        
    });


    checkbox.addEventListener('click', function(){
        checkboxState(checkbox, checkbox_span);
    });
    
});

function checkboxState(checkbox, checkbox_span){
    if(checkbox.checked){
        checkbox_span.textContent = "uncheck for chrome method (this method is experimental and unreliable but doesn't use extra data)";
    }else{
        checkbox_span.textContent = "check to use a file for the download test? (continuous and consistent but will use data to download the file for each speed update)";
    }

    chrome.storage.local.set({checked: checkbox.checked},function(){});
}
