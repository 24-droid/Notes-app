import React, { createContext, useState, useContext, useEffect } from 'react';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('notes');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const addNote = (note) => {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes, note];
      if (typeof window !== 'undefined') {
        localStorage.setItem('notes', JSON.stringify(newNotes));
      }
      return newNotes;
    });
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);