import { useEffect, useState } from "react";
import { useStudents } from "../hooks/useStudents";
import { Button } from "./Button";
import { StudentsItem } from "./StudentItem";
import { Modal } from "./Modal";
import { Spinner } from "./Spinner";
import { Table } from "./Table";

export const StudentsList = () => {
  const { students, loading, error, categories } = useStudents();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {loading && <Spinner />}

      {!loading && !error && (
        <>
          <div className="flex flex-col items-end mt-5">
            <Button
              label="New product"
              click={() => setShowModal(!showModal)}
            />
          </div>

          <Table>
            {students.map((item) => (
              <StudentsItem key={item.id} student={item} />
            ))}

            {!students.length && (
              <tr className="bg-white">
                <td colSpan={7} className="py-4 px-6 text-sm text-center">
                  <p className="font-semibold">There are no products. 😢</p>
                </td>
              </tr>
            )}
          </Table>
        </>
      )}

      {error && (
        <div className="flex items-center justify-center h-89v">
          <p className="font-bold text-red-500 text-xl">{error} 😢</p>
        </div>
      )}

      {showModal && (
        <Modal cats={categories} onClose={() => setShowModal(!showModal)} />
      )}
    </>
  );
};
