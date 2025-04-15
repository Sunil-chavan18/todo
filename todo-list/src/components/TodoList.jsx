import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import TodoItem from "./TodoItem";
import "../styles/TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, deadline) => {
    const newTask = { id: Date.now(), text, deadline, isPending: false };
    setTasks((prevTasks) => [...prevTasks, newTask].sort((a, b) => a.deadline - b.deadline));
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  const markTaskAsPending = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isPending: true } : task
      )
    );
  };

  const completeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <AddTask onAdd={addTask} />
      <ul className="task-list">
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} onDelete={deleteTask} onMarkPending={markTaskAsPending} onComplete={completeTask} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
