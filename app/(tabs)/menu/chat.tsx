import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { chat } from "@/features/Menu/chat";

const ChatScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      text: "Hi! You can ask me anything about Boucherie's menu",
      isUser: false,
    },
  ]);

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const handlePromptInput = async () => {
    if (!searchText.trim() || isLoading) return;

    const userMessage = searchText.trim();
    const updatedHistory = [
      ...chatHistory,
      { text: userMessage, isUser: true },
      { text: "Thinking...", isUser: false },
    ];

    setSearchText(""); // Clear input
    setIsLoading(true);
    setChatHistory(updatedHistory); // Update with user message

    try {
      const aiResponse = await chat(false, updatedHistory);
      updatedHistory.pop();
      setChatHistory([...updatedHistory, { text: aiResponse, isUser: false }]);
    } catch (error) {
      console.error("Error calling chat API:", error);
      setChatHistory([
        ...updatedHistory,
        {
          text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              { justifyContent: message.isUser ? "flex-end" : "flex-start" },
            ]}
          >
            {!message.isUser && (
              <View style={styles.aiAvatar}>
                <Image
                  source={require("@/assets/icons/aiChat.png")}
                  style={styles.chatIcon}
                />
              </View>
            )}
            <View
              style={[
                styles.messageTextContainer,
                { backgroundColor: message.isUser ? "#ffffff" : "#5A5A5A" },
              ]}
            >
              <Text style={{ color: message.isUser ? "#5B5B5B" : "#ffffff" }}>
                {message.text}
              </Text>
            </View>
            {message.isUser && <View style={styles.userAvatar} />}
          </View>
        ))}
      </ScrollView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="I want something warm/sweet/..."
          value={searchText}
          onChangeText={handleSearchTextChange}
        />
        <TouchableOpacity
          style={styles.enterButton}
          onPress={handlePromptInput}
        >
          <MaterialIcons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingVertical: 80,
    top: 0,
    left: 0,
    right: 0,
    bottom: 80,
  },
  chatContainer: {
    padding: 20,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8DD0C5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  chatIcon: {
    width: 20,
    height: 20,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#888888",
    marginLeft: 10,
  },
  messageTextContainer: {
    padding: 15,
    borderRadius: 15,
    maxWidth: "70%",
    borderWidth: 1,
    borderColor: "#5A5A5A",
  },
  searchContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  searchBar: {
    width: "80%",
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dbdbdb",
    paddingLeft: 20,
  },
  enterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
