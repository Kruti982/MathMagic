const express = require("express");
const bodyParser = require("body-parser");

const calculateSum = require("./sum");
const calculateAverage = require("./avg");
const isPrime = require("./prime");
const calculateFactorial = require("./factorial");
const reverseArray = require("./reverse");
const calculateModulus = require("./mod");
const reverseString = require("./strrev");

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const result = req.query.result || "";
  const error = req.query.error || "";
  res.send(`
    <style> 
    body { 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Arial; background:rgb(78, 177, 216); padding: 20px; }
    input, button { padding: 10px; margin: 5px; }
    button {cursor: pointer; background-color: rgb(111, 190, 221);}
    button:hover{background-color: rgb(72, 77, 80); color: white }
     
    form { display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff; padding: 20px; border-radius: 8px; width: 300px; }
    </style>
    <h1>Math Dashboard</h1>
    <form method="POST" action="/">
      <select name="operation">
        <option value="sum">Sum</option>
        <option value="average">Average</option>
        <option value="prime">Is Prime</option>
        <option value="factorial">Factorial</option>
        <option value="reverse">Reverse</option>
        <option value="modNumber">Modulus</option>
        <option value="reverseString">Reverse a String</option>

      </select><br/>
      <input name="array" placeholder="Enter values" required />
      <button type="submit">Calculate</button>
    </form>
    ${error ? `<p style="color:red;">${error}</p>` : ""}
    ${result ? `<h3>Result: ${result}</h3>` : ""}
  `);
});

app.post("/", (req, res) => {
  const input = req.body.array.trim();
  const operation = req.body.operation;

  let result;

  try {
    if (operation === "reverseString") {
      // For reverseString, don't check for numbers
      result = reverseString(input);
    } else {
      // For other operations that need numbers, we validate
      const items = input.split(/\s+/); // Split input by spaces
      const numbers = items.map(Number);
      const invalid = numbers.some(isNaN);

      if (invalid) {
        return res.redirect(
          "/?error=Invalid input, please enter valid numbers"
        );
      }

      // Perform the selected operation
      switch (operation) {
        case "sum":
          result = calculateSum(numbers);
          break;
        case "average":
          result = calculateAverage(numbers);
          break;
        case "prime":
          result = isPrime(numbers[0])
            ? `${numbers[0]} is Prime ✅`
            : `${numbers[0]} is NOT Prime ❌`;
          break;
        case "factorial":
          result = calculateFactorial(numbers[0]);
          break;
        case "reverse":
          result = reverseArray(items);
          break;
        case "modNumber":
          if (numbers.length !== 2 || numbers[1] === 0)
            throw new Error("Need exactly 2 numbers and divisor must not be 0");
          result = calculateModulus(numbers[0], numbers[1]);
          break;
        default:
          throw new Error("Unknown operation");
      }
    }
  } catch (e) {
    return res.redirect(`/?error=${e.message}`);
  }

  res.redirect(`/?result=${encodeURIComponent(result)}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
