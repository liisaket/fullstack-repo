import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notif">
      {message}
    </div>
  )
}

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      Filter shown with <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  const { addName, newName, handleNameChange, 
          newNumber, handleNumberChange } = props
  return (
    <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({ namesToShow, deleteName }) => {
  return (
    namesToShow.map(person => 
      <Person key={person.name} person={person} deleteName={deleteName} />)
  )
}

const Person = ({ person, deleteName }) => {
  return (
      <div>
        <p>{person.name} {person.number} {' '}
          <button onClick={() => deleteName(person)}>delete</button>
        </p>
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notifMessage, setnotifMessage] = useState(null)
  const names = persons.map(person => person.name)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (names.includes(newName)) {

      if (window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          
          const person = persons.find(p => p.name === newName)
          const changedPerson = { ...person, number: newNumber}

          personService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))})
            .finally(notif => {
              setnotifMessage(
                `Changed ${newName}'s number`
              )
              setTimeout(() => {
                setnotifMessage(null)
              }, 5000)
            setNewName('')
            setNewNumber('')
            })
      }}

      else {
        const nameObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }

        personService
          .create(nameObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
            })
            .finally(notif => {
              setnotifMessage(
                `Added ${newName} to the phonebook` 
              )
              setTimeout(() => {
                setnotifMessage(null)
              }, 5000)
            })
            setNewName('')
            setNewNumber('')
      }
  }

  const deleteName = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .del(person.id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== person.id))
          })
          .finally(notif => {
            setnotifMessage(
              `Deleted ${person.name} from the phonebook`
            )
            setTimeout(() => {
              setnotifMessage(null)
            }, 5000)
          })
    }
  }

  const namesToShow = newFilter
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notifMessage} />

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} 
          newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons namesToShow={namesToShow} deleteName={deleteName} />
    </div>
  )

}

export default App