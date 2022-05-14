import { useState, createContext, useEffect } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const [taskEdit, setTaskEdit] = useState({
    task: {},
    edit: false,
  });

  useEffect(() => {
    fetchTask();
  }, []);

  //To fetch the Task Data
  const fetchTask = async () => {
    const response = await fetch(
      `http://localhost:5000/tasks?_sort=id&order=desc`
    );

    const data = await response.json();
    setTaskList(data);
    setIsLoading(false);
  };

  //To Add the Task
  const addTask = async (newTask) => {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const data = await response.json();
    setTaskList([data, ...taskList]);
  };

  //To edit the Task
  const editTask = (task) => {
    setTaskEdit({ task, edit: true });
  };

  //To delete the Task
  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
      setTaskList(taskList.filter((task) => task.id !== id));
    }
  };

  //To update the Task
  const updateTask = async (id, updTask) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await response.json();

    setTaskList(
      taskList.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  };

  //To check the Task
  const checkTask = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        taskList,
        taskEdit,
        isLoading,
        checkTask,
        deleteTask,
        addTask,
        editTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;