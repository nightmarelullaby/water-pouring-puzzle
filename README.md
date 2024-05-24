# Water Jug Pouring Puzzle

### Explanation

By proving two capacities (x,y) the algorith should return a desired amount of water pouring, emptying or filling.

---

### Setup

1. Clone repo: `git clone https://github.com/nightmarelullaby/water-pouring-puzzle.git`
2. Access folder `cd water-pouring-puzzle`
3. Install dependencies `npm i`
4. Run in local using `npm run dev`

---

### [Live Demo 🚀](https://water-pouring-puzzle-nine.vercel.app/ "https://water-pouring-puzzle-nine.vercel.app")

---

### Tests

Once you install all dependencies you can make `npm run vitest`. This will run several unit tests.

---

### Limitations

- Allowed actions: **Fill, Empty, Transfer(between two jugs only)**
- X,Y and Z are greater than 0
- X, Y and Z are integer (no decimals, fractions)

---

### Algorith approach

There are several ways to solve this problem. I used a basic algorithm wich follows the instructions:

- Fill the Y jug and pour it into X jug.
- If Y jug is empty fill it.
- If X jug is full, empty it.
- Repeat

This will eventually find a path to desired amount, but depending on the choosen jug would be more efficient or not.

So, in the code there are 2 functions pouringPathFinder `pouringPathFinder()` and `
findOptimalPath()` . The second one runs twice the first function and checks wich output has smaller output size and return it.

##### Example

X = 10;
Y = 2;
Z = 4;

`(0,0) - (0,2) - (2,0) - (2,2) - (4,0)`
