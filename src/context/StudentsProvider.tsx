import { FC, useReducer, useEffect, useState } from "react";
import axios from "axios";
import StudentsContext from "./StudentsContext";
import StudentsReducer from "../reducers/StudentsReducer";
import { Students, ContextState, Student } from "../interfaces";
import { API_URL } from "../utils/base-url";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  startAfter,
  orderBy,
  limit,
  query,
  where,
  DocumentData,
  FieldValue,
} from "firebase/firestore";

const INIT_STATE: ContextState = {
  students: [],
  loading: true,
  error: null,
  categories: [],
  colors: [],
};

const StudentsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(StudentsReducer, INIT_STATE);
  const [lastKey, setLastKey] = useState(null);
  const [products, setProducts] = useState(new Array<Student>());

  async function getCategories() {
    const querySnapshot = await getDocs(collection(db, "categories"));
    let cats: Array<string> = querySnapshot?.docs?.map((doc) => {
      return doc.data()["name"];
    });
    if (!cats.includes("All")) cats.unshift("All");
    dispatch({
      type: "SET_CATEGORIES",
      payload: cats,
    });
  }
  async function getColors() {
    const querySnapshot = await getDocs(collection(db, "colors"));
    let colors: Array<string> = querySnapshot?.docs?.map((doc) => {
      return doc.data()["colors"];
    });
    if (!colors.includes("All")) colors.unshift("All");
    dispatch({
      type: "SET_COLORS",
      payload: [colors[0], ...colors[1]],
    });
  }

  const getStudents = async (more = false) => {
    const start = performance.now();
    const start2 = Date.now();

    let q;

    if (!more) {
      q = query(collection(db, "products"), orderBy("added_at"), limit(50));
    } else {
      q = query(
        collection(db, "products"),
        orderBy("added_at"),
        startAfter(lastKey),
        limit(50)
      );
    }
    try {
      const data = await getDocs(q);
      console.log(data.docs.length);
      let _products: Array<Student> = [];
      let lastKey = null;
      data.forEach((doc: DocumentData) => {
        _products.push({
          id: doc.id,
          ...doc.data(),
        });
        lastKey = doc;
      });
      // if (more) setProducts([...products, ..._products]);
      // else setProducts(_products);
      console.log(_products);
      dispatch({
        type: "SET_STUDENTS",
        payload: more ? [...products, ..._products] : _products,
      });
      setLastKey(lastKey);
      console.log(_products.length);
      const start = Date.now();
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Something went wrong." });
      console.error(e);
    }
    const end2 = Date.now();

    const end = performance.now();
    console.log(`Execution time: ${end2 - start2} ms`);
    console.log(`Execution time: ${end - start} ms`);
  };

  useEffect(() => {
    getStudents();
    getCategories();
    getColors();
  }, []);

  return (
    <StudentsContext.Provider value={{ state, dispatch }}>
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
