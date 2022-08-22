import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote'
import Noteitem from './Noteitem'

export const Notes = () => {
    const [notes, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        editNotes(notes.id, notes.etitle, notes.edescription, notes.etag)
        refClose.current.click()

    }
    const onChange = (e) => {

        setnote({ ...notes, [e.target.name]: e.target.value })
    }
    const context = useContext(noteContext)
    const { note, getNotes, editNotes } = context
    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        console.log(currentNote)
        ref.current.click()
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }
    useEffect(() => {
        getNotes()
        // eslint-disable-next-lin
    }, [])

    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">EDIT NOTE</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 my-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="etitle" value={notes.etitle} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name='edescription' value={notes.edescription} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name='etag' value={notes.etag} onChange={onChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container my-2'>
                    <h2> Your Notes</h2>
                    <div className='container mx-2'>
                        {note.length === 0 && 'No notes to display'}
                <div className=' row my-3 mx-3'>
                        {
                            note.map((i) => {
                                return <Noteitem key={i._id} updateNote={updateNote} note={i} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
