import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import Footer from "./Footer";
import About from "./About";

import "../index.css";
import { useState, useEffect } from "react";

const App2 = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);
  const fetchTasks = async () => {
    const res = await fetch("http://gadob.com/tasks");
    const data = await res.json();

    return data;
  };

    const fetchTask = async (id) => {
      const res = await fetch(`http://gadob.com/tasks/${id}`);
      const data = await res.json();

      return data;
    };

  const deleteTask = async(id) => {
    await fetch(`http://gadob.com/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch(`http://gadob.com/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  const addTask = async (task) => {
    const res = await fetch("http://gadob.com/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    console.log(data);

    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        ></Header>
        
        <Route path="/" exact render={(props) => (<>{showAddTask ? <AddTask onAdd={addTask}></AddTask> : ""}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          ></Tasks>
        ) : (
          <h2>No Tasks to show</h2>
        )}</>)} ></Route>
        <Route path="/about" component={About}></Route>
        <Footer></Footer>
      </div>
    </Router>
  );
};

export default App2;
