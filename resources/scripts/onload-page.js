/* при загрузке страницы */
function PageOnload() {
    /* после загрузки */
    window.onload = function() {
        /* запрет на открытие картинок */
        document.oncontextmenu = disablecontext;

        /* прокрутка страницы */
        PageScroll();

        /* ===============ИЗМЕНЕНИЕ РАЗМЕРОВ=============== */

        /* размер шрифта */
        const FontSize = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]);

        /* изменение размеров отступов блоков */
        ChangeSizeMargin(document.getElementsByClassName("p"), FontSize);
        ChangeSizeMargin(document.getElementsByClassName("company"), FontSize);

        /* изменение высоты спойлеров */
        ChangeSizeSpoilers(document.getElementsByTagName("details"));

        /* изменение высоты линий */
        ChangeSizeLines(document.getElementsByTagName("hr"), Math.trunc(FontSize/9));

        /* изменение высоты картинок карьеры */
        ChangeSizeCompaniesImages(FontSize*6);

        /* изменение высоты картинок просмотра */
        ChangeSizePlayImages(document.getElementsByClassName("play"), FontSize);

        /* изменение высоты и ширины слайдера */
        ChangeSizeSliders(FontSize);

        /* изменение высоты картинок-ссылок проектов */
        ChangeSizeLinksImages(document.getElementsByTagName("img"), FontSize);

        /* изменение отступа слева у списков */
        ChangeSizeUlPaddingLeft(document.getElementsByTagName("ul"), FontSize);

        /* изменение высоты картинок в ссылках на меня */
        ChangeSizeMyLinksImages(document.getElementsByTagName("img"), FontSize);

        /* изменение отступов боковых изображений */
        ChangeIndentSideImages(document.getElementsByClassName("image-spoiler"));
    }
}

/* запрет на открытие картинок */
function disablecontext(e) {
	var clickedEl = (e==null) ? event.srcElement.tagName : e.target.tagName;
    
	if (clickedEl == "IMG") {
		return false;
	}
}

/*прокрутка страницы*/
function PageScroll() {
    tempST = 0;

    document.body.addEventListener('scroll', function(event) {
        currentST = event.target.scrollTop;

        if (currentST >= document.documentElement.clientHeight) {
            document.getElementsByClassName("up")[0].style.display = "block";
        }
        else {
            document.getElementsByClassName("up")[0].style.display = "none";
        }

        /* создание объекта стиля */
        objStyle = document.createElement("style");
        objStyle.className = "style-scrollbar";
        if (!document.querySelector(".style-scrollbar")) {
            document.head.appendChild(objStyle);
        }

        if (currentST > tempST) {
            document.getElementsByClassName("style-scrollbar")[0].innerHTML = "body.scrollbar-yes::-webkit-scrollbar-thumb {background-image: url('resources/images/falcon9-down.png');}";
        }
        else {
            document.getElementsByClassName("style-scrollbar")[0].innerHTML = "body.scrollbar-yes::-webkit-scrollbar-thumb {background-image: url('resources/images/falcon9-up.png');}";
        }

        tempST = currentST;
    });
}

/* ===============ИЗМЕНЕНИЕ РАЗМЕРОВ=============== */

/* изменение размеров отступов */
function ChangeSizeMargin(Elements, FontSize) {
    for (let i = 0; i < Elements.length; i++) {
        if (Elements[i].tagName == "DIV") {
            Elements[i].style.marginTop = FontSize + "px";
            Elements[i].style.marginBottom = FontSize + "px";
        }
    }
}

/* изменение высоты спойлеров */
function ChangeSizeSpoilers(Elements) {
    const SpoilersHeight = getComputedStyle(document.getElementsByTagName("summary")[0]).height;

    document.head.appendChild(document.createElement("style")).innerHTML = "details:not([open]) {height: " + SpoilersHeight + ";}";
}

/* изменение высоты линий */
function ChangeSizeLines(Elements, FontSize) {
    for (let i = 0; i < Elements.length; i++) {
        Elements[i].style.height = FontSize + "px";
    }
}

/* изменение высоты картинок карьеры */
function ChangeSizeCompaniesImages(FontSize) {
    ElementsDivCompany = document.getElementsByClassName("company");
    for (let i = 0; i < ElementsDivCompany.length; i++) {
        ElementsDivCompany[i].style.minHeight = FontSize + "px";
    }

    ElementsDivCompanyIcon = document.getElementsByClassName("company-icon");
    for (let i = 0; i < ElementsDivCompanyIcon.length; i++) {
        for (let j = 0; j < ElementsDivCompanyIcon[i].childNodes.length; j++) {
            if (ElementsDivCompanyIcon[i].childNodes[j].tagName == "IMG") {
                ElementsDivCompanyIcon[i].childNodes[j].style.height = FontSize + "px";
            }
        }
    }

    ElementsDivCompanyInformation = document.getElementsByClassName("company-information");
    for (let i = 0; i < ElementsDivCompanyInformation.length; i++) {
        ElementsDivCompanyInformation[i].style.marginLeft = (FontSize + 40) + "px";
    }
}

/* изменение высоты картинок просмотра */
function ChangeSizePlayImages(Elements, FontSize) {
    for (let i = 0; i < Elements.length; i++) {
        if (Elements[i].tagName == "IMG") {
            Elements[i].style.height = FontSize + "px";
        }
    }
}

/* изменение высоты и ширины слайдера */
function ChangeSizeSliders(FontSize) {
    ElementsLabelSwitch = document.getElementsByClassName("switch");
    for (let i = 0; i < ElementsLabelSwitch.length; i++) {
        ElementsLabelSwitch[i].style.height = FontSize + "px";
        ElementsLabelSwitch[i].style.width = (FontSize * 2) + "px";
    }

    if (FontSize > 10) {
        document.head.appendChild(document.createElement("style")).innerHTML = "span.slider:before {height: " + (FontSize - 6) + "px; width: " + (FontSize - 6) + "px; left: 3px; bottom: 3px;}";
    }
    else {
        document.head.appendChild(document.createElement("style")).innerHTML = "span.slider:before {height: " + (FontSize - 4) + "px; width: " + (FontSize - 4) + "px; left: 2px; bottom: 2px;}";
    }

    document.head.appendChild(document.createElement("style")).innerHTML = "input:checked + span.slider:before {transform: translateX(: " + FontSize + "px); -webkit-transform: translateX(" + FontSize + "px); -ms-transform: translateX(" + FontSize +"px); -moz-transform: translateX(" + FontSize +"px); -0-transform: translateX(" + FontSize +"px);}";
}

/* изменение высоты картинок-ссылок проектов */
function ChangeSizeLinksImages(Elements, FontSize) {
    for (let i = 0; i < Elements.length; i++) {
        if ((Elements[i].parentNode.parentNode.tagName == "DIV") && ((Elements[i].parentNode.parentNode.className == "download"))) {
            Elements[i].parentNode.style.height = (FontSize * 2) + "px";
            Elements[i].parentNode.parentNode.style.height = (FontSize * 2) + "px";
            Elements[i].parentNode.parentNode.style.paddingLeft = FontSize + "px";
        }
    }
}

/* изменение отступа слева у списков */
function ChangeSizeUlPaddingLeft(Elements, FontSize) {
    for (let i = 0; i < Elements.length; i++) {
        Elements[i].style.paddingLeft = (FontSize * 2) + "px";
    }
}

/* изменение высоты картинок в ссылках на меня */
function ChangeSizeMyLinksImages(Elements, FontSize) {
    for (let i = 0; i < Elements.length; i++) {
        if ((Elements[i].parentNode.tagName == "DIV") && ((Elements[i].parentNode.className == "icon"))) {
            Elements[i].style.height = (FontSize * 2) + "px";
            Elements[i].parentNode.style.height = (FontSize * 2) + "px";
            Elements[i].parentNode.parentNode.style.height = (FontSize * 2) + "px";
            Elements[i].parentNode.parentNode.childNodes[3].style.marginLeft = (FontSize * 2) + "px";
        }

        if ((Elements[i].parentNode.parentNode.tagName == "DIV") && ((Elements[i].parentNode.parentNode.className == "icon"))) {
            Elements[i].style.height = (FontSize * 2) + "px";
            Elements[i].parentNode.parentNode.style.height = (FontSize * 2) + "px";
            Elements[i].parentNode.parentNode.style.width = (FontSize * 2) + "px";
            Elements[i].parentNode.parentNode.parentNode.style.height = (FontSize * 2) + "px";
        }
    }
}

/* изменение отступов боковых изображений */
function ChangeIndentSideImages(Elements) {
    for (let i = 0; i < Elements.length; i++) {
        if (Elements[i].childNodes[1].tagName == "CENTER") {
            /* ширина центрального изображения */
            PercentageProportion = 500 * 100 / Elements[i].childNodes[1].childNodes[3].height;
            WidthCenterImage = Elements[i].childNodes[1].childNodes[3].width * PercentageProportion / 100;
            
            /* отступ боковых изображений */
            IndentSideImages = (window.screen.width / 2) - (WidthCenterImage / 2) - 100;

            /* отступ боковых изображений */
            Elements[i].childNodes[1].childNodes[1].style.left = IndentSideImages + "px";
            Elements[i].childNodes[1].childNodes[5].style.right = IndentSideImages + "px";
        }
    }
}