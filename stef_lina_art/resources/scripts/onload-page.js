// при загрузке страницы
function PageOnload() {
    // после загрузки
    window.onload = function() {
        // запрет на открытие картинок
        document.oncontextmenu = disablecontext;

        // изменение размеров изображений
        ChangeSizeImage(document.getElementsByTagName("center")[0]);
    }
}

// запрет на открытие картинок
function disablecontext(e) {
	var clickedEl = (e==null) ? event.srcElement.tagName : e.target.tagName;
    
	if (clickedEl == "IMG") {
		return false;
	}
}

// изменение размеров изображений
function ChangeSizeImage(ParentCenterImage) {
    // блок галереи
    let DivGallery = ParentCenterImage.parentNode;
    // центральное изображение
    let CenterImage = ParentCenterImage.childNodes[1];
    // левое изображение
    let LeftImage = DivGallery.childNodes[1];
    // правое изображение
    let RightImage = DivGallery.childNodes[5];

    // ширина и высота экрана
    let WidthScreen = document.documentElement.clientWidth;
    let HeightScreen = document.documentElement.clientHeight;

    // настройка ширины и высоты блока галереи, а также левого/верхнего отступа
    if (WidthScreen < HeightScreen) {
        // портрет
        DivGallery.style.height = HeightScreen + "px";

        DivGallery.style.width = (WidthScreen * 0.85) + "px";
        DivGallery.style.marginLeft = ((WidthScreen * 0.15) / 2) + "px";
    }
    else{
        // альбом
        DivGallery.style.height = (HeightScreen * 0.75) + "px";
        DivGallery.style.marginTop = ((HeightScreen * 0.25) / 2) + "px";

        DivGallery.style.width = WidthScreen + "px";
    }

    // ширина центрального изображения
    let WidthCenterImage = CenterImage.width;
    // стандартная ширина и высота центрального изображения
    let StandartHeightCenterImage = CenterImage.naturalHeight;
    let StandartWidthCenterImage = CenterImage.naturalWidth;
    // высота центрального изображения
    let HeightCenterImage = StandartHeightCenterImage / (StandartWidthCenterImage / WidthCenterImage);

    // настройка высоты боковых изображений
    LeftImage.style.height = (HeightCenterImage * 0.9) + "px";
    RightImage.style.height = (HeightCenterImage * 0.9) + "px";

    // высота боковых изображений
    let HeightSideImage = LeftImage.clientHeight;
    // высота блока галереи
    let HeightDivGallery = DivGallery.clientHeight;

    // настройка верхнего отступа боковых изображений
    LeftImage.style.marginTop = ((HeightDivGallery - HeightSideImage) / 2) + "px";
    RightImage.style.marginTop = ((HeightDivGallery - HeightSideImage) / 2) + "px";

    // высота блока галереи
    let WidthDivGallery = DivGallery.clientWidth;

    // настройка ширины боковых изображений
    if (WidthScreen < HeightScreen) {
        // портрет
        LeftImage.style.width = (WidthDivGallery * 0.25) + "px";
        RightImage.style.width = (WidthDivGallery * 0.25) + "px";
    }
    else{
        // альбом
        LeftImage.style.width = (WidthDivGallery * 0.05) + "px";
        RightImage.style.width = (WidthDivGallery * 0.05) + "px";
    }
    
    // ширина боковых изображений
    let WidthSideImage = LeftImage.clientWidth;
    // отступ бокового изображения
    let SideIndentImages = ((WidthScreen - WidthCenterImage) / 2) - WidthSideImage;

    // настройка отступов боковых изображений
    if (WidthScreen < HeightScreen) {
        // портрет
        LeftImage.style.left = "0px";
        RightImage.style.right = "0px";
    }
    else{
        // альбом
        LeftImage.style.left = SideIndentImages + "px";
        RightImage.style.right = SideIndentImages + "px";
    }
}