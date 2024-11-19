import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Int "mo:base/Int";
import List "mo:base/List";

actor DKeeper {
  public type Note = {
    id: Int;
    title: Text;
    created_at: Text;
    updated_at: Text;
  };

  stable var notes: List.List<Note> = List.nil<Note>();

  public shared func createNote(titleText: Text) : async () {
    Debug.print("Creating new note...");
    Debug.print("Title: " # titleText);
    let now = Time.now();
    let newNote: Note = {
      id = List.size(notes) + 1;
      title = titleText;
      created_at = Int.toText(now);
      updated_at = Int.toText(now);
    };

    notes := List.push(newNote, notes);
    Debug.print("Note added. Current notes:");
    Debug.print(debug_show(notes));
  };

  public query func getNotes(): async [Note] {
    return List.toArray(notes);
  };

  public shared func deleteNote(id: Int): async () {
    notes := List.filter(notes, func(note: Note): Bool {
      note.id != id
    });
  }
}