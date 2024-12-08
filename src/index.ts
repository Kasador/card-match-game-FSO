import './index.scss'; // imports >>>
/* REFS >>> 
    1) https://webpack.js.org/guides/typescript/
    2) https://stackoverflow.com/questions/45780272/how-to-define-an-array-of-strings-in-typescript-interface
    3) https://www.typescriptlang.org/docs/
    4) https://www.typescriptlang.org/docs/handbook/ >>> THE HOLY BIBLE OF TYPESCRIPT <<<
    5) https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
    6) https://stackoverflow.com/questions/29043135/javascript-one-line-if-else-else-if-statement
    7) https://stackoverflow.com/questions/48083353/i-want-to-know-how-to-shuffle-an-array-in-typescript
*/

console.log('JS (TypeScript) file connected.')

/* let test: string = "test";
console.log(test); */

// global variable for cards >>> 
const allCards: NodeListOf<Element> = document.querySelectorAll('.card');
const oneCard = document.querySelector('.card');
let pickTwo: number = 0; // state management 
let pickedTwo: boolean = false; // state management 


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
        card.textContent = card.ariaValueText;

        if (pickTwo === 2) { // match or not, on another click, reset
            pickTwo = 1;
            pickedTwo = false;
        } else if (pickTwo === 1) { // second pick
            pickTwo = 2;
            pickedTwo = true;
        } else if (pickTwo === 0 && !pickedTwo) { // first pick
            pickTwo = 1;
        }


        // pickTwo = 1; 
        console.log(`${pickTwo} of 2 picked.`);
        console.log("Done picking cards:", pickedTwo);
        let getIdAttr: string | null = card.getAttribute('id');
        let getCardValue: any = card.ariaValueText;
        showCard(`${getIdAttr}`);
        // console.log(getIdAttr)
        // alert(`Card number ${getIdAttr} of ${allCards.length}. You picked ${getCardValue}!`);
        console.log(`Card number ${getIdAttr} of 6. You picked ${getCardValue}!
            -------------------`);
    });
})

const compareMatch = (first: string, second: string) => {
    // compare the two picks
} 

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