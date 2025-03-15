import React, { useState } from "react";

// Enum for Task Priority
enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

// Interface for Task Object
interface Task {
  id: number;
  description: string;
  priority: Priority;
  completed: boolean;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>(Priority.Low);

  // Add Task
  const addTask = () => {
    if (!description) return;
    const newTask: Task = {
      id: Date.now(),
      description,
      priority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setDescription("");
    setPriority(Priority.Low);
  };

  // Toggle Task Completion
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Filter Tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true;
  });

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
          {Object.values(Priority).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Incomplete")}>Incomplete</button>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.description} - {task.priority}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
