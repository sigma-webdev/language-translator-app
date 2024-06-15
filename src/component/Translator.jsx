import { useState } from "react";
import languages from "../helper/language";
import sound from "../assets/speaker-wave.svg";
import swap from "../assets/arrows-right-left.svg";

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en-GB"); // set to default code value of english
  const [outputLanguage, setOutputLanguage] = useState("hi-IN"); // set ot default code value of hindi

  // inter-change of languages and text
  const handleSwap = () => {
    // interchange text
    let tempText = inputText;
    setInputText(outputText);
    setOutputText(tempText);

    // interchange language
    let tempLang = inputLanguage;
    setInputLanguage(outputLanguage);
    setOutputLanguage(tempLang);
  };

  // speak functionality
  const utterText = (text, language) => {
    const synth = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
  };

  const speak = (text, lan) => {
    utterText(text, lan);
  };

  const handleTranslator = () => {
    const url = `https://api.mymemory.translated.net/get?q=${inputText}&langpair=${inputLanguage}|${outputLanguage}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOutputText(data.responseData?.translatedText);
      });
  };

  return (
    <>
      <section className="w-1/2 mx-auto text-center border rounded shadow-md my-28">
        <h1> Language Translator API </h1>
        <div className="flex justify-between py-6 ">
          {/* Input language text */}
          <div className="w-1/2 border">
            {/* text input area  */}
            <textarea
              name="input-text"
              id="input-text"
              placeholder="Enter text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-2 focus:outline-gray-200 "
              rows={8}
            ></textarea>
            {/* language and speak area */}
            <div className="flex items-center justify-between w-full gap-2 p-2 border">
              <img
                onClick={() => speak(inputText, inputLanguage)}
                className="rounded-sm cursor-pointer hover:bg-gray-100"
                src={sound}
                alt="speak"
              />
              <select
                name="input-language"
                id="input-language"
                value={inputLanguage}
                onChange={(e) => setInputLanguage(e.target.value)}
                className="w-full p-1 border border-gray-200 outline-gray-500"
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <img
            className="my-auto cursor-pointer"
            onClick={handleSwap}
            src={swap}
            alt="inter-change"
          />

          {/* Output/translated language text */}
          <div className="w-1/2 border">
            {/* text output area */}
            <textarea
              name="output-text"
              id="output-text"
              className="w-full p-2 focus:outline-gray-200 "
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
              rows={8}
            ></textarea>
            {/* speak and select language area */}
            <div className="flex items-center justify-between w-full gap-2 p-2 border">
              <img
                onClick={() => speak(outputText, outputLanguage)}
                className="rounded-sm cursor-pointer hover:bg-gray-100"
                src={sound}
                alt="speak"
              />
              <select
                name="input-language"
                id="input-language"
                value={outputLanguage}
                onChange={(e) => setOutputLanguage(e.target.value)}
                className="w-full p-1 border border-gray-200 outline-gray-500 "
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button className="w-full p-2 border" onClick={handleTranslator}>
          {" "}
          Translate Text{" "}
        </button>
      </section>
    </>
  );
};

export default Translator;
