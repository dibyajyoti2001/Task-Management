"use client";

import styles from "@/app/styles/components/read.module.scss";
import { deleteTask, selectTask } from "@/store/taskSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Read() {
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleUpdate = (task) => {
    dispatch(selectTask(task.id));
    router.push(`/update/${task.id}`);
  };

  return (
    <div className={styles.read}>
      <div>
        <ul>
          {tasks &&
            tasks.map((task) => (
              <li key={task.id}>
                <span>
                  <p>{task.title}</p>
                </span>
                <span>
                  <p>{task.description}</p>
                </span>
                <div>
                  <span>
                    <button
                      onClick={() => {
                        handleUpdate(task);
                      }}
                    >
                      ✏️
                    </button>
                  </span>
                  <span className="deletedSpan">
                    <button onClick={() => dispatch(deleteTask(task.id))}>
                      ❌
                    </button>
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
