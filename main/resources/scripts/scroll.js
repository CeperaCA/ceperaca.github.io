/* спрятать скроллбар */
function HideShowScrollBar(Time) {
    /* спрятать через время */
    setInterval(() => document.body.className = "scrollbar-no", Time);
    
    /* показать */   
    document.body.addEventListener("scroll", function() {
        document.body.className = "scrollbar-yes";
    });
}

/* поднять наверх */
function PageUp() {
    document.body.scrollTop = 0;
}