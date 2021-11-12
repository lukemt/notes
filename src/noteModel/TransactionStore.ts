import { SubscribableStore } from "./SubscribableStore";
import { Transaction } from "./Transaction";

// TODO: Move to a seperate class named TransactionManager
export class TransactionStore<
  Document extends { _id: string }
> extends SubscribableStore<Document> {
  private pastTransactions: Transaction<Document>[] = [];
  private futureTransactions: Transaction<Document>[] = [];

  public runTransaction(
    callback: (transaction: Transaction<Document>) => void
  ) {
    const transaction = new Transaction(this);
    try {
      callback(transaction);
      transaction.redo();
      this.pastTransactions.push(transaction);
      this.futureTransactions = [];
      this.emitEvent({
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
      this.emitEvent({
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
      this.emitEvent({
        type: "transaction",
        transaction,
      });
    }
  }
}
