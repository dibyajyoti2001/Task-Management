"use client";

import styles from "@/app/styles/components/update.module.scss";
import Input from "@/components/Input";
import { updateTask } from "@/store/taskSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Update() {
  const router = useRouter();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const selectedTaskId = useSelector((state) => state.task.selectedTaskId);
  const [selectedTask, setSelectedTask] = useState({});

  useEffect(() => {
    if (selectedTaskId) {
      const taskToUpdate = tasks.find((task) => task.id === selectedTaskId);
      if (taskToUpdate) {
        setSelectedTask(taskToUpdate);
      }
    }
  }, [selectedTaskId, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask((prevSelectedTask) => ({
      ...prevSelectedTask,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTask(selectedTask));
    router.push("/read");
  };

  return (
    <div className={styles.update}>
      <div>
        <form onSubmit={handleUpdate}>
          <div>
            <Input
              label="Title"
              type="text"
              name="title"
              value={selectedTask.title || ""}
              onChange={handleChange}
              placeholder="Enter title here"
            />
            <Input
              label="Description"
              name="description"
              value={selectedTask.description || ""}
              onChange={handleChange}
              type="text"
              placeholder="Enter desc..."
            />
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
