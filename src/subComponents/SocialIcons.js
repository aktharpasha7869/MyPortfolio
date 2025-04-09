import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Facebook, Github, Twitter, YouTube } from "../components/AllSvgs";
import { DarkTheme } from "../components/Themes";
import { useLocation } from "react-router-dom"; // Import useLocation to get the current URL

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 2rem;
  z-index: 3;

  & > *:not(:last-child) {
    margin: 0.5rem 0;
  }
`;

const Line = styled(motion.span)`
  width: 2px;
  height: 8rem;
  background-color: ${(props) => props.fillcolor};
`;

const SocialIcons = (props) => {
  const [fillcolor, setIconColor] = useState('black');
  const location = useLocation(); // Use React Router's useLocation hook to track current URL

  // Update icon color based on window width and URL path
  const updateIconColor = () => {
    const width = window.innerWidth;
    const path = location.pathname; // Get current path from location

    // Check if the path includes "/about" or "/work"
    if (path.includes('/about') || path.includes('/work')) {
      setIconColor('white'); // Set color to white for these pages
    } else {
      if (width < 768) {
        setIconColor(DarkTheme.body); // For small screens (use dark theme body color)
      } else {
        setIconColor(props.theme === "dark" ? DarkTheme.text : DarkTheme.body); // Use text or body color based on theme
      }
    }
  };

  useEffect(() => {
    updateIconColor();
    window.addEventListener('resize', updateIconColor); // Re-run on window resize

    // Cleanup event listener when component is unmounted
    return () => {
      window.removeEventListener('resize', updateIconColor);
    };
  }, [props.theme, location]); // Re-run when `props.theme` or `location` changes

  return (
    <Icons>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.5, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1 }}
      >
        <a
          style={{ color: "inherit" }}
          target="_blank"
          href={"https://github.com"}
        >
          <Github width={25} height={25} fill={fillcolor} />
        </a>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.5, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1.2 }}
      >
        <a
          style={{ color: "inherit" }}
          target="_blank"
          href={"https://twitter.com"}
        >
          <Twitter width={25} height={25} fill={fillcolor} />
        </a>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.5, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1.4 }}
      >
        <a
          style={{ color: "inherit" }}
          target="_blank"
          href={"https://facebook.com"}
        >
          <Facebook width={25} height={25} fill={fillcolor} />
        </a>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1.5, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1.6 }}
      >
        <a
          style={{ color: "inherit" }}
          target="_blank"
          href={"https://youtube.com"}
        >
          <YouTube width={25} height={25} fill={fillcolor} />
        </a>
      </motion.div>

      <Line
        fillcolor={fillcolor} // Pass fillcolor as a prop to Line component
        initial={{
          height: 0,
        }}
        animate={{
          height: "8rem",
        }}
        transition={{
          type: "spring",
          duration: 1,
          delay: 0.8,
        }}
      />
    </Icons>
  );
};

export default SocialIcons;
