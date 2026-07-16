import React from 'react'
import { Routes, Route } from 'react-router'
import { Home, NoteDetails, CreateNote } from './pages/index'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/notes/:id" element={<NoteDetails />} />
      </Routes>
    </div>
  )
}

export default App