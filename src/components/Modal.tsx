import { FC, FormEvent, useState } from "react";
import { useStudents } from "../hooks/useStudents";
import { useForm } from "../hooks/useForm";
import { Student, StudentDTO } from "../interfaces";
import { addStudent, editStudent } from "../services";
import { Button } from "./Button";
import { RawModal } from "./RawModal";
import { TextInput } from "./TextInput";

interface ModalProps {
  onClose: () => void;
  isEdit?: boolean;
  item?: Student;
}

export const Modal: FC<ModalProps> = ({ onClose, isEdit, item }) => {
  const [isValid, setIsValid] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(false);

  const { dispatch } = useStudents();

  const { values, handlerChange } = useForm<StudentDTO>({
    name: isEdit ? item!.name : "",
    lastname: isEdit ? item!.lastname : "",
    email: isEdit ? item!.email : "",
    nationality: isEdit ? item!.nationality : "Tunisian",
    age: isEdit ? item!.age : 0,
  });

  const { name, lastname, email, age, nationality } = values;

  const handlerAdd = async (e: FormEvent) => {
    e.preventDefault();

    if (name !== "" && lastname !== "" && email !== "" && age !== 0) {
      setBtnLoading(true);
      setIsValid(false);
      setError(false);

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

    if (name !== "" && lastname !== "" && email !== "" && age !== 0) {
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
        onSubmit={isEdit ? handlerEdit : handlerAdd}
        className="flex flex-col -mt-4 p-5 space-y-4 lg:px-8 sm:pb-6 xl:pb-8"
      >
        <h3 className="text-xl text-center font-medium text-gray-600">
          {isEdit ? "Edit student" : "Add a new Student"}
        </h3>

        <TextInput
          name="name"
          placeholder="Name"
          value={name}
          onChange={handlerChange}
        />

        <TextInput
          name="lastname"
          placeholder="Last Name"
          value={lastname}
          onChange={handlerChange}
        />

        <TextInput
          name="email"
          placeholder="Email"
          value={email}
          onChange={handlerChange}
        />

        <TextInput
          isNumberic
          name="age"
          placeholder="Age"
          value={age}
          onChange={handlerChange}
        />

        <select
          value={nationality}
          onChange={handlerChange}
          name="nationality"
          className="py-1 px-3 border-2 border-gray-200 rounded-xl transition ease-in-out focus:border-cyan-500 focus:outline-none"
        >
          <option value="Tunisian">Tunisian</option>
          <option value="Algerian">Algerian</option>
          <option value="Egyptian">Egyptian</option>
        </select>

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
