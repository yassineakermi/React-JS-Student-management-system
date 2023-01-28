import { createContext, Dispatch } from "react";
import { StudentsActions, ContextState } from "../interfaces";

interface StudentsContextI {
  state: ContextState;
  dispatch: Dispatch<StudentsActions>;
}

const StudentsContext = createContext<StudentsContextI>({} as StudentsContextI);

export default StudentsContext;
