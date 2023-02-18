import axios, { AxiosRequestConfig } from "axios";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { Student, StudentDTO } from "../interfaces";
import { API_URL } from "../utils/base-url";

export const addStudent = async (newStudent: StudentDTO) => {
  const result = { dataStudent: {} as Student, error: false };
  console.log(newStudent, "newStudent");

  try {
    console.log("before");

    let newDoc = await addDoc(collection(db, "products"), {
      ...newStudent,
      added_at: new Date().toDateString(),
      added_by: auth.currentUser?.uid || "",
    });
    console.log("after");

    result.dataStudent = {
      id: newDoc.id,
      ...newStudent,
      added_at: new Date().toDateString(),
      added_by: auth.currentUser?.uid || "",
    };

    alert("Product Added Successfully");
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};

export const editStudent = async (id: string, studentEdited: StudentDTO) => {
  const result = { dataStudent: {} as Student, error: false };

  try {
    //result.dataStudent = data;
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};

export const deleteStudent = async (id: string) => {
  const result = { error: false };

  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};
