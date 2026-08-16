import { useGetAllTasksQuery } from "../features/todos/todoSlice";
import "./Dashboard.css";

function Dashboard() {
  const { data, isLoading, isError, error, isFetching } = useGetAllTasksQuery();
  let remain = 0;
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

        <div className="add-task">
          <input type="text" placeholder="What needs to be done?" />
          <button>Add Task</button>
        </div>

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
                  <button>🗑️</button>
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
