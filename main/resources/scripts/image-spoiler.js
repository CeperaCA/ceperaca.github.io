/* прокрутка изобржений под спойлером */
function ChangeNumberImage(ImageClick, MaxNumber, SpoilerName) {
    WidthScreen = document.documentElement.clientWidth;

    Path = ImageClick.src;
    Path = Path.slice(0, Path.lastIndexOf("/")+1);
    
    AllImage = ImageClick.parentNode.parentNode;

    /* изменение номера центрального изображения */
    if ((AllImage.childNodes[3].tagName == "IMG") && (AllImage.childNodes[3].id == "center")) {
        NumberImage = AllImage.childNodes[3].src;
        NumberImage = NumberImage.slice(NumberImage.lastIndexOf("/")+1, NumberImage.lastIndexOf("."));
        
        if (ImageClick.parentNode.id == "right") {
            if (NumberImage == MaxNumber) {
                NumberImage = "1";
            }
            else{
                NumberImage = String(Number(NumberImage) + 1);
            }

            if (NumberImage < 10) {
                AllImage.childNodes[3].src = Path + "0" + NumberImage + ".png";
            }
            else {
                AllImage.childNodes[3].src = Path + NumberImage + ".png";
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
                AllImage.childNodes[3].src = Path + "0" + NumberImage + ".png";
            }
            else {
                AllImage.childNodes[3].src = Path + NumberImage + ".png";
            }
        }
    }

    /* ширина центрального изображения */
    if ((AllImage.childNodes[3].tagName == "IMG") && (AllImage.childNodes[3].id == "center")) {
        WidthCenterImage = AllImage.childNodes[3].width;
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

    /* изменение высоты боковых изображений и центровка по вертикали*/
    for (let i = 0; i < AllImage.childNodes.length; i++) {
        if (AllImage.childNodes[i].tagName == "DIV") {    
            StandartHeightCenterImage = AllImage.childNodes[3].naturalHeight;
            StandartWidthCenterImage = AllImage.childNodes[3].naturalWidth;
            WidthCenterImage = AllImage.childNodes[3].width;

            /* высота центрального изображения */
            HeightCenterImage = StandartHeightCenterImage / (StandartWidthCenterImage / WidthCenterImage);
            
            /* высота боковых изображений */
            AllImage.childNodes[i].style.height = (HeightCenterImage - 75) + "px";

            /* центровка боковых изображений по вертикали */
            AllImage.childNodes[i].style.marginTop = (((400 - HeightCenterImage) / 2) + 75) + "px";
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

/* изменение отступов боковых изображений */
function ChangeSizeImage(SpoilerClick) {
    SpoilerClick = SpoilerClick.parentNode;

    if (SpoilerClick.childNodes[3].childNodes[1].tagName == "CENTER") {
        StandartWidthCenterImage = SpoilerClick.childNodes[3].childNodes[1].childNodes[3].width;
        StandartHeightCenterImage = SpoilerClick.childNodes[3].childNodes[1].childNodes[3].height;
        WidthScreen = document.documentElement.clientWidth;

        /* ширина центрального изображения */
        WidthCenterImage = StandartWidthCenterImage * 500 / StandartHeightCenterImage;

        /* отступ боковых изображений */
        if (WidthCenterImage > (WidthScreen * 0.75)) {
            /* новая ширина центрального изображения */
            WidthCenterImage = WidthScreen * 0.75;  
    
            IndentSideImages = (WidthScreen / 2) - (WidthCenterImage / 2) - 50;
        }
        else if (((WidthScreen / 2) - (WidthCenterImage / 2)) < 150) {
            IndentSideImages = (WidthScreen / 2) - (WidthCenterImage / 2) - 65;
        }
        else {
            IndentSideImages = (WidthScreen / 2) - (WidthCenterImage / 2) - 100;
        }

        /* отступ боковых изображений */
        SpoilerClick.childNodes[3].childNodes[1].childNodes[1].style.left = IndentSideImages + "px";
        SpoilerClick.childNodes[3].childNodes[1].childNodes[5].style.right = IndentSideImages + "px";

        /* высота центрального изображения */
        HeightCenterImage = StandartHeightCenterImage / (StandartWidthCenterImage / WidthCenterImage);

        /* высота боковых изображений */
        SpoilerClick.childNodes[3].childNodes[1].childNodes[1].style.height = (HeightCenterImage - 100) + "px";
        SpoilerClick.childNodes[3].childNodes[1].childNodes[5].style.height = (HeightCenterImage - 100) + "px";

        /* центровка боковых изображений по вертикали */
        SpoilerClick.childNodes[3].childNodes[1].childNodes[1].style.marginTop = (((475 - HeightCenterImage) / 2) + 50) + "px";
        SpoilerClick.childNodes[3].childNodes[1].childNodes[5].style.marginTop = (((475 - HeightCenterImage) / 2) + 50) + "px";
    }
}