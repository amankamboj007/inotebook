import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    const host = "http://localhost:5001"

    const [note, setNote] = useState([])

    //get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/notes/fetch-all-notes`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },

            })
        const resp = await response.json()
        setNote(resp)
    }

    //to add notes
    const addNotes = async (title, description, tag) => {
        console.log("NOTE ADDED")
        const response = await fetch(`${host}/notes/add-Notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        let resp = await response.json()
        console.log(resp.error)
        if (!resp.error) {
            setNote(note.concat(resp))
        }
    }

    //to delete notes
    const deleteNotes = async (id) => {
        const response = await fetch(`${host}/notes/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        })
        // console.log(response.json())
        console.log("Note deleted")
        let newNotes = note.filter((i) => i._id !== id)
        setNote(newNotes)
    }
    //to edit notes
    const editNotes = async (id, title, description, tag) => {
        const response = await fetch(`${host}/notes/update-notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })

        console.log("EDIT NOTES", id, title, description, tag)
        let newNotes = [];
        for (let i of note) {
            if (i._id == id) {
                i.title = title
                i.description = description
                i.tag = tag
            }
            newNotes.push(i)
        }
        console.log(newNotes)
        setNote(newNotes)
    }

    return (
        <NoteContext.Provider value={{ note, setNote, addNotes, deleteNotes, editNotes, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;
