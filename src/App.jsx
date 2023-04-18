import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3003/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const updatedPerson = { ...existingPerson, number: newNumber };
      axios
        .put(
          `http://localhost:3003/persons/${existingPerson.id}`,
          updatedPerson
        )
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === existingPerson.id ? response.data : person
            )
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const newPerson = { name: newName, number: newNumber };
      axios
        .post("http://localhost:3003/persons", newPerson)
        .then((response) => {
          setPersons([...persons, response.data]);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deletePerson = (id) => {
    axios
      .delete(`http://localhost:3003/persons/${id}`)
      .then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <h3>Add a new person</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
