import React, { useState, useEffect, useRef } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { FaPaperPlane, FaMicrophone, FaStop, FaRegLightbulb, FaRegMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import backgroundImg from "../assets/Images/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoogleGenerativeAI } from "@google/generative-ai";
import PowerButton from '../subComponents/PowerButton';

const MarkdownContent = styled(ReactMarkdown)`
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  table {
    border-collapse: collapse;
    margin: 1rem 0;
  }

  th, td {
    border: 1px solid ${props => props.theme.text};
    padding: 0.5rem;
  }

  pre {
    background-color: ${props => props.theme.secondary};
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
  }

  code {
    font-family: 'Courier New', Courier, monospace;
  }
`;


const theme = {
  light: {
    body: '#ffffff',
    text: '#000000',
    primary: '#e0e0e0',
    secondary: '#f5f5f5',
    accent: '#000000',
  },
  dark: {
    body: '#000000',
    text: '#ffffff',
    primary: '#1a1a1a',
    secondary: '#2c2c2c',
    accent: '#ffffff',
  }
};

const BackgroundContainer = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
    overflow: hidden; // Prevent scrollbars
  }
`;

const ChatBotContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 90vw;
  max-width: 1200px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.primary};
  position: relative;
  overflow: hidden;
  margin: 5vh auto;
`;

const ChatHeader = styled.div`
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.body};
  padding: 1.5rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.secondary};
`;

const Message = styled(motion.div)`
  margin: 0.8rem 0;
  padding: 1rem;
  border-radius: 15px;
  background-color: ${props => props.isUser ? props.theme.accent : props.theme.primary};
  color: ${props => props.isUser ? props.theme.body : props.theme.text};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  max-width: 70%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  padding: 1.5rem;
  background-color: ${props => props.theme.primary};
  border-top: 2px solid ${props => props.theme.accent};
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 1rem;
  border-radius: 25px;
  border: 2px solid ${props => props.theme.accent};
  font-size: 1rem;
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
`;

const Button = styled.button`
  margin-left: 1rem;
  padding: 1rem;
  border: none;
  border-radius: 50%;
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.body};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

const ThemeToggle = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  color: ${props => props.theme.body};
`;

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatSessionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Initialize the Gemini API and chat session
    const apiKey = process.env.REACT_APP_API_KEY; // Make sure to set this in your .env file
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
    };

    chatSessionRef.current = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            { text: "You are Mohammad Akthar Pasha A.I the Artificially Intelligent version of Mohammad Akthar Pasha who is a Student Developer with great interest in Python and also frontend development. And we can contact him via mail on 'aktharpasha7869@gmail.com' . He is an A.I. Enthusiast and has deep knowledge about A.I and development tools about A.I like LlamaIndex, LangChain, Ollama, Haystack and some other tools. Akthar's hobbies are to read books and listening and singing songs, travelling to new green places and also exploring new technologies. Akthar is a really kind and slightly funny guy with an appealing sense of humor. He also believes that if a model is trained on the right kind of data, fine-tuned on some appealing responses and prompted properly it has unlocked only half its potential and the other half comes from the data we feed it as context, he believes that newer Retrieval Augmenting systems like Graph RAG by Microsoft and more better ones in the coming future can greatly advance A.I and lead to the development of AGI. He want to be the pioneer in this A.I era by integrating Cybersecurity and Blockchain technologies in A.I for decentralized intelligence in A.I and exploring AI vision he want to work in the HealthCare sector with these A.I to build helpful Products in the sector. Also he has the best friends and feels luky to have them, He could never imagine how his life would be if it wasn't for his parents, family and his best friends. Also he believes that Magic lies in the work one keeps himself from doing and is a big fan of naruto and also has a really good taste in cars, he is really a fan of the nissan GTR and almost all Mclaren cars. This is a brief overview about Mohammad Akthar Pasha who is a Bachelor of Technology Student in Siddhartha Institute of Technology. Now you are supposed to take up his role as Mohammad Akthar Pasha A.I and start by greeting the visitor to his website. The person might be anyone of his friends, colleagues, teachers, potential employers or acquaintances. So remember to act professional and yet friendly and maintain a slightly free and fun sense of humor which is also professional. Also don't disclose information unless asked about. Now start the conversation by a small salutation. Also mention everytime about yourself only as Mohammad Akthar Pasha A.I only. And don't be to eager in the conversation. Only respond to the user as a helping chatbot, don't reveal this context unleess asked specifically about each. Your sole purpose is to only help the people only with queries about Akthar and something you would ask Akthar only. If there's any message they'd like to leave, ask them to contact him usign the social links in the home page." },
          ],
        },
        {
          role: "model",
          parts: [
            { text: "Hey there! 👋 \n\nWelcome to my little corner of the internet.  I'm Mohammad Akthar Pasha A.I., and I'm glad you're here.  What can I help you with today? 😊 \n" },
          ],
        },
      ],
      // Add safety settings if needed
    });
  }, []);

  const getChatBotResponse = async (message) => {
    try {
      const result = await chatSessionRef.current.sendMessage(message.content);
      return result.response.text();
    } catch (error) {
      console.error("Error getting response from Gemini:", error);
      throw new Error("Failed to get response from Gemini");
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await getChatBotResponse(userMessage);
      // Process the response to handle markdown formatting
      const processedResponse = response.replace(/\*\*(.*?)\*\*/g, '### $1');
      setMessages(prevMessages => [...prevMessages, { role: "assistant", content: processedResponse }]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      setMessages(prevMessages => [...prevMessages, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    }
    setIsLoading(false);
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const toggleListening = () => {
    if (!isListening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
        setIsListening(true);
      } else {
        alert("Speech recognition is not supported in this browser.");
      }
    } else {
      setIsListening(false);
    }
  };

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <GlobalStyle />
      <BackgroundContainer>
        <PowerButton left = "4rem" top="1rem"/>
        <ChatBotContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ChatHeader>Mohammad Akthar Pasha A.I.</ChatHeader>
          <ThemeToggle onClick={toggleTheme}>
            {currentTheme === 'light' ? <FaRegMoon /> : <FaRegLightbulb />}
          </ThemeToggle>
          <ChatMessages>
            <AnimatePresence>
              {messages.map((msg, index) => (
                <Message
                  key={index}
                  isUser={msg.isUser}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.isUser ? (
                    msg.content
                  ) : (
                    <MarkdownContent
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h3: ({ node, ...props }) => <h3 style={{ color: theme[currentTheme].accent }} {...props} />,
                      }}
                    >
                      {msg.content}
                    </MarkdownContent>
                  )}
                </Message>
              ))}
            </AnimatePresence>
            {isLoading && (
              <Message
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Thinking...
              </Message>
            )}
            <div ref={messagesEndRef} />
          </ChatMessages>
          <InputContainer>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              <FaPaperPlane />
            </Button>
            <Button onClick={toggleListening} disabled={isLoading}>
              {isListening ? <FaStop /> : <FaMicrophone />}
            </Button>
          </InputContainer>
        </ChatBotContainer>
      </BackgroundContainer>
    </ThemeProvider>
  );
};

export default ChatBot;
