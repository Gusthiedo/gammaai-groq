import "./App.css";
import { requestToGroqAI } from "./utils/groq";
import { useState } from "react";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// import swift from "react-syntax-highlighter/dist/cjs/languages/prism/swift";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import html from "react-syntax-highlighter/dist/cjs/languages/prism/markup";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("html", html);

const CodeSnippet = ({ language, code }) => (
  <SyntaxHighlighter
    language={language}
    style={darcula}
    wrapLongLines={true}
    customStyle={{
      padding: "1rem",
      borderRadius: "8px",
      backgroundColor: "#2D2D2D",
      fontSize: "1rem",
      lineHeight: "1.5",
      fontFamily: 'Consolas, "Courier New", monospace',
      marginBottom: "1rem",
    }}
  >
    {code}
  </SyntaxHighlighter>
);

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const content = document.getElementById("content").value;
    const ai = await requestToGroqAI(content);
    setData(ai);
    setLoading(false);
  };

  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 p-4">
      <h1 className="text-4xl text-indigo-400 font-extrabold mb-4 text-center">
        Gamma AI Will Help You To Find Almost Anything
      </h1>
      <form className="flex flex-col gap-4 py-4 w-full" onSubmit={handleSubmit}>
        <input
          placeholder="What do you want to search for?"
          className="py-2 px-4 text-md rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-lg"
          id="content"
          type="text"
          aria-label="Search Input"
        />
        <button
          className="bg-indigo-500 py-2 px-4 font-bold text-white rounded-md shadow-md hover:bg-indigo-600 transition-transform transform hover:scale-105"
          type="submit"
          aria-label="Search Button"
        >
          Search
        </button>
      </form>
      <div className="max-w-xl w-full mx-auto mt-4">
        {loading ? (
          <LoadingSpinner />
        ) : data ? (
          <div className="bg-gray-800 p-4 rounded-md shadow-lg overflow-x-auto">
            <SyntaxHighlighter
              language="swift"
              style={darcula}
              wrapLongLines={true}
              customStyle={{
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: "#2D2D2D",
                fontSize: "1rem",
                lineHeight: "1.5",
                fontFamily: 'Consolas, "Courier New", monospace',
              }}
              lineNumberStyle={{
                color: "#888",
                paddingRight: "1rem",
                fontSize: "0.875rem",
              }}
            >
              {data}
            </SyntaxHighlighter>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default App;
