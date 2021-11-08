export class Store<Document extends { _id: string }> {
  private documents: Document[];
  private subscriptions: {
    noteId: string | null;
    callback: (document: Document | null) => void;
  }[] = [];

  constructor(documents: Document[]) {
    this.documents = documents;
  }

  subscribeOne(
    noteId: string | null,
    callback: (document: Document | null) => void
  ) {
    console.log("subscribe", noteId);
    const subscription = { noteId, callback };
    this.subscriptions.push(subscription);
    return () => {
      console.log("unsubscribe", noteId);
      const filteredSubscriptions = this.subscriptions.filter(
        (s) => s !== subscription
      );
      if (filteredSubscriptions.length !== this.subscriptions.length - 1) {
        console.error("unsubscribe failed", { noteId, filteredSubscriptions });
      }
      this.subscriptions = filteredSubscriptions;
    };
  }

  private notifySubscribers(id: string) {
    const document = this.getOne(id);
    this.subscriptions.forEach((subscription) => {
      if (subscription.noteId === id) {
        subscription.callback(document);
      }
    });
    this.subscriptions.forEach((subscription) => {
      if (subscription.noteId === null) {
        subscription.callback(document);
      }
    });
  }

  getAll() {
    return this.documents;
  }
  getOne(id: string) {
    return this.documents.find((document) => document._id === id) ?? null;
  }
  addOne(document: Document) {
    this.documents = [...this.documents, document];
    this.notifySubscribers(document._id);
  }
  replaceOne(id: string, document: Document) {
    this.documents = this.documents.map((n) => (n._id === id ? document : n));
    this.notifySubscribers(id);
  }
  patchOne(
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
    this.notifySubscribers(id);
  }
  deleteOne(id: string) {
    this.documents = this.documents.filter((document) => document._id !== id);
    this.notifySubscribers(id);
  }

  // runTransaction(callback: (transaction: Transaction) => void) {
  //   const transaction = new Transaction(this);
  //   callback(transaction);
  //   transaction.commit();
  // }
}
