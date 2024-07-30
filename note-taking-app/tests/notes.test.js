import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
  appendDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { appendDB, getDB, saveDB } = await import('../src/db.js');
const { newNote, getAll, removeNote } = await import('../src/notes.js');
// make each test on a stateless data
beforeEach(() => {
  appendDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
})

test('newNote added data and returned it', async () => {
    const note = 'testing';
    const tags = ['tag1', 'tag2'];
    const id = Date.now();
    const data = {
        tags,
        content: note,
        id,
    };
    appendDB.mockResolvedValue(data);
    const actualResult = await newNote(note, tags, id);
    expect(actualResult).toEqual(data)
})
