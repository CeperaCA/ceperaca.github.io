/* прокрутка изобржений под спойлером */
function ChangeNumberImage(ImageClick, MaxNumber) {
    WidthScreen = document.documentElement.clientWidth;

    Path = ImageClick.src;
    Path = Path.slice(0, Path.lastIndexOf("/")+1);
    
    AllImage = ImageClick.parentNode.parentNode;

    /* изменение номера центрального изображения */
    if ((AllImage.childNodes[3].childNodes[1].tagName == "IMG") && (AllImage.childNodes[3].childNodes[1].id == "center")) {
        NumberImage = AllImage.childNodes[3].childNodes[1].src;
        NumberImage = NumberImage.slice(NumberImage.lastIndexOf("/")+1, NumberImage.lastIndexOf("."));

        if (ImageClick.parentNode.id == "right") {
            if (NumberImage == "0" + String(MaxNumber)) {
                NumberImage = "1";
            }
            else{
                NumberImage = String(Number(NumberImage) + 1);
            }

            if (NumberImage < 10) {
                AllImage.childNodes[3].childNodes[1].src = Path + "00" + NumberImage + ".jpg";
            }
            else {
                AllImage.childNodes[3].childNodes[1].src = Path + "0" + NumberImage + ".jpg";
            }
        }
        else if (ImageClick.parentNode.id == "left") {
            if (NumberImage == "001") {
                NumberImage = String(MaxNumber);
            }
            else{
                NumberImage = String(Number(NumberImage) - 1);
            }

            if (NumberImage < 10) {
                AllImage.childNodes[3].childNodes[1].src = Path + "00" + NumberImage + ".jpg";
            }
            else {
                AllImage.childNodes[3].childNodes[1].src = Path + "0" + NumberImage + ".jpg";
            }
        }
    }

    /* ширина центрального изображения */
    if ((AllImage.childNodes[3].childNodes[1].tagName == "IMG") && (AllImage.childNodes[3].childNodes[1].id == "center")) {
        WidthCenterImage = AllImage.childNodes[3].childNodes[1].width;
    }

    /* отступ боковых изображений */
    if (WidthCenterImage > (WidthScreen * 0.75)) {
        IndentSideImages = (WidthScreen / 2) - (WidthCenterImage / 2) - 100;
    }
    else if (((WidthScreen / 2) - (WidthCenterImage / 2)) < 150) {
        IndentSideImages = (WidthScreen / 2) - (WidthCenterImage / 2) - 75;
    }
    else {
        IndentSideImages = (WidthScreen / 2) - (WidthCenterImage / 2) - 100;
    }

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
                if (NumberImage == "0" + String(MaxNumber)) {
                    NumberImage = "1";
                }
                else{
                    NumberImage = String(Number(NumberImage) + 1);
                }
    
                if (NumberImage < 10) {
                    AllImage.childNodes[i].childNodes[1].src = Path + "00" + NumberImage + ".jpg";
                }
                else {
                    AllImage.childNodes[i].childNodes[1].src = Path + "0" + NumberImage + ".jpg";
                }
            }
            else if (ImageClick.parentNode.id == "left") {
                if (NumberImage == "001") {
                    NumberImage = String(MaxNumber);
                }
                else{
                    NumberImage = String(Number(NumberImage) - 1);
                }
    
                if (NumberImage < 10) {
                    AllImage.childNodes[i].childNodes[1].src = Path + "00" + NumberImage + ".jpg";
                }
                else {
                    AllImage.childNodes[i].childNodes[1].src = Path + "0" + NumberImage + ".jpg";
                }
            }
        }
    }

    /* изменение высоты боковых изображений и центровка по вертикали*/
    for (let i = 0; i < AllImage.childNodes.length; i++) {
        if (AllImage.childNodes[i].tagName == "DIV") {    
            StandartHeightCenterImage = AllImage.childNodes[3].childNodes[1].naturalHeight;
            StandartWidthCenterImage = AllImage.childNodes[3].childNodes[1].naturalWidth;
            WidthCenterImage = AllImage.childNodes[3].childNodes[1].width;

            /* высота центрального изображения */
            HeightCenterImage = StandartHeightCenterImage / (StandartWidthCenterImage / WidthCenterImage);
            
            /* высота боковых изображений */
            AllImage.childNodes[i].style.height = (HeightCenterImage - 75) + "px";

            /* центровка боковых изображений по вертикали */
            AllImage.childNodes[i].style.marginTop = (((400 - HeightCenterImage) / 2) + 75) + "px";
        }
    }
}