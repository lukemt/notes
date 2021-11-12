import { TransactionStore } from "./TransactionStore";

type Entry = {
  id: string;
  redo: () => void;
  undo: () => void;
};

export class Transaction<Document extends { _id: string }> {
  private entries: Entry[] = [];
  private store: TransactionStore<Document>;

  constructor(store: TransactionStore<Document>) {
    this.store = store;
  }

  public getOne(id: string) {
    return this.store.getOne(id);
  }

  public addOne(doc: Document) {
    const id = doc._id;
    const redo = () => this.store.addOne(doc, "internal-transaction-entry");
    const undo = () => this.store.deleteOne(id, "internal-transaction-entry");
    this.entries.push({ id, redo, undo });
  }

  public patchOne(
    id: string,
    partialDocument:
      | Partial<Document>
      | ((document: Document) => Partial<Document>)
  ) {
    // TODO: only backup changed fields
    const documentBackup = this.store.getOne(id);
    if (!documentBackup) {
      throw new Error(`Document with id ${id} not found`);
    }
    const redo = () =>
      this.store.patchOne(id, partialDocument, "internal-transaction-entry");
    const undo = () =>
      this.store.patchOne(id, documentBackup, "internal-transaction-entry");
    this.entries.push({ id, redo, undo });
  }
  public deleteOne(id: string) {
    const document = this.store.getOne(id);
    if (!document) {
      throw new Error(`Document with id ${id} not found`);
    }
    const redo = () => this.store.deleteOne(id, "internal-transaction-entry");
    const undo = () =>
      this.store.addOne(document, "internal-transaction-entry");
    this.entries.push({ id, redo, undo });
  }

  public redo() {
    this.entries.forEach((entry) => {
      entry.redo();
    });
  }

  public undo() {
    this.entries.forEach((entry) => {
      entry.undo();
    });
  }
}
