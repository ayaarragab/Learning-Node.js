import {getDB, saveDB, appendDB} from './db.js';

export const newNote = async (note, tags = []) => {
    const newNote = {
        content: note,
        id: Date.now(),
        tags,
    }
    await appendDB(newNote);
    return newNote;
}

export const getAll = async () => {
    const {notes} = await getDB(); // we used destructuring syntax, as we only want notes property not whole propertities of the json object
    return notes;
}

// side note: another way to use destructuring in functions

const func = (arrayOfconfig) => {}

// You can replace arrayOfconfig by the following syntax
const func2 = ({settnig1, setting2, brightness, ...rest}) => {}

/**
 * The above syntax is using destructuring, when we pass arrayOfconfig, it 
   extracts these propertites/elements from the object in order:
   {settnig1, setting2, brightness, ...rest}
   rest is the rest of properities, are all extracted and stored in rest argument
 */


export const findNotes = async (filter) => {
    const notes = await getAll();
    return notes.filter(note => note.content.toUpperCase().includes(filter.toUpperCase()));
}

export const removeNote = async id => {
    const notes = await getAll();
    const match = notes.find(note => note.id === id); // === not ==
    if (match) {
        const newNotes = notes.filter(note => note.id !== id);
        await saveDB({notes: newNotes}); // as newNotes is an array
        return id;
    }
}

const removeAllNotes = () => saveDB({notes:[]}) // I don't have code after it so we can let it blocking as it won't matter
