import { useState,useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './Routes/AppRoutes';
import FloatingContactButton from './Page/Contact/Floatingtring';
import ChatbotWidget from './Page/Chatbot/Chatbot';
import AOS from 'aos';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 300,
      offset: 10
    });
  }, []);

  return (
    <>

      <AppRoutes />
      <FloatingContactButton />
      {/* <ChatbotWidget/> */}
    </>
  )
}

export default App
