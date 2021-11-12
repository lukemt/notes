import { SubscribableStore } from "./SubscribableStore";
import { Transaction } from "./Transaction";

export class TransactionManager<Document extends { _id: string }> {
  private store: SubscribableStore<Document>;
  private pastTransactions: Transaction<Document>[] = [];
  private futureTransactions: Transaction<Document>[] = [];

  public constructor(store: SubscribableStore<Document>) {
    this.store = store;
  }

  public runTransaction(
    callback: (transaction: Transaction<Document>) => void
  ) {
    const transaction = new Transaction(this.store);
    try {
      callback(transaction);
      transaction.redo();
      this.pastTransactions.push(transaction);
      this.futureTransactions = [];
      this.store.emitEvent({
        type: "transaction",
        transaction,
      });
    } catch (error) {
      // TODO: proper error handling
      console.error(error);
    }
  }

  public redo() {
    const transaction = this.futureTransactions.pop();
    if (transaction) {
      this.pastTransactions.push(transaction);
      transaction.redo();
      this.store.emitEvent({
        type: "transaction",
        transaction,
      });
    }
  }

  public undo() {
    const transaction = this.pastTransactions.pop();
    if (transaction) {
      this.futureTransactions.push(transaction);
      transaction.undo();
      this.store.emitEvent({
        type: "transaction",
        transaction,
      });
    }
  }
}
