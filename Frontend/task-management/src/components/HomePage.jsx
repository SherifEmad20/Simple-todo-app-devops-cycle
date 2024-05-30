import React, { useEffect, useState } from "react";
import { getTasks, updateTaskById, deleteTaskById, createTask } from "../api";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";

const HomePage = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title };
    const response = await createTask(newTask);
    fetchTasks(); // Refresh the task list after creating a new task
    setTitle("");
  };

  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data.data);
  };

  const handleComplete = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await updateTaskById(task.id, updatedTask);
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
  };

  const handleDelete = async (id) => {
    await deleteTaskById(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
  };

  const handleEditChange = (e) => {
    setEditingTaskTitle(e.target.value);
  };

  const handleEditSave = async (task) => {
    const updatedTask = { ...task, title: editingTaskTitle };
    await updateTaskById(task.id, updatedTask);
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    setEditingTaskId(null);
  };

  const handleEditCancel = () => {
    setEditingTaskId(null);
    setEditingTaskTitle("");
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="9" xl="7">
            <MDBCard className="rounded-3">
              <MDBCardBody className="p-4">
                <h4 className="text-center my-3 pb-3">To Do App</h4>
                <form onSubmit={handleSubmit}>
                  <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                    <MDBCol size="12">
                      <MDBInput
                        label="Enter a task here"
                        id="form1"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </MDBCol>
                    <MDBCol size="12">
                      <MDBBtn type="submit">Save</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </form>
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Task Name</th>
                      <th scope="col">Edit Task</th>
                      <th scope="col">Task Status</th>
                      <th scope="col">Remove Task</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {tasks &&
                      tasks.map((task, index) => (
                        <tr key={task.id}>
                          <th scope="row">{index + 1}</th>
                          <td
                            style={{
                              textDecoration: task.completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {editingTaskId === task.id ? (
                              <MDBInput
                                value={editingTaskTitle}
                                onChange={handleEditChange}
                                size="sm"
                              />
                            ) : (
                              task.title
                            )}
                          </td>
                          <td>
                            {editingTaskId === task.id ? (
                              <>
                                <MDBBtn
                                  color="success"
                                  size="sm"
                                  onClick={() => handleEditSave(task)}
                                >
                                  Save
                                </MDBBtn>
                                <MDBBtn
                                  color="warning"
                                  size="sm"
                                  onClick={handleEditCancel}
                                  style={{ marginLeft: "5px" }}
                                >
                                  Cancel
                                </MDBBtn>
                              </>
                            ) : (
                              <MDBBtn
                                color="primary"
                                size="sm"
                                onClick={() => handleEdit(task)}
                              >
                                Edit Task
                              </MDBBtn>
                            )}
                          </td>
                          <td>
                            <MDBBtn
                              color="primary"
                              size="sm"
                              onClick={() => handleComplete(task)}
                            >
                              {task.completed ? "Undo" : "Complete"}
                            </MDBBtn>
                          </td>
                          <td>
                            <MDBBtn
                              color="danger"
                              size="sm"
                              onClick={() => handleDelete(task.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </MDBBtn>
                          </td>
                        </tr>
                      ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default HomePage;
