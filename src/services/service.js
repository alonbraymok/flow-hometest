import axios from "axios";
import { BASE_URL } from "utils/constans";

export async function setDoc(collection, id, data) {
  try {
    const res = await axios.put(`${BASE_URL}${collection}/${id}`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteDoc(collection, id) {
  try {
    const res = await axios.delete(`${BASE_URL}${collection}/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
}
