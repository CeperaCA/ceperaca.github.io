/*добавление человека*/
function AddPeople() {
    /*количество уже введённых людей*/
    let CountPeople = document.getElementsByClassName("people").length;
    
    /*если ввёдена не пустота*/
    if (document.getElementsByClassName("input-people")[0].value != ''){
        document.getElementsByClassName("name")[0].innerHTML = document.getElementsByClassName("name")[0].innerHTML + "<div class='people'>" + document.getElementsByClassName("input-people")[0].value + " <button onclick='DeletePeople()' class='delete-people' id='" + CountPeople + "'>x</button></div>";
    }
    
    document.getElementsByClassName("input-people")[0].value = '';
}

/*удаление человека*/
function DeletePeople(){
    document.onclick = function(e) {
        /*по чему можно кликнуть, чтобы удалить*/
        if (e.target.className == "delete-people") {
            /*удалить*/
            document.getElementsByClassName("people")[e.target.id].remove();
            
            /*количество уже введённых людей*/
            let CountPeople = document.getElementsByClassName("people").length;

            /*переприсваивание номеров кнопок удаления*/
            for (let i = 0; i <= CountPeople-1; i++) {
                document.getElementsByClassName("delete-people")[i].id = i;
            }
        } 
    };
}

/*целочисленный рандом*/
function GetRandom(digit) {
    return Math.floor(Math.random()*Math.floor(digit));
}

/*выбор игрока*/
function CheckPeople() {
    let CountPeople = document.getElementsByClassName("people").length;

    /*если добавлено 2 и более игрока*/
    if (CountPeople >= 2){
        document.getElementsByClassName("round-name")[0].innerHTML = "<b>Ход игрока:</b> " + document.getElementsByClassName("people")[GetRandom(CountPeople)].textContent.slice(0,-1) + "<br/><br/>";
        
        /*если кнопки выбора не созданы*/
        if (document.getElementsByClassName("button")[0].getElementsByTagName("input").length == 0){
            /*создать кнопку правды*/
            let ButtonTruth = document.createElement("input");
            /*настройки*/
            ButtonTruth.type = "button";
            ButtonTruth.className = "button-truth";
            ButtonTruth.value = "Правда";
            ButtonTruth.onclick = CheckTruth;
            /*добавить*/
            document.getElementsByClassName("button")[0].append(ButtonTruth);

            /*создать кнопку случайного выбора*/
            let ButtonRandom = document.createElement("input");
            /*настройки*/
            ButtonRandom.type = "button";
            ButtonRandom.className = "button-random";
            ButtonRandom.value = "Случайный выбор";
            ButtonRandom.onclick = CheckRandom;
            /*добавить*/
            document.getElementsByClassName("button")[0].append(ButtonRandom);

            /*создать кнопку действия*/
            let ButtonDare = document.createElement("input");
            /*настройки*/
            ButtonDare.type = "button";
            ButtonDare.className = "button-dare";
            ButtonDare.value = "Действие";
            ButtonDare.onclick = CheckDare;
            /*добавить*/
            document.getElementsByClassName("button")[0].append(ButtonDare);

            /*добавить текст задания*/
            document.getElementsByClassName("button")[0].append(document.createElement("p"));
        }
        else{
            /*очистка текста задания*/
            document.getElementsByClassName("button")[0].getElementsByTagName("p")[0].innerHTML = '';
        }
    }
    else{
        /*очистить выбранного игрока*/
        document.getElementsByClassName("round-name")[0].innerHTML = "<b>Ход игрока:</b> ";
        /*удалить кнопки*/
        document.getElementsByClassName("button")[0].getElementsByTagName("input")[0].remove();
        document.getElementsByClassName("button")[0].getElementsByTagName("input")[0].remove();
        document.getElementsByClassName("button")[0].getElementsByTagName("input")[0].remove();
        /*удалить текст задания*/
        document.getElementsByClassName("button")[0].getElementsByTagName("p")[0].remove();

        /*подсказка*/
        alert("Добавьте минимум 2х игроков");
    }
}

/*выбор правды*/
function CheckTruth() {
    /*номер случайного задания*/
    let num = GetRandom(document.getElementsByClassName("truth")[0].childElementCount);

    /*настройка текста задания*/
    document.getElementsByClassName("button")[0].getElementsByTagName("p")[0].innerHTML = document.getElementsByClassName("round-name")[0].textContent.slice(12, -1) + ", " + document.getElementsByClassName("truth")[0].getElementsByTagName("p")[num].textContent;
}

/*выбор действия*/
function CheckDare() {
    /*номер случайного задания*/
    let num = GetRandom(document.getElementsByClassName("dare")[0].childElementCount);

    /*настройка текста задания*/
    document.getElementsByClassName("button")[0].getElementsByTagName("p")[0].innerHTML = document.getElementsByClassName("round-name")[0].textContent.slice(12, -1) + ", " + document.getElementsByClassName("dare")[0].getElementsByTagName("p")[num].textContent;
}

/*случайный выбор*/
function CheckRandom() {
    if (GetRandom(2) == 0){
        CheckTruth();
    }
    else{
        CheckDare();
    }
}