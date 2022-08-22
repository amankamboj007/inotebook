import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNotes } = context
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNotes(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='container'>
                <div className='notes my-3'>
                    <h2> Add a Note</h2>
                </div>
                <form>
                    <div className="mb-3 my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="title" value={note.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote