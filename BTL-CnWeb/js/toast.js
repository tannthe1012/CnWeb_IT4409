class Toast {
    static toast(message, type) {
         // $(".toast").css("animation","slideInTop ease 0.5s, fadeOut linear 1s 3s forwards");
    var icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-triangle',
        warning: 'fas fa-exclamation-circle',
    };
    console.log(icons[type]);
    var toast = 
        `
            <div class="toast toast-${type}">
            <div class="toast-icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="toast-text">${message}</div>
            <div class="toast-icon toast-close" onclick="closeToast(event)">
                <i class="fas fa-times"></i>
            </div>
        </div>
        `
    ;
    document.getElementById("toast").innerHTML = toast;
    
    // $(".toast-close").on("click", function() {
    //     $(toast).remove();
    // })
    
    setTimeout(function() {
        document.getElementById("toast").innerHTML = "";
    }, 5000);
    }
}
function closeToast(event) {
    document.getElementById("toast").innerHTML = "";
}