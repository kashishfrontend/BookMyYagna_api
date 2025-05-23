import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './Routes/AppRoutes';
import FloatingContactButton from './Page/Contact/Floatingtring';
import ChatbotWidget from './Page/Chatbot/Chatbot';

function App() {


  return (
    <>
     <AppRoutes/>
     {/* <FloatingContactButton /> */}
     <ChatbotWidget/>
    </>
  )
}

export default App
 