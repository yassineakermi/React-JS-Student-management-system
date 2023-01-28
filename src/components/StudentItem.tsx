import { FC, useState } from "react";
import { useStudents } from "../hooks/useStudents";
import { Student } from "../interfaces";
import { deleteStudent } from "../services";
import { Dialog } from "./Dialog";
import { Modal } from "./Modal";

interface StudentsItemProps {
  student: Student;
}

export const StudentsItem: FC<StudentsItemProps> = ({ student }) => {
  const { id, name, lastname, email, age, nationality } = student;

  const { dispatch } = useStudents();
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [showDialogEdit, setShowDialogEdit] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlerDelete = async () => {
    setBtnLoading(true);
    setError(false);

    const { error } = await deleteStudent(id);

    if (!error) {
      dispatch({ type: "DELETE_STUDENT", payload: id });
      return;
    }

    setError(true);
    setBtnLoading(false);
  };

  return (
    <>
      <tr className="border-b odd:bg-white even:bg-gray-100 odd:bg-white even:bg-gray-50 border-gray-50">
        <td className="py-4 px-6 text-sm">{name}</td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">{lastname}</td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">{age}</td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">{email}</td>
        <td className="flex py-4 px-6 text-sm whitespace-nowrap">
          {nationality}
        </td>
        <td className="py-4 px-6 text-sm whitespace-nowrap space-x-3">
          <button
            onClick={() => setShowDialogEdit(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold p-1.5 rounded-xl"
          >
            ✏️
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold p-1.5 rounded-xl"
            onClick={() => setShowDialogDelete(true)}
          >
            🚫
          </button>
        </td>
      </tr>

      {showDialogDelete && (
        <Dialog
          click={handlerDelete}
          onClose={() => {
            setShowDialogDelete(false);
            setError(false);
            setBtnLoading(false);
          }}
          error={error}
          btnLoading={btnLoading}
        />
      )}

      {showDialogEdit && (
        <Modal isEdit item={student} onClose={() => setShowDialogEdit(false)} />
      )}
    </>
  );
};
