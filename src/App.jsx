import { useState } from "react";
import { TranslatorContext } from "./context/TranslatorContext";
import Translator from "./pages/Translator";

function App() {
  const [textToBeTranslated, setTextToBeTranslated] = useState("");
  return (
    <>
      <TranslatorContext.Provider
        value={{ textToBeTranslated, setTextToBeTranslated }}
      >
        <Translator />
      </TranslatorContext.Provider>
    </>
  );
}

export default App;
