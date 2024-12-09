import './index.scss'; // imports >>>
/* REFS >>> 
    1) https://webpack.js.org/guides/typescript/
    2) https://stackoverflow.com/questions/45780272/how-to-define-an-array-of-strings-in-typescript-interface
    3) https://www.typescriptlang.org/docs/
    4) https://www.typescriptlang.org/docs/handbook/ >>> THE HOLY BIBLE OF TYPESCRIPT <<<
    5) https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
    6) https://stackoverflow.com/questions/29043135/javascript-one-line-if-else-else-if-statement
    7) https://stackoverflow.com/questions/48083353/i-want-to-know-how-to-shuffle-an-array-in-typescript
    8) https://www.w3schools.com/cssref/sel_not.php
    9) https://www.freecodecamp.org/news/javascript-refresh-page-how-to-reload-a-page-in-js/
    10) https://stackoverflow.com/questions/52491832/how-to-use-document-getelementbyid-method-in-typescript
    11) https://stackoverflow.com/questions/5085567/what-is-the-hasclass-function-with-plain-javascript
*/

console.log('JS (TypeScript) file connected.')

/* let test: string = "test";
console.log(test); */

// global variable for cards >>> 
const allCards: NodeListOf<Element> = document.querySelectorAll('.card');
// const oneCard = document.querySelector('.card');
let pickTwo: number = 0; // state management 
let firstPick: string | null = null;
let secondPick: string | null = null;
const startOverBtn = document.getElementById('start-over-btn') as HTMLFormElement;
let attempts = document.getElementById('header-attempts-text') as HTMLFormElement;

startOverBtn?.addEventListener('click', () => {
    console.log('Game Reset!');
    location.reload();
});


interface MatchOptions { // inferance objects are in CAPS >>> optional sets will end with "?" ex: type: "a" | type?: "b"
    type: "A" | "B" | "C"; // only options for the card types
}

const shuffleCards = (opts: MatchOptions[]) => {
    let currentIndex = opts.length; // increment 

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [opts[currentIndex], opts[randomIndex]] = [
            opts[randomIndex], opts[currentIndex]
        ];

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [opts[currentIndex], opts[randomIndex]] = [
                opts[randomIndex], opts[currentIndex]
            ];
        }
        console.log(cardTypes, "Shuffled, Ready for Use")

        return opts;
    }
}

allCards.forEach(card => { // add event listener for cards
    card.addEventListener('click', () => {
        let resultsText = document.getElementById('footer-results-text') as HTMLFormElement; 
        card.textContent = card.ariaValueText;
        let attemptsLeft: number = 3;

        let getIdAttr: string | null = card.getAttribute('id');
        let getCardValue: any = card.ariaValueText;
        showCard(`${getIdAttr}`);
        console.log(`Card number ${getIdAttr} of 6. You picked ${getCardValue}!
            -------------------`);

        if (pickTwo === 0) { // first pick
            if (!card.classList.contains('matched')) { // to see if its already match, A.K.A. Don't allow user to try to match ALREADY matched cards
                firstPick = card.ariaValueText;
                card.classList.add('flipped'); // add flip class
                console.log('Your First Pick: ', firstPick);
                pickTwo = 1; // move to the second pick
            }
        } else if (pickTwo === 1) { // second pick
            if (!card.classList.contains('matched')) { // same thing, error handling for matching
                secondPick = card.ariaValueText;
                card.classList.add('flipped');
                console.log('Your Second Pick: ', secondPick);
                }
            if (firstPick === secondPick) {
                console.log('Match found!'); // if match found >>> keep cards flipped, add matched class
                resultsText.textContent = 'Match found!';
                document
                    .querySelectorAll('.flipped:not(.matched)')
                    .forEach(card => card.classList.add('matched')); // add the class matched to ALL cards that don't have it
            } else { // no match found!
                console.log('No match.');
                resultsText.textContent = 'Try again!'; 
                setTimeout(() => { // flip cards back after a short delay
                    document
                        .querySelectorAll('.flipped:not(.matched)')
                        .forEach(card => {
                            card.textContent = '?'; // reset card
                            card.classList.remove('flipped');
                            card.setAttribute("style", "background-image: url('/assets/images/card-flip-back.png');");
                        });
                }, 1000); // 1s delay
            }

            let howMany = 0;
            setTimeout(() => { // after second pick, match or no match logic goes off,  reset for next turn next turn
                firstPick = null;
                secondPick = null;
                pickTwo = 0;
                console.log('Ready for the next turn.');
                resultsText.textContent = 'Try to Match!';
                allCards.forEach(card => {
                    if (card.classList.contains('matched')) {
                        howMany += 1; 
                        console.log(howMany);
                    }
                })
                
                if (howMany === 6) {
                    resultsText.textContent = 'You Won!';

                    setTimeout(() => { 
                        location.reload();
                    }, 1000);
                }
            }, 1000);
        }
    });
})

const showCard = (id: string) => {
    let card = document.getElementById(`${id}`);
    console.log('SCSS Applied to card: ', card?.id);
    card?.setAttribute("style", "background-image: url('/assets/images/card-flip-front.png');");
} 

const cardTypes: MatchOptions[] = [ // array of objects within a stored variable
    {type: "A" },
    {type: "A" },
    {type: "B" },
    {type: "B" },
    {type: "C" },
    {type: "C" },
    // {type: "d" }, >>> this does NOT work, its not in the options
]

shuffleCards(cardTypes); // functions expects 1, put array of objects inside variables to call function and use within
// console.log(cardTypes)

const appendValuesGenerated = () => {
    let i = 0;
    allCards.forEach(card => {
        console.log(card, `${cardTypes[i].type}`);
        card.ariaValueText = cardTypes[i].type;
        i++;
    });
}

appendValuesGenerated()