import React from "react";

const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {/* {person.name} */}
      {/* {person.number} {""} */}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </li>
  );
};

export default Person;

// const Note = ({ note, toggleImportance }) => {
//   const label = note.important ? "make not important" : "make important";

//   return (
//     <li className="note">
//       {note.content}
//       <button onClick={toggleImportance}>{label}</button>
//     </li>
//   );
// };
