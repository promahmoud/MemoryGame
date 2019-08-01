// Audio
let error = document.getElementById('error');
let correct = document.getElementById('correct');
let theEnd = document.getElementById('end_game');
let timeOut = document.getElementById('timeout');

/********Range For Zoom functions and varible */
let body = document.querySelector("body");
let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");
let number = document.querySelector(".number span");
let n = 80;
number.innerHTML = n +'%';
minus.onclick = function () {
    if (n <= 100 && n > 70) {
        n -= 10;
        number.innerHTML = n +'%';
        body.style.cssText = `zoom:${n}%`
    }
}
plus.onclick = function () {
    if(n >= 70 && n < 100){
    n += 10;
    number.innerHTML = n + '%';
    body.style.cssText = `zoom:${n}%`
    }
}
/*############ Range For Zoom functions and varible ######*/


/************* Theme setting functions and varible ######*/
let congBtn = document.querySelector('.cong-icon');
let arrowImg = document.querySelector('.arrow-img ');
let containerColor = document.querySelector('.colors ');
let itemOfColor = containerColor.children;



congBtn.onclick = function(){
    arrowImg.classList.toggle('show-theme-setting');
    containerColor.classList.toggle('show-theme-setting');
}
containerColor.onclick =  function(e){
    color = e.target;
    if(color.hasAttribute('data-color')){
    let atrr = color.getAttribute("class");
    body.className = atrr;
    }
}

/*############ End Theme setting  functions and varible ######*/
// List of icon classes

let arrayOne = ['fa-award', 'fa-hand-peace', 'fa-car', 'fa-yin-yang', 'fa-trophy', 'fa-bomb', 'fa-bell', 'fa-anchor'];
let iconArray = [...arrayOne, ...arrayOne];

// let iconArray = arrayOne.concat(arrayOne);

// 'fa-award',
// 'fa-certificate',
// 'fa-bell',
// 'fa-coffee',
// 'fa-air-freshener',
// 'fa-bolt',
// 'fa-fighter-jet',
// 'fa-bomb'

/**
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    let j, temp;
    for (let i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
/***************************************************** */
// Create List of Card 
// *****************************************************/
const cards = document.getElementsByClassName('cards')[0];
let li = '',
    itemOfLi = '';

function createListItem() {
    let shuffledClasses = '',
        icons = '';
    for (const item in iconArray) {

        //create list item
        li = document.createElement('li');
        li.classList.add('card');
        cards.appendChild(li);

        //create item of list item (i)
        itemOfLi = document.createElement('i');
        itemOfLi.className = 'fa'
        li.appendChild(itemOfLi);

    }
    shuffledClasses = shuffleArray(iconArray)
    icons = document.querySelectorAll('.card .fa');
    for (const item in iconArray) {
        icons[item].classList.add(shuffledClasses[item]);
    }
    // ***************************
}

function resetCards() {
    while (cards.hasChildNodes()) {
        cards.removeChild(cards.lastChild);
    }
}

// Declare variables 
let card = cards.children;
let num_of_card = 0;
let num_of_matchCard = 0;
let num_of_moves = 0;
let openingCards = [];



function showCard() {
    card.className += ' open show ';
}

function AddToOpeningCard() {
    openingCards.push(card);
    num_of_card++;
    // console.log(openingCards)
}

function ClearOpeningCard() {
    openingCards = [];
    num_of_card = 0;
}

function removeClass() {
    setTimeout(function () {
        openingCards[0].className = 'card';
        openingCards[1].className = 'card';
        ClearOpeningCard();
    }, 800);
}


// function for match cards
function match() {
    openingCards[0].className += ' match';
    openingCards[1].className += ' match';
    num_of_matchCard++;
    correct.play();
}
// function to dismatch

function dismatch() {
    setTimeout(function () {
        openingCards[0].className += ' dismatch';
        openingCards[1].className += ' dismatch';
        error.play();
    }, 600);
    removeClass();
}
// ********function for check matching********/
function checkForMatch() {
    let cardNum1 = openingCards[0].innerHTML;
    let cardNum2 = openingCards[1].innerHTML;
    if (cardNum1 === cardNum2) {
        match();
        ClearOpeningCard();
    } else {
        dismatch();
    }
}
// ********End function for check matching********/
// ******************moves**********************/
const moves = document.querySelector('.count');

function dispayMoves() {
    moves.textContent = num_of_moves;
}

function resetMoves() {
    moves.textContent = 0;
}

// ********************** Rating *********/
const star = document.querySelectorAll('.star');

function rating() {
    if (num_of_moves >= 13 && num_of_moves <= 20) {
        star[2].className = 'far fa-star';
    } else if (num_of_moves > 20 && num_of_moves <= 27) {
        star[1].className = 'far fa-star';
    } else if (num_of_moves > 27 && num_of_moves <= 34) {
        star[0].className = 'fas fa-star-half-alt';
    } else if (num_of_moves > 34) {
        star[0].className = 'far fa-star';
    }
}

function resetRating() {
    for (const key in star) {
        star[key].className = 'fas fa-star';
    }
}

// *******************Timer********************
let mins = document.querySelector('.min ');
let secs = document.querySelector('.sec ');
let minutes = 0,
    secounds = 0,
    stopInterval,
    time = 0;

function timer() {
    secs.textContent = '0' + secounds;
    mins.textContent = '0' + minutes;
    secounds++;
    mins.textContent = minutes > 9 ? minutes : '0' + minutes;
    secs.textContent = secounds > 9 ? secounds : '0' + secounds;

    if (secounds === 59) {
        minutes++;
        secounds = 0;
    }
    if (minutes === 60) {
        //Sweet alert
        Swal.fire({
            type: 'error',
            title: 'Oops...Time Out!',
            text: 'You take 1 hour! Please try again',
        });
        resetTime();
        timeOut.play();
        resetGame();
    }
}

function setTime() {
    if (time === 0) {
        stopInterval = setInterval(timer, 1000);
        time++;
    }
}

function resetTime() {
    minutes = 0;
    secounds = 0;
    secs.textContent = '00';
    mins.textContent = '00';
    clearInterval(stopInterval);
}
// *******************/ End function timer /***********************/
// ************init function************
function main_game() {
    cards.addEventListener('click', function (event) {
        card = event.target;
        
        if (card.className === 'card open show') {
            return;
        } else if (card.className == 'card' && num_of_card < 2) {
            setTime();
            showCard();
            AddToOpeningCard();

            if (num_of_card === 2) {
                checkForMatch();
                num_of_moves++;
                dispayMoves();
                rating();
            }
            endGame(); //Check out the end of the game
        } else {
            return;
        }

    });

}
// main_game();

function endGame() {
    if (num_of_matchCard === 8) {
        theEnd.play();
        modal();
        rating();
        clearInterval(stopInterval);
    }
}

function modal() {
    Swal.fire({
        title: 'Awesome!',
        html: `
        <p> You completed the game</p>
        <p> You used<b> ${num_of_moves}</b> 
        Moves in time 
        ${minutes= minutes > 9 ? minutes : '0' + minutes}:${secounds = secounds > 9 ? secounds : '0' + secounds}</p> 
        <ul class="stars custom-rating">
        <b>your score is: </b>
        <li><i class="${star[0].className} star"></i></li>
        <li><i class="${star[1].className} star"></i></li>
        <li><i class="${star[2].className} star"></i></li>
        </ul>
        <h3>Do you want to play again?</h3>`,
        imageUrl: './Images/Asset 1.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        animation: true,
        // background: '#fff url(../Images/Asset2.png) center',
        backdrop: `
            rgba(0,0,123,0.4)
            url("./Images/nyan-cat.gif")
            center left
            no-repeat
      `,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            resetGame();
        } else {

        }
    })

}

// ******************Reset Game*******/
function resetGame() {
    num_of_matchCard = 0;
    num_of_moves = 0;
    num_of_card = 0;
    time = 0;
    resetMoves();
    resetRating();
    resetCards();
    resetTime();
    runGame();
}
// ***************************Refresh button****************************/
let btnRefresh = document.getElementById('refresh');

function Refresh() {
    btnRefresh.addEventListener('click', resetGame);
}
Refresh();
// ***************************End Refresh button****************************/
/*------------------ Start Game function ------------------ */

document.addEventListener('DOMContentLoaded', runGame, false);

function runGame() {
    createListItem(); // puts shuffled cards on the table
    main_game(); // holds main game functionality
}




// Mahmoud Mostafa
