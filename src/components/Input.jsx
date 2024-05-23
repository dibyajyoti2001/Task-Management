"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "@/app/styles/components/input.module.scss";

function Input({ children, label, type = "text", ...props }, ref) {
  const id = uuidv4();

  return (
    <div className={styles.input}>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} ref={ref} id={id} {...props} />
    </div>
  );
}

export default React.forwardRef(Input);
