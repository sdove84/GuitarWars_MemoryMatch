/**
 * Created by seandove on 10/3/16.
 */
var first_card_clicked = null;

var second_card_clicked = null;

var total_possible_matches = 2;

var match_counter = 0;

$(document).ready(function(){
    $('.card').click(card_clicked);

});

function card_clicked() {
    reveal_card(this);
    if (first_card_clicked === null) {
        first_card_clicked = this;
        console.log(' this is the first card clicked');
    }
    else {
        second_card_clicked = this;
        var first_card_image = $(first_card_clicked).find(".front img").attr("src");
        var second_card_image = $(second_card_clicked).find(".front img").attr("src");
        console.log("First card img src:", first_card_image);
        console.log("Second card img src:", second_card_image);

        if (first_card_image === second_card_image) {
            console.log('Match');
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;

            if (match_counter !== total_possible_matches) {
                alert("YOU WIN!");
            }
            else {
                match_counter = this;
            }
        }
    }
}
function reveal_card(_this){
    $(_this).find('.back').hide();
}


