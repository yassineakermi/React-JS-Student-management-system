import { FC } from "react";

export const Table: FC = ({ children }) => {
  return (
    <div className="flex flex-col mt-2">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-100 font-semibold">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase"
                  >
                    XL
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase"
                  >
                    XS
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase"
                  >
                    L
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase"
                  >
                    M
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase"
                  >
                    S
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase"
                  >
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Students */}
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
