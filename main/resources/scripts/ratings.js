function ViewRatings(SliderRatings) {
    var DivRating = document.getElementsByClassName("rating");
  
    for (var i = 0; i < DivRating.length; i += 1) {
        if (SliderRatings.checked == true){
            DivRating[i].style.display = "block";
        } 
        else {
            DivRating[i].style.display = "none";
        }
    }

    document.getElementsByClassName("input-slider")[0].checked = SliderRatings.checked
    document.getElementsByClassName("input-slider")[1].checked = SliderRatings.checked
}