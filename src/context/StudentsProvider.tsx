import { FC, useReducer, useEffect } from "react";
import axios from "axios";
import StudentsContext from "./StudentsContext";
import StudentsReducer from "../reducers/StudentsReducer";
import { Students, ContextState } from "../interfaces";
import { API_URL } from "../utils/base-url";

const INIT_STATE: ContextState = {
  students: [],
  loading: true,
  error: null,
};

const StudentsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(StudentsReducer, INIT_STATE);

  const getStudents = async () => {
    try {
      const { data } = await axios.get<Students>(API_URL);
      dispatch({ type: "SET_STUDENTS", payload: data });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Something went wrong." });
      console.error(e);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <StudentsContext.Provider value={{ state, dispatch }}>
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
