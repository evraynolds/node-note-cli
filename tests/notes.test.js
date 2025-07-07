import { jest } from "@jest/globals";

// mock all exported functions
jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../node-note-cli/src/db.js");
const { newNote, getAllNotes, removeNote } = await import(
  "../node-note-cli/src/notes.js"
);

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("newNote insserts data and returns it", async () => {
  const note = {
    content: "this is my note",
    id: 1,
    tags: ["hello"],
  };
  insertDB.mockResolvedValue(note);

  const result = await newNote(note.content, note.tags);
  expect(result.content).toEqual(note.content);
});
