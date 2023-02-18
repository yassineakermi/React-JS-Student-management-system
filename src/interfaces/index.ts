import { Url } from "url";

export interface Student {
  id: string;
  title: string;
  added_at: string;
  added_by: string;
  categories: Array<string>;
  colors: Array<string>;
  image: string | undefined;
  l: string | number;
  s: string | number;
  m: string | number;
  xl: string | number;
  xs: string | number;
}

export type Students = Array<Student>;
export type StudentDTO = Omit<Student, "id" | "added_by" | "added_at">;

export interface ContextState {
  students: Students;
  loading: boolean;
  error: string | null;
  categories: Array<string>;
  colors: Array<string>;
}

export type StudentsActions =
  | { type: "SET_STUDENTS"; payload: Students }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "ADD_STUDENT"; payload: Student }
  | { type: "EDIT_STUDENT"; payload: Student }
  | { type: "DELETE_STUDENT"; payload: string }
  | { type: "SET_CATEGORIES"; payload: Array<string> }
  | { type: "SET_COLORS"; payload: Array<string> };
