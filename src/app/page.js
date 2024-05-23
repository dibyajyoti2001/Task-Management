"use client";

import styles from "@/app/styles/components/create.module.scss";
import Input from "@/components/Input";
import { addTask } from "@/store/taskSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTask(input));
    setInput({
      title: "",
      description: "",
    });

    router.push("/read");
  };
  return (
    <div className={styles.create}>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              label="Title"
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
              placeholder="Enter title here"
            />
            <Input
              label="Description"
              name="description"
              value={input.description}
              onChange={handleChange}
              type="text"
              placeholder="Enter desc..."
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
