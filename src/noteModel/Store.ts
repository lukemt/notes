export class Store<Document extends { _id: string }> {
  private documents: Document[];
  constructor(documents: Document[]) {
    this.documents = documents;
  }

  public getAll() {
    return this.documents;
  }
  public getOne(id: string) {
    return this.documents.find((document) => document._id === id) ?? null;
  }
  public addOne(document: Document) {
    this.documents = [...this.documents, document];
  }
  public replaceOne(document: Document) {
    this.documents = this.documents.map((n) =>
      n._id === document._id ? document : n
    );
  }
  public patchOne(
    id: string,
    partialDocument:
      | Partial<Document>
      | ((document: Document) => Partial<Document>)
  ) {
    let newPartialNote = partialDocument;
    if (typeof partialDocument === "function") {
      const gotNote = this.getOne(id);
      if (!gotNote) {
        throw new Error(`Document with id ${id} not found`);
      }
      newPartialNote = partialDocument(gotNote);
    }
    this.documents = this.documents.map((n) =>
      n._id === id ? { ...n, ...newPartialNote } : n
    );
  }
  public deleteOne(id: string) {
    this.documents = this.documents.filter((document) => document._id !== id);
  }
}
