/**
 * Created by seandove on 10/3/16.
 */
var first_card_clicked = null;

var second_card_clicked = null;

var total_possible_matches = 9;

var match_counter = 0;

var attempts = 0;

var accuracy = 0;

var games_played = 0;

var board_clickable = true;


$(document).ready(function () {
    $(".card").click(card_clicked);
    $('.reset').click(reset_button);

});
//this is the first card clicked
function card_clicked() {
    if (board_clickable != true){
        return;
    }
    $(this).find('.back').hide();
    $(this).off('click');
// check to find out if its the first card
    if (first_card_clicked === null) {
        first_card_clicked = this;
        //turns off first card click so you cant match same card
        return;
    }
// Its the second card
    else {
        second_card_clicked = this;
        attempts++;
        display_stats();
        var first_card = $(first_card_clicked).find('img').attr('src');
        var second_card = $(second_card_clicked).find('img').attr('src');

// compare the two cards
        //cards match
        if (first_card === second_card) {
            match_counter++;
            display_stats();
            console.log('card 1: ', first_card_clicked, 'card 2: ', second_card_clicked);
            console.log('first_card : ', first_card, 'second_card : ',second_card);
            first_card_clicked = null;
            second_card_clicked = null;

            if (match_counter == total_possible_matches) {
                $('#game-area').append($('<h1>').html("YOU WIN!!!").css("color", "white"));
            }
        }
        //cards don't match
        else {
            //$('.card').off('click');
            board_clickable = false;
            resetCardsAfterNoMatch();
        }
    }
}

function resetCardsAfterNoMatch() {
    setTimeout(function () {
        // flip / hide both cards then set to null
        $(first_card_clicked).find('.back').show();
        $(second_card_clicked).find('.back').show();
        $(first_card_clicked).click(card_clicked);
        $(second_card_clicked).click(card_clicked);
        first_card_clicked = null;
        second_card_clicked = null;
        console.log('this is the settimeout function running');
        board_clickable = true;


    }, 1000);
}
function display_stats(){
    if (attempts != 0) {
        var accuracy = Math.floor((match_counter / attempts) * 100)
    }else {
        accuracy = 0;
    }
        accuracy_percentage = accuracy + '%';
        $('.attempts > .value').text(attempts);
        $('.match_counter > .value').text(match_counter);
        $('.accuracy > .value').text(accuracy_percentage);
        $('.games_played .value').text(games_played);

}

function reset_stats(){
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
    display_stats();
}

function reset_button(){
    games_played++;
    reset_stats();
    display_stats();
    $('.back').show();
    $(".card").click(card_clicked);
    board_clickable = true;
}

//todo work out bugs and stat functions



//create a click event


//first card clicked is null
//show first card clicked/ show card face, set first_card_clicked variable
//click second card show
// if second card is = to first card
//if all cards match show to the user they have won
//keep both card faces shown
//if not show card back on both cards clicked: reset variables


