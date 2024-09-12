function Table({ tableCols, children }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="w-full bg-blue-100">
        <thead>
          <tr className="bg-slate-800 text-white text-center font-bold">
            {tableCols.map(
              (col) =>
                col && (
                  <th key={col} className="py-2 px-4">
                    {col}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
export default Table;
