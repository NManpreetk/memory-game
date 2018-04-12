//all the 16 cards are selected
let box = document.querySelector(".deck");
let cards = document.querySelectorAll(".card");
//card and moves are the variables which are initialized    
const card = [];
let moves = 0;

//the cards will be shuffled using this function
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let open = [];
//selects the moves the player makes
const movescounter = document.querySelector(".score-panel .moves");
const element = document.querySelector(".deck");
//when we click a card it should flip
element.addEventListener("click", flip);

//the card is flipped
function flip(event) {
    //clicked event should contain class card
    if (event.target.classList.contains("card")) {
        //only two cards should open but player should not be able to click the card which already has class open show 
        if (open.length < 2 && !(event.target.classList.contains('show', 'open'))) {
            event.target.classList.add("open", "show")
            //after opening first card second card is added to it
            open.push(event.target);
        }
    }
    //if two cards are open, match them
    if (open.length == 2) {
        match(element);
    }
}

//it is a function to match cards
function match(element) {
    setTimeout(function () {
        moveset();
        //it will match first two cards opened
        if (open[0].innerHTML == open[1].innerHTML) {
            //and add class match to it
            open[0].classList.add("match");
            open[1].classList.add("match");
            open[0].classList.remove("open", "show");
            open[1].classList.remove("open", "show");
            //after opening two cards we have emptied the array
            open = [];
            //if all the 16 cards have class match then it will show popup alert
            if (document.getElementsByClassName("match").length == 16) {
                alert("YOU WON!");
            }
        } else {
            //if the cards do not match they will flip back after a particular time period
            open[0].classList.remove("open", "show");
            open[1].classList.remove("open", "show");
            //we have emptied the array after selecting two cards
            open = [];
        }
    }, 1000);
}

//every two cards flipped is equal to one move
function moveset() {
    moves++;
    movescounter.textContent = moves;
}

//we added an event listener to restart button
const restart = document.querySelector(".restart");
restart.addEventListener("click", function () {
    //we have emptied the whole deck of 16 cards
    box.innerHTML = "";
    //and shuffled all the cards 
    shuffledCards = shuffle(Array.from(cards));
    for (let i = 0; i < shuffledCards.length; i++) {
        box.appendChild(shuffledCards[i]);
        //removed all the open, show and match classes
        shuffledCards[i].classList.remove("open", "show", "match");
    }
    //reset all the moves to zero
    moves = 0;
    movescounter.innerHTML = "";
});