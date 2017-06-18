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

var forceTheme_song = new Audio('sounds/04 The Force Theme.m4a');

var mainTheme_song = new Audio('sounds/01 Main Theme.m4a');

$(document).ready(function () {
    // shuffle();
    $(".card").click(card_clicked);
    $('#reset').click(reset_button);
    $('#reset').hide();
    // songsForGame[src].onStartGame();
    forceTheme_song.volume = .2;
    forceTheme_song.play();
    forceTheme_song.loop = true;
    pauseMusicHandler();

});



// function shuffle(){
//     var images=["images/ yoda_slappin_bass.jpg","images/chewy_backer.jpg","images/Darth-Maul-Les-Paul01.jpg","images/darth_axe_shred.jpg",
//         "images/darth_shred.jpg","images/millennium_solo.jpg","images/Rockin_Yoda.jpg","images/storm_trooper_shred.jpg","images/yoda_shred.jpg"];
//
//     images = images.concat(images);
//
//     //shuffle the array
//     while(images.length) {
//
//         var index = Math.floor(Math.random() * images.length);
//         var newCard=$('<div>',{class:'card'});
//         var backCard=$('<div>',{class:'back'});
//         var backImage=$('<img>',{src:'images/starwars_cardback.jpg'});
//         var frontCard=$('<div>',{class:'front'});
//         console.log("the image will be", images[index]);
//         console.log("The index is ",index);
//
//         var frontImage=$('<img>',{src:images[index]});
//
//         images.splice(index,1);
//
//         $(backCard).append(backImage);
//         $(frontCard).append(frontImage);
//         $(newCard).append(frontCard);
//         $("#game-area").append($(newCard));
//
//     } //end of while loop
//     // $(".back").click(card_clicked);
// } //end of function


function pauseMusicHandler(){
    $('#music').on('click',pauseGameMusic);
    $('.music_on').show();
}

function pauseGameMusic(){
    forceTheme_song.pause();
    playMusicHandler();
}

function playMusicHandler(){
    $('#music').on('click',playGameMusic);
    $('.music_on').hide();
}

function playGameMusic(){
    forceTheme_song.play();
    pauseMusicHandler();
}


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
        var first_card = $(first_card_clicked).find('img').attr('src');
        var second_card = $(second_card_clicked).find('img').attr('src');

// compare the two cards
        //cards match
        if (first_card === second_card) {
            board_clickable = false;
            match_counter++;
            display_stats();
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
                mainTheme_song.volume = .7;
                mainTheme_song.play();
                $('#win').html("YOU WIN!!!");
                $("#win").show();
                $('#reset').show();
                pauseGameMusic();
                mainTheme_song.currentTime = 0;
                $('.music_on').show();
            }
        }
        //cards don't match
        else {
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
    playGameMusic();
    forceTheme_song.currentTime = 0;
    mainTheme_song.pause();
    board_clickable = true;
    setTimeout(function(){
    var vaderComeBack = new Audio('sounds/swvader01.mp3');
    vaderComeBack.play();
    }, 1000);
}

var cardInfo ={
    'images/darth_axe_shred.jpg':{
        name: 'darth1',
        imgSrc: 'images/darth_axe_shred.jpg',
        onClick: function(){
            var theme_song = new Audio('http://www.worldsmithgames.com/webs/worldsmith/sounds/breathe.wav');
            theme_song.volume = .5;
            theme_song.play();
        },
        onMatch: function(){
            var theme_song = new Audio('sounds/darthvader_taughtyouwell.mp3');
            theme_song.volume = .5;
            theme_song.play();
        },
        onMismatch: function(){
            var theme_song = new Audio('http://www.mediacollege.com/downloads/sound-effects/star-wars/darthvader/darthvader_failedme.wav');
            theme_song.volume = .6;
            theme_song.play();
        }
    },
    'images/storm_trooper_shred.jpg': {
            name: 'trooper',
            imgSrc: 'images/storm_trooper_shred.jpg',
            onClick: function () {
                var theme_song = new Audio('sounds/blaster.mp3');
                theme_song.volume = .6;
                theme_song.play();
            },
            onMatch: function () {
                var theme_song = new Audio('http://www.thesoundarchive.com/starwars/swsidious01.mp3');
                // theme_song.volume = 1.0;
                theme_song.play();
            },
            onMismatch: function () {
                var theme_song = new Audio('http://www.mediacollege.com/downloads/sound-effects/star-wars/c3po/c3po_yourfault.wav');
                theme_song.volume = .6;
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
            theme_song.volume = .6;
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
            var theme_song = new Audio('sounds/2 clash 2.mp3');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('sounds/Force is strong.mp3');
            theme_song.volume = .5;
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
            var theme_song = new Audio('sounds/Power of the dark side.mp3');
            theme_song.volume = .6;
            theme_song.play();
        }
    },
    'images/Rockin_Yoda.jpg': {
        name: 'yoda2',
        imgSrc: 'images/Rockin_Yoda.jpg',
        onClick: function () {
            var theme_song = new Audio('sounds/litesabr.mp3');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('sounds/Master and Apprentice.mp3');
            theme_song.volume = .7;
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
            var theme_song = new Audio('sounds/lasrhit4.mp3');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('sounds/Use the Force.mp3');
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
            var theme_song = new Audio('sounds/Spin clash.mp3');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('http://www.mediacollege.com/downloads/sound-effects/star-wars/hansolo/hansolo_captain.wav');
            theme_song.volume = .6;
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
            var theme_song = new Audio('sounds/double bladed twirl.mp3');
            theme_song.play();
        },
        onMatch: function () {
            var theme_song = new Audio('sounds/Fulfilling your destiny.mp3');
            theme_song.volume = .5;
            theme_song.play();
        },
        onMismatch: function () {
            var theme_song = new Audio('http://www.thesoundarchive.com/starwars/swluke01.mp3');
            theme_song.play();
        }
    }
};

//todo add better Win window, make cards randomize, and add animations*
