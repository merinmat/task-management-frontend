import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [task, setTask] = useState(""); // i/p field
  const [tasks, setTasks] = useState([]); // list of tasks
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Unable to load tasks. Please try again.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleAddTask = async (event) => {
    event.preventDefault();

    if (!task.trim()) {
      setError("Task cannot be empty.");
      return;
    }

    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: task,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create task.");
        return;
      }

      setTasks((currentTasks) => [...currentTasks, data]);
      setTask("");
    } catch (error) {
      console.error(error);
      setError("Unable to create task. Please try again.");
    }
  };

  const handleToggleTask = async (id, completed) => {
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: !completed,
          }),
        },
      );

      const updatedTask = await response.json();

      if (!response.ok) {
        setError(updatedTask.message || "Unable to update task.");
        return;
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task,
        ),
      );
    } catch (error) {
      console.error(error);
      setError("Unable to toggle task. Please try again.");
    }
  };

  const handleEditTask = async (id) => {
    if (!editingTitle.trim()) {
      setError("Task cannot be empty.");
      return;
    }

    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editingTitle,
          }),
        },
      );

      const updatedTask = await response.json();

      if (!response.ok) {
        setError(updatedTask.message || "Unable to edit task.");
        return;
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task,
        ),
      );

      setEditingId(null);
      setEditingTitle("");
    } catch (error) {
      console.error(error);
      setError("Unable to edit task. Please try again.");
    }
  };

  const handleDeleteTask = async (id) => {
    setError("");
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to delete task.");
        return;
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id),
      );
    } catch (error) {
      console.error(error);
      setError("Unable to delete tasks. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  //my tasks vs completed tasks
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          My Tasks
        </h2>
        <p className="mt-2 text-slate-500">
          Stay organized and keep track of what needs to get done.
        </p>
      </div>

      {/* Add Task */}
      <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Add a new task
        </h3>

        <form
          onSubmit={handleAddTask}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            Add Task
          </button>
        </form>
      </section>

      {loading && (
        <p className="mb-6 text-sm text-slate-500">Loading tasks...</p>
      )}

      {error && (
        <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* My Tasks */}
      <section className="mb-8">
        <h3 className="mb-4 text-xl font-semibold text-slate-900">My Tasks</h3>

        <ul className="space-y-3">
          {pendingTasks.map((task) => (
            <li
              key={task._id}
              className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
            >
              {editingId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(event) => setEditingTitle(event.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2"
                  />

                  <button
                    onClick={() => handleEditTask(task._id)}
                    className="ml-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    Save
                  </button>
                </>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-auto text-slate-800">{task.title}</span>

                  <button
                    onClick={() => handleToggleTask(task._id, task.completed)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(task._id);
                      setEditingTitle(task.title);
                    }}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Completed Tasks */}
      <section>
        <h3 className="mb-4 text-xl font-semibold text-slate-900">
          Completed Tasks
        </h3>

        <ul className="space-y-3">
          {completedTasks.map((task) => (
            <li
              key={task._id}
              className="flex flex-wrap items-center gap-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
            >
              <span className="mr-auto text-slate-400 line-through">
                {task.title}
              </span>

              <button
                onClick={() => handleToggleTask(task._id, task.completed)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Undo
              </button>

              <button
                onClick={() => handleDeleteTask(task._id)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Logout */}
      <div className="mt-10 border-t border-slate-200 pt-6">
        <button
          onClick={handleLogout}
          className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
