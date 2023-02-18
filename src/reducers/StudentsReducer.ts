import { StudentsActions, ContextState } from "../interfaces";

const StudentsReducer = (
  state: ContextState,
  action: StudentsActions
): ContextState => {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        ...state,
        loading: false,
        students: action.payload,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case "SET_COLORS":
      return {
        ...state,
        loading: false,
        colors: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_STUDENT":
      console.log(state);

      return {
        ...state,
        students: [...state.students, action.payload],
      };

    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      };

    case "EDIT_STUDENT":
      const found = state.students.find(
        (item) => item.id === action.payload.id
      );

      return {
        ...state,
        students: state.students.map((student) => {
          if (found) {
            Object.assign(found, action.payload);

            return {
              ...student,
            };
          }

          return student;
        }),
      };

    default:
      return state;
  }
};

export default StudentsReducer;
