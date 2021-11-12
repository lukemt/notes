import { Store } from "./Store";
import { Transaction } from "./Transaction";

type SingularDocumentEventType =
  | "external-update"
  | "ui-state"
  | "internal-transaction-entry";
type EventData =
  | {
      type: "transaction";
      transaction: Transaction<any>;
    }
  | {
      type: SingularDocumentEventType;
      id: string;
    };
type EventType = EventData["type"];

export class SubscribableStore<
  Document extends { _id: string }
> extends Store<Document> {
  private eventListeners: ((eventData: EventData) => void)[] = [];

  addEventListener(
    eventType: EventType,
    callback: (eventData: EventData) => void
  ) {
    console.log("addEventListener", eventType);
    const conditialCallback = (eventData: EventData) => {
      if (eventData.type === eventType) {
        callback(eventData);
      }
    };
    this.eventListeners.push(conditialCallback);

    return () => {
      console.log("removeEventListener", conditialCallback);
      const filteredListeners = this.eventListeners.filter(
        (eL) => eL !== conditialCallback
      );
      if (filteredListeners.length !== this.eventListeners.length - 1) {
        console.error("removeEventListener failed", {
          conditialCallback,
          filteredListeners,
          eventListeners: this.eventListeners,
        });
      }
      this.eventListeners = filteredListeners;
    };
  }

  public emitEvent(eventData: EventData) {
    console.log("emitEvent", eventData);
    this.eventListeners.forEach((listener) => {
      listener(eventData);
    });
  }

  public addOne(
    note: Document,
    eventType: SingularDocumentEventType = "external-update"
  ) {
    super.addOne(note);
    this.emitEvent({
      type: eventType,
      id: note._id,
    });
  }

  public replaceOne(
    note: Document,
    eventType: SingularDocumentEventType = "external-update"
  ) {
    super.replaceOne(note);
    this.emitEvent({
      type: eventType,
      id: note._id,
    });
  }

  public patchOne(
    id: string,
    partialDocument:
      | Partial<Document>
      | ((document: Document) => Partial<Document>),
    eventType: SingularDocumentEventType = "external-update"
  ) {
    super.patchOne(id, partialDocument);
    this.emitEvent({
      type: eventType,
      id,
    });
  }

  public deleteOne(
    id: string,
    eventType: SingularDocumentEventType = "external-update"
  ) {
    super.deleteOne(id);
    this.emitEvent({
      type: eventType,
      id,
    });
  }
}
