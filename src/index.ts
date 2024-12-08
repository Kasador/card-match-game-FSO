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
    type: "a" | "b" | "c"; // only options for the card types
}

const randomizeCard = (opts: MatchOptions[]) => {
    console.log(cardTypes[0].type); // output "a"

    const allCards: NodeListOf<Element> = document.querySelectorAll('.card');
    // console.log(allCards)
    allCards.forEach(card => {
        card.addEventListener('click', () => {
            let getIdAttr: any = card.getAttribute('id');
            console.log(getIdAttr)
            card.textContent = cardTypes[0].type; // this is how we get the card and into the correct (RANDOM) letter 
        });
    })
}

const cardTypes: MatchOptions[] = [ // array of objects within a stored variable
    {type: "a" },
    {type: "a" },
    {type: "b" },
    {type: "b" },
    {type: "c" },
    {type: "c" },
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