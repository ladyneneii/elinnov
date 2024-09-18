import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const MAXNUM = 15;
const factorialMemoization: { [key: number]: number } = {};

function App() {
  const [num, setNum] = useState<number | "">("");
  const [error, setError] = useState("");
  const [primeRes, setPrimeRes] = useState("");
  const [factorialRes, setFactorialRes] = useState<number>();

  const inputRef = useRef<HTMLInputElement>(null);

  const isPrime = (num: number) => {
    if (num === 1) return setPrimeRes("neither prime or composite");
    if (num === 2 || num === 3 || num === 5) return setPrimeRes("prime");
    if (num % 2 === 0 || num % 5 === 0) return setPrimeRes("composite");

    const limit = Math.sqrt(num);

    for (let divisor = 3; divisor <= limit; divisor += 2) {
      if (num % divisor === 0) return setPrimeRes("composite");
    }
    setPrimeRes("prime");
  };

  // const findFactorial = (num: number) => {
  //   const factorialRecursive = (n: number): number => {
  //     if (n <= 1) return 1;
  //     if (n in factorialMemoization) return factorialMemoization[n];

  //     const result = n * factorialRecursive(n - 1);
  //     if (!(n in factorialMemoization)) factorialMemoization[n] = result;

  //     return result;
  //   };

  //   setFactorialRes(factorialRecursive(num));
  // };

  const findFactorial = (num: number) => {
    if (num in factorialMemoization)
      return setFactorialRes(factorialMemoization[num]);

    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }

    factorialMemoization[num] = result;

    setFactorialRes(result);
  };

  useEffect(() => {
    if (num === "") return;
    if (num === 0) return setNum("");
    const str = String(num);
    
    if (str.length > MAXNUM) {
      return setError("The number is too big.");
    }
    if (str.includes(".")) {
      return setError("Decimals are not allowed.");
    } else if (str.includes("-")) {
      return setError("Negative numbers are not allowed.");
    } else {
      setError("");
      isPrime(num as number);
      findFactorial(num as number);
    }
  }, [num]);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  
  console.log(factorialMemoization);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="input">
        <input
          ref={inputRef}
          onChange={(e) => setNum(Number(e.target.value))}
          value={num}
          type="number"
          inputMode="numeric"
          placeholder="Non-decimal, positive numbers only"
        />
      </div>
      <div className="results">
        {!error ? (
          num ? (
            <>
              <h2>
                {num} is {primeRes}.
              </h2>
              <h2>
                {num}! = {factorialRes}
              </h2>
            </>
          ) : (
            <>
              <h4>
                Fun fact: 0 is neither prime nor composite because any number
                multiplied by 0 is 0, which means the factors that produce a
                product of 0 are infinite. It also cannot be considered a prime
                number since prime numbers should only be divided by itself and
                1 without any remainders. However, 0 divided by 0 is undefined.
              </h4>
              <h2>0! = 1</h2>
            </>
          )
        ) : (
          <h2>{error}</h2>
        )}
      </div>
    </>
  );
}

export default App;
