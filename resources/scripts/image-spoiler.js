/* прокрутка изобржений под спойлером */
function ChangeNumberImage(ImageClick, MaxNumber, SpoilerName) {
    Path = ImageClick.src;
    Path = Path.slice(0, Path.lastIndexOf("/")+1);
    
    AllImage = ImageClick.parentNode.parentNode;

    /* изменение номера центрального изображения */
    for (let i = 0; i < AllImage.childNodes.length; i++) {
        if ((AllImage.childNodes[i].tagName == "IMG") && (AllImage.childNodes[i].id == "center")) {
            NumberImage = AllImage.childNodes[i].src;
            NumberImage = NumberImage.slice(NumberImage.lastIndexOf("/")+1, NumberImage.lastIndexOf("."));
            
            if (ImageClick.parentNode.id == "right") {
                if (NumberImage == MaxNumber) {
                    NumberImage = "1";
                }
                else{
                    NumberImage = String(Number(NumberImage) + 1);
                }
    
                if (NumberImage < 10) {
                    AllImage.childNodes[i].src = Path + "0" + NumberImage + ".png";
                }
                else {
                    AllImage.childNodes[i].src = Path + NumberImage + ".png";
                }
            }
            else if (ImageClick.parentNode.id == "left") {
                if (NumberImage == "01") {
                    NumberImage = String(MaxNumber);
                }
                else{
                    NumberImage = String(Number(NumberImage) - 1);
                }
    
                if (NumberImage < 10) {
                    AllImage.childNodes[i].src = Path + "0" + NumberImage + ".png";
                }
                else {
                    AllImage.childNodes[i].src = Path + NumberImage + ".png";
                }
            }
        }
    }

    /* ширина центрального изображения */
    for (let i = 0; i < AllImage.childNodes.length; i++) {
        if ((AllImage.childNodes[i].tagName == "IMG") && (AllImage.childNodes[i].id == "center")) {
            WidthCenterImage = AllImage.childNodes[i].width;
        }
    }

    /* отступ боковых изображений */
    IndentSideImages = (window.screen.width / 2) - (WidthCenterImage / 2) - 100;

    /* изменение номеров боковых изображений */
    for (let i = 0; i < AllImage.childNodes.length; i++) {
        if (AllImage.childNodes[i].tagName == "DIV") {
            NumberImage = AllImage.childNodes[i].childNodes[1].src;
            NumberImage = NumberImage.slice(NumberImage.lastIndexOf("/")+1, NumberImage.lastIndexOf("."));
            
            /* отступ боковых изображений */
            if (AllImage.childNodes[i].id == "right") {
                AllImage.childNodes[i].style.right = IndentSideImages + "px";
            }
            else if (AllImage.childNodes[i].id == "left") {
                AllImage.childNodes[i].style.left = IndentSideImages + "px";
            }

            if (ImageClick.parentNode.id == "right") {
                if (NumberImage == MaxNumber) {
                    NumberImage = "1";
                }
                else{
                    NumberImage = String(Number(NumberImage) + 1);
                }
    
                if (NumberImage < 10) {
                    AllImage.childNodes[i].childNodes[1].src = Path + "0" + NumberImage + ".png";
                }
                else {
                    AllImage.childNodes[i].childNodes[1].src = Path + NumberImage + ".png";
                }
            }
            else if (ImageClick.parentNode.id == "left") {
                if (NumberImage == "01") {
                    NumberImage = String(MaxNumber);
                }
                else{
                    NumberImage = String(Number(NumberImage) - 1);
                }
    
                if (NumberImage < 10) {
                    AllImage.childNodes[i].childNodes[1].src = Path + "0" + NumberImage + ".png";
                }
                else {
                    AllImage.childNodes[i].childNodes[1].src = Path + NumberImage + ".png";
                }
            }
        }
    }

    /* вывод подписи */
    Spoilers = document.getElementsByClassName("image-spoiler");
    for (let i = 0; i < Spoilers.length; i++) {
        if (Spoilers[i].id == SpoilerName) {
            NumberImage = AllImage.childNodes[3].src;
            NumberImage = NumberImage.slice(NumberImage.lastIndexOf("/")+1, NumberImage.lastIndexOf("."));

            CenterBlock = Spoilers[i].childNodes[3];
            for (let j = 0; j < CenterBlock.childNodes.length; j++) {
                if (CenterBlock.childNodes[j].tagName == "SPAN") {
                    if (CenterBlock.childNodes[j].id == NumberImage) {
                        CenterBlock.childNodes[j].style.visibility = "visible";
                    }
                    else{
                        CenterBlock.childNodes[j].style.visibility = "hidden";
                    }
                }
            }
            
            break;
        }
    }
}