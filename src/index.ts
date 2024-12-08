import './index.scss'; // imports >>>
/* REFS >>> 
    1) https://webpack.js.org/guides/typescript/
    2) https://stackoverflow.com/questions/45780272/how-to-define-an-array-of-strings-in-typescript-interface
    3) https://www.typescriptlang.org/docs/handbook/2/everyday-types.html >>> THE HOLY BIBLE OF TYPESCRIPT
*/

console.log('JS (TypeScript) file connected.')

/* let test: string = "test";
console.log(test); */

interface MatchOptions { // inferance objects are in CAPS >>> optional sets will end with "?" ex: type: "a" | type?: "b"
    type: "A" | "B" | "C"; // only options for the card types
}

const randomizeCard = (opts: MatchOptions[]) => {
    console.log(cardTypes[0].type); // output "a"
    console.log(cardTypes, "array of objects for card types");

    const allCards: NodeListOf<Element> = document.querySelectorAll('.card');
    // console.log(allCards)
    allCards.forEach(card => {
        card.ariaValueText = cardTypes[0].type; // append values types "A, B, C" to the cards
        card.textContent = card.ariaValueText;
        card.addEventListener('click', () => {
            let getIdAttr: string | null = card.getAttribute('id');
            let getCardValue: any = card.ariaValueText;
            // console.log(getIdAttr)
            alert(`The value of that card is ${getCardValue} and you clicked on the ${getIdAttr} card.`);
            console.log(`The value of that card is ${getCardValue} and you clicked on the ${getIdAttr} card.`);
        });
    })
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