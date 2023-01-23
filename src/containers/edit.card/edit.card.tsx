import React, { useState } from "react";
import { EDIT_TYPE } from "utils/constans.js";
import { deleteDoc, setDoc } from "../../services/service.js";
import "./edit.card.css";
export default function EditCard({ item, onFinish }: any) {
  const [value, setValue] = useState("");

  async function onEdit() {
    let user;
    switch (item.type) {
      case EDIT_TYPE.TITLE:
        const post = {
          ...item.value,
          title: value,
        };

        await setDoc("posts", item.value.id, post);
        onFinish();
        break;
      case EDIT_TYPE.NAME:
        user = {
          ...item.value,
          name: value,
        };
        await setDoc("users", item.value.id, user);
        onFinish();
        break;
      case EDIT_TYPE.COMPANY:
        user = {
          ...item.value,
          company: {
            ...item.value.comapny,
            name: value,
          },
        };
        await setDoc("users", item.value.id, user);
        onFinish();
        break;

      default:
        break;
    }
  }

  function onDelete() {
    const collection = item?.type === "title" ? "posts" : "users";
    deleteDoc(collection, item.value.id);
  }

  return (
    <>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`change ${item?.type}`}
      />
      <button onClick={onEdit} className="editBtn">
        Edit
      </button>
      <button onClick={onDelete} className="deleteBtn">
        Delete
      </button>
    </>
  );
}
