/* при загрузке страницы */
function PageOnload() {
    /* после загрузки */
    window.onload = function() {
        /* запрет на открытие картинок */
        document.oncontextmenu = disablecontext;

        /* ===============ИЗМЕНЕНИЕ РАЗМЕРОВ=============== */

        /* изменение размеров отступов боковых изображений */
        ChangeSizeImage(document.getElementsByTagName("center"));
    }
}

/* запрет на открытие картинок */
function disablecontext(e) {
	var clickedEl = (e==null) ? event.srcElement.tagName : e.target.tagName;
    
	if (clickedEl == "IMG") {
		return false;
	}
}

/* ===============ИЗМЕНЕНИЕ РАЗМЕРОВ=============== */

/* изменение размеров отступов */
function ChangeSizeImage(Elements) {
    WidthScreen = document.documentElement.clientWidth;

    /* ширина центрального изображения */
    if (Elements[0].childNodes[1].tagName == "IMG") {
        WidthCenterImage = Elements[0].childNodes[1].width;
        StandartHeightCenterImage = Elements[0].childNodes[1].naturalHeight;
        StandartWidthCenterImage = Elements[0].childNodes[1].naturalWidth;

        /* высота центрального изображения */
        HeightCenterImage = StandartHeightCenterImage / (StandartWidthCenterImage / WidthCenterImage);
    }

    /* настройка отступа боковых изображений */
    if (WidthCenterImage > (WidthScreen * 0.75)) {
        IndentSideImages = (WidthScreen / 2) - (WidthCenterImage / 2) - 100;
    }
    else if (((WidthScreen / 2) - (WidthCenterImage / 2)) < 150) {
        IndentSideImages = (WidthScreen / 2) - (WidthCenterImage / 2) - 75;
    }
    else {
        IndentSideImages = (WidthScreen / 2) - (WidthCenterImage / 2) - 100;
    }

    /* отступ боковых изображений */
    if (Elements[0].parentNode.childNodes[5].id == "right") {
        Elements[0].parentNode.childNodes[5].style.right = IndentSideImages + "px";
    }
    if (Elements[0].parentNode.childNodes[1].id == "left") {
        Elements[0].parentNode.childNodes[1].style.left = IndentSideImages + "px";
    }

    /* высота боковых изображений */
    Elements[0].parentNode.childNodes[1].style.height = (HeightCenterImage - 75) + "px";
    Elements[0].parentNode.childNodes[5].style.height = (HeightCenterImage - 75) + "px";

    /* центровка боковых изображений по вертикали */
    Elements[0].parentNode.childNodes[1].style.marginTop = (((400 - HeightCenterImage) / 2) + 75) + "px";
    Elements[0].parentNode.childNodes[5].style.marginTop = (((400 - HeightCenterImage) / 2) + 75) + "px";
}