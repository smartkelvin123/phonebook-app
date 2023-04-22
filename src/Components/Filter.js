// import React from "react";

// const Filter = ({ filterValue, handleFilterChange }) => {
//   return (
//     <div>
//       Filter by name:{" "}
//       <input value={filterValue} onChange={handleFilterChange} />
//     </div>
//   );
// };

// export default Filter;

import React from "react";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter by name: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
