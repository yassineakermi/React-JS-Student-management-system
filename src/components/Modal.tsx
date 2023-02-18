import { FC, FormEvent, useState } from "react";
import { useStudents } from "../hooks/useStudents";
import { useForm } from "../hooks/useForm";
import { Student, StudentDTO } from "../interfaces";
import { addStudent, editStudent } from "../services";
import { Button } from "./Button";
import { RawModal } from "./RawModal";
import { TextInput } from "./TextInput";
import { db, storage } from "../../firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

interface ModalProps {
  onClose: () => void;
  cats: Array<string>;
  isEdit?: boolean;
  item?: Student;
}

let img_url = {
  url: "",
};

export const Modal: FC<ModalProps> = ({ cats = [], onClose, isEdit, item }) => {
  const [isValid, setIsValid] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState(new Array<string>());
  const [limage, setLimage] = useState(null);
  const [percent, setPercent] = useState(0);

  const { dispatch } = useStudents();

  const { values, handlerChange } = useForm<StudentDTO>({
    title: isEdit ? item!.title : "",
    xs: isEdit ? item!.xs : 0,
    xl: isEdit ? item!.xl : 0,
    m: isEdit ? item!.m : 0,
    l: isEdit ? item!.l : 0,
    s: isEdit ? item!.s : 0,
    categories: isEdit ? item!.categories : ([] as Array<string>),
    colors: isEdit ? item!.colors : ([] as Array<string>),
    image: isEdit ? item!.image : undefined,
  });

  const { title, xs, xl, l, m, s, image } = values;
  const handleUpload = async (e: FormEvent, file: File) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef = ref(
      storage,
      `${Date().toString()}_${file.name?.split("/").pop()}`
    ); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file as File);
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        console.log(percent);
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handlerAdd(url);
        });
      }
    );
  };
  const handlerAdd = async (url: string) => {
    if (title !== "") {
      setBtnLoading(true);
      setIsValid(false);
      setError(false);

      console.log(url, "window['img_url']");
      if (url) values.image = url;
      console.log(url);
      values.categories = categories;
      const { error, dataStudent } = await addStudent(values);

      if (!error) {
        dispatch({ type: "ADD_STUDENT", payload: dataStudent });
        onClose();
        return;
      }

      setError(true);
      setBtnLoading(false);
      return;
    }

    setIsValid(true);
    setError(false);
  };

  const handlerEdit = async (e: FormEvent) => {
    e.preventDefault();

    if (title != "") {
      setBtnLoading(true);
      setIsValid(false);
      setError(false);

      const { error, dataStudent } = await editStudent(item?.id!, values);

      if (!error) {
        dispatch({
          type: "EDIT_STUDENT",
          payload: { ...item!, ...dataStudent },
        });

        onClose();
        return;
      }

      setError(true);
      setBtnLoading(false);
      return;
    }

    setIsValid(true);
    setError(false);
  };

  return (
    <RawModal onClose={onClose}>
      <form
        onSubmit={isEdit ? handlerEdit : (e) => handleUpload(e, limage as File)}
        className="flex flex-col -mt-4 p-5 space-y-4 lg:px-8 sm:pb-6 xl:pb-8"
      >
        <h3 className="text-xl text-center font-medium text-gray-600">
          {isEdit ? "Edit student" : "Add a new Student"}
        </h3>

        <TextInput
          name="title"
          placeholder="Title"
          value={title}
          onChange={handlerChange}
        />

        <TextInput
          name="xl"
          placeholder="XL"
          value={xl}
          isNumberic={true}
          onChange={handlerChange}
        />

        <TextInput
          name="l"
          placeholder="L"
          value={l}
          isNumberic={true}
          onChange={handlerChange}
        />

        <TextInput
          isNumberic
          name="m"
          placeholder="M"
          value={m}
          onChange={handlerChange}
        />
        <TextInput
          isNumberic
          name="s"
          placeholder="S"
          value={s}
          onChange={handlerChange}
        />

        <TextInput
          isNumberic
          name="xs"
          placeholder="XS"
          value={xs}
          onChange={handlerChange}
        />

        <select
          value={categories}
          onChange={(e) => {
            console.log(categories);
            let i = categories.indexOf(e.target.value);
            if (i < 0) categories.push(e.target.value);
            else categories.splice(i, 1);
          }}
          multiple={true}
          name="categories"
          className="py-1 px-3 border-2 border-gray-200 rounded-xl transition ease-in-out focus:border-cyan-500 focus:outline-none"
        >
          {cats.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {limage ? (
          <div style={{ position: "relative" }}>
            <svg
              fill="#ffffff"
              height="800px"
              width="800px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 460.775 460.775"
              style={{
                position: "absolute",
                width: "30px",
                height: "30px",
                top: "5px",
                right: "5px",
                cursor: "pointer",
                padding: "5px",
                borderRadius: "50px",
              }}
              className="bg-red-500"
              onClick={(_) => setLimage(null)}
            >
              <path
                d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
              />
            </svg>
            <img
              src={URL.createObjectURL(limage as File)}
              width="150"
              height="250"
            />
          </div>
        ) : (
          <input
            type={"file"}
            placeholder={"Add image"}
            required
            accept="/image/*"
            onChange={async (e) => {
              await setLimage(e.target.files[0]);
              //await handleUpload(e.target.files[0]);
            }}
          />
        )}
        {/* Validation and Errors */}
        {isValid && (
          <div className="flex items-center justify-end">
            <p className="text-red-500 text-sm font-bold">
              All fields are required.
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-end">
            <p className="text-red-500 text-sm font-bold">
              Something went wrong.
            </p>
          </div>
        )}

        <hr />

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2">
          <Button label="Close" isClose click={onClose} />
          <Button
            label={btnLoading ? "Loading..." : isEdit ? "Edit" : "Add"}
            isSubmit
            isLoading={btnLoading}
          />
        </div>
      </form>
    </RawModal>
  );
};
