import React, { Component } from 'react';
import Header from './Header';
import Tasks from "./Tasks";
import "../index.css";
import { useState } from "react";

const App2  = () => {
        const [tasks, setTasks] = useState([
          {
            id: 1,
            text: "Doctors",
            day: "Today",
            reminder: true,
          },
          {
            id: 2,
            text: "Dentist",
            day: "Today",
            reminder: true,
          },
          {
            id: 3,
            text: "Biking",
            day: "Today",
            reminder: true,
          },
          {
            id: 4,
            text: "Date",
            day: "Today",
            reminder: false,
          },
        ]);
return ( <div className="container"><Header></Header><Tasks tasks = {tasks}></Tasks></div>);
    
}
 
export default App2;