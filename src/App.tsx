import { createMemo, createSignal, onMount } from "solid-js";
import "./App.css";

function App() {
  const text = `The quick brown fox jumps over the lazy dog. It is a sunny day and the birds are singing. I like to eat apples and bananas.
 Children love to play outside. We went to the park yesterday and saw many people.`;

  const [typed, setTyped] = createSignal("");

  const clear = () => setTyped("");

  onMount(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      event.preventDefault();

      const key = event.key;

      if (key.length === 1) {
        setTyped(setTyped(typed() + event.key));
      }

      if (key === "Backspace") {
        setTyped(typed().slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKeyUp);

    return () => window.removeEventListener("keydown", handleKeyUp);
  });

  const currentLetter = createMemo(() => {
    const letter = document.getElementById(`letter-${typed().length}`);

    if (letter) {
      const rect = letter.getBoundingClientRect();

      console.log(window.scrollY, window.scrollX);

      return rect;
    }

    return null;
  });

  return (
    <>
      {currentLetter() && (
        <div
          class="cursor"
          style={{
            transform: `translate(${currentLetter()!.left - 3}px, ${
              currentLetter()!.top + 4
            }px)`,
          }}
        />
      )}
      <p>
        {text.split("").map((letter, index) => (
          <span
            classList={{
              text: true,
              typed: !!typed()[index] && typed()[index] === letter,
              error: !!typed()[index] && typed()[index] !== letter,
            }}
            id={`letter-${index}`}
          >
            {letter}
          </span>
        ))}
      </p>
      <button onClick={clear}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M244 56v48a12 12 0 0 1-12 12h-48a12 12 0 1 1 0-24h17.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76 76 0 1 0 127 204h1a75.53 75.53 0 0 0 52.15-20.72a12 12 0 0 1 16.49 17.45A99.45 99.45 0 0 1 128 228h-1.37a100 100 0 1 1 71.88-170.94L220 76.72V56a12 12 0 0 1 24 0"
          />
        </svg>
      </button>
    </>
  );
}

export default App;
