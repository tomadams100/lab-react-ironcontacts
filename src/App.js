import logo from './logo.svg';
import './App.css';
import contacts from './contacts.json'
import React, { useState } from "react";

const remainingContacts = [...contacts]
const initAgenda = remainingContacts.splice(0,5)

function wonEmmy(contact){
  if (contact.wonEmmy) return <td>🏆</td>
  else return <td></td>
}
function wonOscar(contact){
  if (contact.wonOscar) return <td>🏆</td>
  else return <td></td>
}

function App() {
  const [agenda, setAgenda] = useState(initAgenda)
  const addContact = () => {
    const ran = Math.floor(Math.random()*remainingContacts.length)
    const randomContact = remainingContacts.splice(ran,1)
    setAgenda(agenda.concat(randomContact))
  }
  const alphabetical = () => {
    const orderedList = agenda.sort((a,b)=>(a.name<b.name)? -1: null).slice()
    setAgenda(orderedList)
  }
  const popularity = () => {
    const orderedList = agenda.sort((a,b)=>(a.popularity<b.popularity)? -1: null).slice()
    setAgenda(orderedList)
  }
  const deletePerson = (i) => {
    const newList = agenda.slice()
    newList.splice(i,1)
    setAgenda(newList)
  }
  return (
    <div className="App">
    <h1>Ironhack Contacts</h1>
    <div className="container">
      <button className="btn btn-red m-2" onClick={addContact}>Add contact</button>
      <button className="btn btn-red m-2" onClick={alphabetical}>Sort Alphabetically</button>
      <button className="btn btn-red m-2" onClick={popularity}>Sort by Popularity</button>
    </div>
    <div className="container">
      <table className="table align-middle">
      <thead>
        <tr className="table-dark">
          <th>Picture</th>
          <th>Name <button className="badge bg-secondary" onClick={alphabetical}>Sort</button></th>
          <th>Popularity <button className="badge bg-secondary" onClick={popularity}>Sort</button></th>
          <th>Won Emmy</th>
          <th>Won Oscar</th>
          <th>Delete?</th>
        </tr>
        </thead>
        <tbody>
        {agenda.map((contact,i)=>{
          return (
          <tr key={contact.id} className="table-light">
            <td scope="row"><img width="50px" src={contact.pictureUrl} alt={contact.name} /></td>
            <td><a className="link-dark" href={`https://www.imdb.com/find?q=${contact.name.split(" ")[0]}+${contact.name.split(" ")[1]}`}>{contact.name}</a></td>
            <td>{contact.popularity.toFixed(2)}</td>
            {wonEmmy(contact)}
            {wonOscar(contact)}
            <td><button className="btn btn-danger" onClick={()=>deletePerson(i)}>Delete</button></td>
          </tr>
          )
        })}
        </tbody>
      </table>
    </div>
    </div>
    
  );
}

export default App;
