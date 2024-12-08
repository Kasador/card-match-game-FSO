# 📝 Full Sail University - Card Match

### 🔗 https://card-match-game-fso.netlify.app/

In this week's activity, you are tasked with building a new HTML/TypeScript/SASS browser game.

### ⚙️ Overview

The objective of the game is to find all sets of matching cards within a maximum of 3 tries/attempts. There will be a total of six (6) cards flipped face down at the start. The set will include 3 pairs of matching cards. The player must try to match all three pairs of cards in fewer than 3 attempts. An attempt doesn't represent just one card flip; rather, it involves comparing 2 cards in one try. If the cards don't match, they are flipped back to their face-down state, and the player's remaining attempts are reduced by one.

At the start of each new game, the cards must reshuffle to different positions and values. Note that you do not need to include special cards like Jacks, Queens, Kings, or Aces. Whether or not to include them is up to you; it will not earn you any extra points, however it could be a fun challenge if you're feeling adventurous.

# 🎨 The Design

You do not need to create a custom design for this activity, but you are welcome to alter the design's colors, layout, and more. You may also create an entirely new design if you'd like. If you choose to use the design provided below, it includes assets such as background images and colors. Your task is to write the HTML/TypeScript/SCSS for this design from scratch. 

## 📋 References

![Screenshot 2024-12-05 080729](https://github.com/user-attachments/assets/041afcb1-d1be-4091-82fb-a6b8d9d883d2)

# 🔗 npm - Dependencies

- npm install --save-dev typescript ts-loader
- npm install sass-loader node-sass
- npm install --save-dev webpack
- npm i sass
- npm i typescript
- npm i css-loader
- npm i html-webpack-plugin
- npm i babel-loader
- npm install --save-dev webpack webpack-cli copy-webpack-plugin _(copy assets to output dir)_

# 📈🪶 Progress Screenshots/Code

### 🛠️ Setup 

![Screenshot 2024-12-05 094446](https://github.com/user-attachments/assets/6ccf7a4d-6529-4395-82a2-d971f3347f8e)

```javascript
plugins: [ // updated plugins to include CopyWebpackPlugin for assets folder _outside_ src dir
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets'), // folder for assets to copy
          to: path.resolve(__dirname, 'dist/assets'), // where to input the copied folder
        },
      ],
    }),
  ],
```

### ╰┈➤ Deploy to Netlify (**_On Github Push_**)

![Screenshot 2024-12-05 102507](https://github.com/user-attachments/assets/191f15b6-5509-4dc3-b056-c8e18c6accab)

### 📘 Frontend

![Screenshot 2024-12-06 083728](https://github.com/user-attachments/assets/04893251-073f-468f-a253-7e6035726c7d)

![Screenshot 2024-12-07 154733](https://github.com/user-attachments/assets/16453e07-faf3-46cb-80fc-5f07db708cb1)

### 📖 Backend

## Using interface options an array of objects with TS to define and output type based on card click and index of array.

```javascript
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
```

![Screenshot 2024-12-07 190836](https://github.com/user-attachments/assets/ddfce91a-2ac7-4eef-a5cb-448c5578d0e6)

## Got card value, & the selected card; stored data, ready for SCSS & randomizing cards on load...
![Screenshot 2024-12-07 195433](https://github.com/user-attachments/assets/9a837a1c-8b9b-4854-a1a5-68c1ea787e22)

### Code _(TS)_
```javascript
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
```
## Added state management to tell when user has picked TWO cards, now ready to compare values... 
![Screenshot 2024-12-07 212147](https://github.com/user-attachments/assets/3686d577-8a52-42f0-8cb7-1d6cddd66d81)

### Code _(TS)_
```javascript 
let pickTwo: number = 0; // state management 
let pickedTwo: boolean = false; // state management 

if (pickTwo === 2) { // match or not, on another click, reset
    pickTwo = 1;
    pickedTwo = false;
} else if (pickTwo === 1) { // second pick
    pickTwo = 2;
    pickedTwo = true;
} else if (pickTwo === 0 && !pickedTwo) { // first pick
    pickTwo = 1;
}
```
