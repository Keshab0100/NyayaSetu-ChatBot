import axios from "axios";
const URL = "https://34.125.160.99:9000/generate_text";

export const chatbotRes = async (data) => {
    const prompt = {"prompt": `${data}`}
    console.log(data)
    const headers = {
        "Content-Type": "application/json",
      };
  try {
    console.log(prompt)
    const temp =  await axios.post(`${URL}`, prompt, headers);
    console.log(temp)
    return temp
  } catch (err) {
    console.log("error while getting response", err);
  }
};