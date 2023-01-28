import axios, { AxiosRequestConfig } from "axios";
import { Student, StudentDTO } from "../interfaces";
import { API_URL } from "../utils/base-url";

export const addStudent = async (newStudent: StudentDTO) => {
  const result = { dataStudent: {} as Student, error: false };

  const { name, lastname, email, age, nationality } = newStudent;
  const FD = new FormData();
  FD.append("firstname", name);
  FD.append("lastname", lastname);
  FD.append("email", email);
  FD.append("age", age as unknown as string);
  FD.append("nationality", nationality);

  try {
    const { data } = await axios.post(`${API_URL}/create`, FD);
    console.log(data);

    result.dataStudent = data;
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};

export const editStudent = async (id: string, studentEdited: StudentDTO) => {
  const result = { dataStudent: {} as Student, error: false };

  const { name, lastname, email, age, nationality } = studentEdited;
  // const FD = new FormData();
  // FD.append("firstname", name);
  // FD.append("lastname", lastname);
  // // FD.append("email", email);
  // FD.append("age", age as unknown as string);
  // FD.append("nationality", nationality);
  var dataform = `{\r\n"firstname":"${name}",\r\n"lastname":"${lastname}",\r\n"age":"${age}",\r\n"nationality":"${nationality}"\r\n}`;
  var config = {
    method: "put",
    url: `${API_URL}/update/${id}`,
    headers: {
      "Content-Type": "text/plain",
    },
    data: dataform,
  } as AxiosRequestConfig;

  try {
    const { data } = await axios(config);
    result.dataStudent = data;
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
