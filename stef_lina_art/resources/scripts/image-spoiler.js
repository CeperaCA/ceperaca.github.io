/* прокрутка изобржений под спойлером */
function ChangeNumberImage(ImageClick, MaxNumber) {
    // ширина и высота экрана
    let WidthScreen = document.documentElement.clientWidth;
    let HeightScreen = document.documentElement.clientHeight;

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

    // настройка ширины и высоты блока галереи, а также левого/верхнего отступа
    if (WidthScreen < HeightScreen) {
        // портрет
        AllImage.style.height = HeightScreen + "px";

        AllImage.style.width = (WidthScreen * 0.85) + "px";
        AllImage.style.marginLeft = ((WidthScreen * 0.15) / 2) + "px";
    }
    else{
        // альбом
        AllImage.style.height = (HeightScreen * 0.75) + "px";
        AllImage.style.marginTop = ((HeightScreen * 0.25) / 2) + "px";

        AllImage.style.width = WidthScreen + "px";
    }

    /* изменение номеров боковых изображений */
    for (let i = 0; i < AllImage.childNodes.length; i++) {
        if (AllImage.childNodes[i].tagName == "DIV") {
            NumberImage = AllImage.childNodes[i].childNodes[1].src;
            NumberImage = NumberImage.slice(NumberImage.lastIndexOf("/")+1, NumberImage.lastIndexOf("."));

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
            // ширина центрального изображения
            let WidthCenterImage = AllImage.childNodes[3].childNodes[1].width;
            // стандартная ширина и высота центрального изображения
            let StandartHeightCenterImage = AllImage.childNodes[3].childNodes[1].naturalHeight;
            let StandartWidthCenterImage = AllImage.childNodes[3].childNodes[1].naturalWidth;
            // высота центрального изображения
            let HeightCenterImage = StandartHeightCenterImage / (StandartWidthCenterImage / WidthCenterImage);

            // настройка высоты боковых изображений
            AllImage.childNodes[i].style.height = (HeightCenterImage * 0.9) + "px";

            // высота боковых изображений
            let HeightSideImage = AllImage.childNodes[i].clientHeight;
            // высота блока галереи
            let HeightDivGallery = AllImage.childNodes[3].childNodes[1].clientHeight;

            // настройка верхнего отступа боковых изображений
            AllImage.childNodes[i].style.marginTop = ((HeightDivGallery - HeightSideImage) / 2) + "px";

            // высота блока галереи
            let WidthDivGallery = AllImage.clientWidth;

            // настройка ширины боковых изображений
            if (WidthScreen < HeightScreen) {
                // портрет
                AllImage.childNodes[i].style.width = (WidthDivGallery * 0.25) + "px";
            }
            else{
                // альбом
                AllImage.childNodes[i].style.width = (WidthDivGallery * 0.05) + "px";
            }

            // ширина боковых изображений
            let WidthSideImage = AllImage.childNodes[i].clientWidth;
            // отступ бокового изображения
            let SideIndentImages = ((WidthScreen - WidthCenterImage) / 2) - WidthSideImage;

            // настройка отступов боковых изображений
            if (WidthScreen < HeightScreen) {
                // портрет
                if (AllImage.childNodes[i].id == "left") {
                    AllImage.childNodes[i].style.left = "0px";
                }
                else if (AllImage.childNodes[i].id == "right") {
                    AllImage.childNodes[i].style.right = "0px";
                }
            }
            else{
                // альбом
                if (AllImage.childNodes[i].id == "left") {
                    AllImage.childNodes[i].style.left = SideIndentImages + "px";
                }
                else if (AllImage.childNodes[i].id == "right") {
                    AllImage.childNodes[i].style.right = SideIndentImages + "px";
                }
            }
        }
    }
}