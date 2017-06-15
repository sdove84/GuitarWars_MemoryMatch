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
    $('#reset').click(reset_button);
    $('#reset').hide();
});
//this is the first card clicked
function card_clicked() {
    if (board_clickable != true){
        return;
    }
    $(this).find('.back').hide();
    // $(this).find('.back').css({'transform' : "perspective(600px) rotateY(180deg)"});
    // $(this).find('.face').css({'transform' : "perspective(600px) rotateY(0deg)"});

    $(this).off('click');
// check to find out if its the first card
    if (first_card_clicked === null) {
        first_card_clicked = this;
        console.log('first card clicked');
        //turns off first card click so you cant match same card
        var src = $(first_card_clicked).find('img').attr('src');
        cardInfo[src].onClick();
        return;
    }
// Its the second card
    else {
        second_card_clicked = this;
        console.log('second card clicked');
        attempts++;
        display_stats();
        // cardInfo[cardIndex].on2ndClick();
        var first_card = $(first_card_clicked).find('img').attr('src');
        var second_card = $(second_card_clicked).find('img').attr('src');

// compare the two cards
        //cards match
        if (first_card === second_card) {
            // cardInfo[cardIndex].onMatch();

            board_clickable = false;
            match_counter++;
            display_stats();
            // playDarthAxe();
            //document.getElementById('darthAxe').play();
            console.log('card 1: ', first_card_clicked, 'card 2: ', second_card_clicked);
            console.log('first_card : ', first_card, 'second_card : ',second_card);
            setTimeout(function(){
            $(first_card_clicked).find('.front').hide();
            $(second_card_clicked).find('.front').hide();
                board_clickable = true;
            first_card_clicked = null;
            second_card_clicked = null;
            }, 1000);

            var src = $(second_card_clicked).find('img').attr('src');
            cardInfo[src].onMatch();

            if (match_counter == total_possible_matches) {
                var theme_song = new Audio('sounds/star-wars-theme-song.mp3');
                theme_song.play();
                //theme_song.volume = .5;
                $('#win').html("YOU WIN!!!");
                $("#win").show();
                $('#reset').show();
                // $('#reset').addClass('blink_me');
                run_blink();
            }
        }
        //cards don't match
        else {
            //$('.card').off('click');
            board_clickable = false;
            // cardInfo[cardIndex].onMismatch(secondCard);
            resetCardsAfterNoMatch();
        }
    }
}

// function playDarthAxe(){
//     darthAxe.play();
// }

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

    var src = $(second_card_clicked).find('img').attr('src');
    cardInfo[src].onMismatch();

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
    $('.front').show();
    $('.card').click(card_clicked);
    $("#win").html('');
    $('#reset').hide();
    // $('#reset').removeClass('blink_me');
    board_clickable = true;
    // var theme_song = new Audio('sounds/star-wars-theme-song.mp3');
    // theme_song.stop();
    setTimeout(function(){
    var vaderComeBack = new Audio('sounds/swvader01.mp3');
    vaderComeBack.play();
    }, 1000);
}


// function run_blink() {
//     (function blink() {
//         $('.blink_me').fadeOut(500).fadeIn(500, blink);
//     })();
// }

//todo add Win window, make cards randomize, and add animations*

var cardInfo ={
    'images/darth_axe_shred.jpg':{
        name: 'darth1',
        imgSrc: 'images/darth_axe_shred.jpg',
        onClick: function(){
            var theme_song = new Audio('http://www.worldsmithgames.com/webs/worldsmith/sounds/breathe.wav');
            theme_song.play();
        },
        onMatch: function(){
            var theme_song = new Audio('sounds/darthvader_taughtyouwell.wav');
            theme_song.play();
        },
        onMismatch: function(){
            var theme_song = new Audio('http://www.mediacollege.com/downloads/sound-effects/star-wars/darthvader/darthvader_failedme.wav');
            theme_song.play();
        }
    },
    'images/storm_trooper_shred.jpg': {
            name: 'trooper',
            imgSrc: 'images/storm_trooper_shred.jpg',
            onClick: function () {
                var theme_song = new Audio('http://home1.swipnet.se/~w-52935/sounds/blaster.wav');
                theme_song.play();
            },
            onMatch: function () {
                var theme_song = new Audio('http://www.thesoundarchive.com/starwars/swsidious01.mp3');
                theme_song.play();
            },
            onMismatch: function () {
                var theme_song = new Audio('http://www.mediacollege.com/downloads/sound-effects/star-wars/c3po/c3po_yourfault.wav');
                theme_song.play();
            }
    },
    'images/yoda_shred.jpg': {
        name: 'yoda1',
        imgSrc: 'images/yoda_shred.jpg',
        onClick: function () {
            var theme_song = new Audio('http://www.thesoundarchive.com/starwars/R2D2-yeah.mp3');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('http://www.mediacollege.com/downloads/sound-effects/star-wars/darthvader/darthvader_technological.wav');
            theme_song.play();
        },
        onMismatch: function () {
            var theme_song = new Audio('http://www.mediacollege.com/downloads/sound-effects/star-wars/yoda/yoda_doordonot.wav');
            theme_song.play();
        }
    },
    'images/darth_shred.jpg': {
        name: 'darth2',
        imgSrc: 'images/darth_shred.jpg',
        onClick: function () {
            var theme_song = new Audio('sounds/2 clash 2.wav');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('http://www.thesoundarchive.com/starwars/forcestrong.mp3');
            theme_song.play();
        },
        onMismatch: function () {
            var theme_song = new Audio('http://www.mediacollege.com/downloads/sound-effects/star-wars/darthvader/darthvader_dontmakeme.wav');
            theme_song.play();
        }
    },
    'images/chewy_backer.jpg': {
        name: 'chewy',
        imgSrc: 'images/chewy_backer.jpg',
        onClick: function () {
            var theme_song = new Audio('http://www.drodd.com/star-wars-soundboard/chew_roar2.mp3');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('http://www.thesoundarchive.com/starwars/Chewie-chatting.mp3');
            theme_song.play();
        },
        onMismatch: function () {
            var theme_song = new Audio('http://www.mediacollege.com/downloads/sound-effects/star-wars/darthvader/darthvader_anger.wav');
            theme_song.play();
        }
    },
    'images/Rockin_Yoda.jpg': {
        name: 'yoda2',
        imgSrc: 'images/Rockin_Yoda.jpg',
        onClick: function () {
            var theme_song = new Audio('http://www.waveevents.com/MyFilez/wavs/starwars/litesabr.wav');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('http://www.thesoundarchive.com/starwars/alwaystwo.mp3');
            theme_song.play();
        },
        onMismatch: function () {
            var theme_song = new Audio('http://www.mediacollege.com/downloads/sound-effects/star-wars/leia/leia_what.wav');
            theme_song.play();
        }
    },
    'images/ yoda_slappin_bass.jpg': {
        name: 'yoda3',
        imgSrc: 'images/ yoda_slappin_bass.jpg',
        onClick: function () {
            var theme_song = new Audio('sounds/lasrhit4.WAV');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('http://www.thesoundarchive.com/starwars/return/900yearsold.mp3');
            theme_song.play();
        },
        onMismatch: function () {
            var theme_song = new Audio('http://www.thesoundarchive.com/starwars/dange-disturb.mp3');
            theme_song.play();
        }
    },
    'images/millennium_solo.jpg': {
        name: 'solo',
        imgSrc: 'images/millennium_solo.jpg',
        onClick: function () {
            var theme_song = new Audio('sounds/Spin clash.wav');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('http://www.mediacollege.com/downloads/sound-effects/star-wars/hansolo/hansolo_captain.wav');
            theme_song.play();
        },
        onMismatch: function () {
            var theme_song = new Audio('http://www.thesoundarchive.com/starwars/empire/laughfuzzball.mp3');
            theme_song.play();
        }
    },
    'images/Darth-Maul-Les-Paul01.jpg': {
        name: 'darth-maul',
        imgSrc: 'images/Darth-Maul-Les-Paul01.jpg',
        onClick: function () {
            var theme_song = new Audio('sounds/double bladed twirl.wav');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('http://www.thesoundarchive.com/starwars/Revenge.mp3');
            theme_song.play();
        },
        onMismatch: function () {
            var theme_song = new Audio('http://www.thesoundarchive.com/starwars/swluke01.mp3');
            theme_song.play();
        }
    }
};
