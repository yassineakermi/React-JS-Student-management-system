export interface Student {
  id: string;
  name: string;
  lastname: string;
  email: string;
  age: number;
  nationality: string;
}

export type Students = Array<Student>;
export type StudentDTO = Omit<Student, "id">;

export interface ContextState {
  students: Students;
  loading: boolean;
  error: string | null;
}

export type StudentsActions =
  | { type: "SET_STUDENTS"; payload: Students }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "ADD_STUDENT"; payload: Student }
  | { type: "EDIT_STUDENT"; payload: Student }
  | { type: "DELETE_STUDENT"; payload: string };
