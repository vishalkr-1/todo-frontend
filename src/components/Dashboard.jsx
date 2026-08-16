import { useState } from "react";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
} from "../features/todos/todoSlice";
import "./Dashboard.css";
import { useDispatch } from "react-redux";

function Dashboard() {
  const { data, isLoading, isError, error } = useGetAllTasksQuery();
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const [task, setTask] = useState();
  let remain = 0;

  const handleTodoInput = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = async (e) => {
    try {
      e.preventDefault();
      if (!task) {
        alert("please add a task");
        return;
      }
      if (task) {
        await addTask({
          taskname: task,
        }).unwrap();
      }
      setTask("");

      alert("task added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }
  data.forEach((el) => {
    if (el.status == "pending" || el.status == "in-progress") {
      remain++;
    }
  });

  return (
    <div className="dashboard">
      <div className="todo-card">
        <div className="header">
          <div>
            <h1>My Todo List</h1>
            <p>Manage your daily tasks</p>
          </div>

          <div className="task-count">
            <span>{data.length}</span>
            <small>Tasks</small>
          </div>
        </div>

        <form onSubmit={handleAddTask}>
          <div className="add-task">
            <input
              type="text"
              placeholder="What needs to be done?"
              name="taskname"
              onChange={handleTodoInput}
              value={task}
            />

            <button type="submit"> {!isAdding ? "Add Task" : "Adding"}</button>
          </div>
        </form>

        <div className="filters">
          <button className="active">All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>

        <div className="tasks">
          {data?.map((element) => {
            return (
              <div className="task-item" key={element._id}>
                <div className="task-info">
                  <input type="checkbox" />
                  <span>{element.task_name}</span>
                  <span>{element.status}</span>
                  <span>
                    {new Date(element.start_Date).toLocaleDateString()}
                  </span>
                </div>

                <div className="task-actions">
                  <button>✏️</button>
                  <button
                    onClick={async () => {
                      try {
                        if (!element._id) {
                          alert("no task clicked");
                          return;
                        }
                        await deleteTask(element._id).unwrap();
                        alert("task deleted");
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="footer">
          <span>{remain} tasks remaining</span>
          <button>Clear completed</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
