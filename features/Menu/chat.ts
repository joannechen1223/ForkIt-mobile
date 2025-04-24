// Initialize chat endpoint
import Constants from "expo-constants";

const serverUrl = Constants.expoConfig?.extra?.serverUrl;
const CHAT_ENDPOINT = `${serverUrl}/chat`;

const generateSystemPrompt = (menu: any, dishes: any) => {
  return `You are a helpful and knowledgeable restaurant assistant at ${menu.restaurantName}. Help customers choose dishes from our menu based on their preferences. 
  Keep responses concise and friendly. These are all available choices:
  ${Object.values(dishes)
    .map((dish: any) => dish.name + "(" + dish.translationName + ")")
    .join(", ")}
  `;
};

export const chat = async (
  menu: any,
  dishes: any,
  messages: { text: string; isUser: boolean }[],
) => {
  const response = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemPrompt: generateSystemPrompt(menu, dishes),
      history: messages.map((msg) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      })),
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch chat response");
  }
  const data = await response.json();

  // Add AI response to chat
  const aiResponse = data.message;
  return aiResponse;
};
