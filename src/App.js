import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./components/Themes";
import { AnimatePresence } from "framer-motion";
import GlobalStyle from "./globalStyles";

// Components
import Main from "./components/Main";
import AboutPage from "./components/AboutPage";
import BlogPage from "./components/BlogPage";
import WorkPage from "./components/WorkPage";
import MySkillsPage from "./components/MySkillsPage";
import ChatBot from "./components/ChatBot"; // Import the ChatBot component

function App() {
  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={lightTheme}>

        {/* For framer-motion animation on page change! */}
        <AnimatePresence mode='wait'>
          <Routes>
            <Route exact path="/MyPortfolio/" element={<Main />} />
            <Route exact path="/MyPortfolio/about" element={<AboutPage />} />
            <Route exact path="/MyPortfolio/blog" element={<BlogPage />} />
            <Route exact path="/MyPortfolio/work" element={<WorkPage />} />
            <Route exact path="/MyPortfolio/skills" element={<MySkillsPage />} />
            <Route exact path="/MyPortfolio/chatbot" element={<ChatBot />} /> {/* Add the new route for ChatBot */}
            {/* Catch-all route */}
            <Route exact path="*" element={<Main />} />
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default App;
