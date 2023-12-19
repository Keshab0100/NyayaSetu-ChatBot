import "./App.css";
import { useEffect, useState } from "react";
import { chatbotRes } from "./service/api";
import LeftText from "./components/LeftText.jsx";
import RightText from "./components/RightText.jsx";
import image1 from "./image-removebg-preview (45) (1).png";
import image2 from "./image-removebg-preview (44) (1).png";

function App() {
  const [chat, setChat] = useState(["Hi, how can I help you today?"]);
  const [req, setRequest] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Updated Chat");
  }, [chat, req, loading]);

  const temp = async (newText) => {
    console.log(newText)
    setChat((prevArray) => [...prevArray, newText.data.generated_text]);
  };

  const handleClick = async (newText) => {
    setChat((prevArray) => [...prevArray, newText]);
    setRequest("");
    setLoading(true);

    setChat((prevArray) => [...prevArray, "Typing..."]);
    var data = await chatbotRes(req);
    console.log(data)
    setChat((prevArray) => prevArray.slice(0, -1));
    setLoading(false);
    temp(data);
  };

  return (
    <>
      <div className="chat-container">
        <div className="header">
          <img alt="legalalt" className="imgclass" src={image2}></img>
          <div>Nyaya-Bot</div>
          <img alt="legalalt2" className="imgclass" src={image1}></img>
          </div>
        <div className="message-area">
          <div>
            {chat.map((e, index) => (
              <div className="text" key={index}>
                {index % 2 === 0 ? (
                  <RightText data={e} />
                ) : (
                  <LeftText data={e} />
                )}
              </div>
            ))}
          </div>
        </div>
        <form className="footer">
          <input
            type="text"
            className="input-message"
            placeholder="Type message"
            value={req}
            onChange={(e) => setRequest(e.target.value)}
          />
          <button
            className="send-button"
            onClick={(e) => {
              e.preventDefault();
              handleClick(req);
            }}
          >
            {" "}
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
