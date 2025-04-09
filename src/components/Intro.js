import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Me from '../assets/Images/profile-img.png';

const Box = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 65vw;
  height: 55vh;
  display: flex;
      z-index: 1;
      @media(max-width: 768px) {
        flex-direction:column;
      }
`;

const SubBox = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  
  @media(max-width: 768px) {
    width:100%;
    height:50%;
    }
    
  .pic {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 10%);
    width: 70vh;
    height: auto;
    @media (max-width: 768px) {
      left: 50%;
      width:60vw;
    }
  }
  &:nth-child(1) {
    border: 2px solid ${props => props.theme.body};
    border-right:none;
    overflow:hidden;
    @media (max-width: 768px) {
      border: 2px solid ${props => props.theme.body};
      border-bottom:none;
    }
  }
  
  &:nth-child(2) {
    border: 2px solid ${props => props.theme.text};
    border-left:none;
    @media (max-width: 768px) {
      border: 2px solid ${props => props.theme.text};
      border-top:none;
    }
  }

}
`;

const Text = styled.div`
  font-size: calc(1em + 1.5vw);
  color: ${props => props.theme.body};
  padding: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  & > *:last-child {
    color: ${props => `rgba(${props.theme.bodyRgba}, 0.6)`};
    font-size: calc(0.5rem + 1.5vw);
    font-weight: 300;
  }
`;

const Intro = () => {
  return (
    <Box
      initial={{ height: 0 }}
      animate={{ height: '55vh' }}
      transition={{ type: 'spring', duration: 2, delay: 1 }}
    >
      <SubBox>
        <Text>
          <h1>Hi,</h1>
          <h3>I'm Mohammad Akthar Pasha.</h3>
          <h6>I am a student developer with huge interest in Python programming and an AIML enthusiast.</h6>
        </Text>
      </SubBox>
      <SubBox>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <Link to="/MyPortfolio/chatbot"> {/* Ensure the path matches the route in App.js */}
            <img className="pic" src={Me} alt="Profile Pic" />
          </Link>
        </motion.div>
      </SubBox>
    </Box>
  );
};

export default Intro;
