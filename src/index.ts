import './index.scss'; // imports >>>
/* REFS >>> 
    1) https://webpack.js.org/guides/typescript/
    2) https://stackoverflow.com/questions/45780272/how-to-define-an-array-of-strings-in-typescript-interface
    3) https://www.typescriptlang.org/docs/handbook/2/everyday-types.html >>> THE HOLY BIBLE OF TYPESCRIPT
*/

console.log('JS (TypeScript) file connected.')

/* let test: string = "test";
console.log(test); */

const allCards: NodeListOf<Element> = document.querySelectorAll('.card'); // global variable for cards
const oneCard = document.querySelector('.card');
let pickTwo: number = 0; // state management 
let pickedTwo: boolean = false; // state management 

interface MatchOptions { // inferance objects are in CAPS >>> optional sets will end with "?" ex: type: "a" | type?: "b"
    type: "A" | "B" | "C"; // only options for the card types
}

const randomizeCard = (opts: MatchOptions[]) => {
    console.log(cardTypes[0].type); // output "a"
    console.log(cardTypes, "array of objects for card types");

    // console.log(allCards)
    allCards.forEach(card => {
        card.ariaValueText = cardTypes[0].type; // append values types "A, B, C" to the cards
        // card.textContent = card.ariaValueText;

        // random the cards
    })
}

allCards.forEach(card => { // add event listener for cards
    card.addEventListener('click', () => {
        card.textContent = card.ariaValueText;
        // if (!pickTwo && !pickedTwo) {
        //     pickTwo = 1;
        // } else if (pickTwo) {
        //     pickTwo = 2;
        // } else if (pickTwo === 2) {
        //     pickTwo = 3;
        //     pickedTwo = true;
        // } else if (pickTwo === 3) {
        //     pickedTwo = false;
        //     pickTwo = 0;
        // }


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

randomizeCard(cardTypes); // functions expects 1, put array of objects inside variables to call function and use within

// const allCards: NodeListOf<Element> = document.querySelectorAll('.card');
// // console.log(allCards)
// allCards.forEach(card => {
//     card.addEventListener('click', () => {
//         let getIdAttr: any = card.getAttribute('id');
//         console.log(getIdAttr)
//     });
// })