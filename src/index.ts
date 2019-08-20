import { EventEmitter } from 'events';

export type EventStreamPubSubConsumer<T> = (args: { event: T }) => void;
export class EventStreamPubSub<T> {
  private emitter: EventEmitter;
  constructor() {
    this.emitter = new EventEmitter();
  }
  public publish = ({ event }: { event: T }) => {
    this.emitter.emit('event', { event });
  }
  public subscribe = ({ consumer }: { consumer: EventStreamPubSubConsumer<T> }) => {  // subscribe consumer to topic
    this.emitter.on('event', consumer);
  }
  public unsubscribe = ({ consumer }: { consumer: EventStreamPubSubConsumer<T> }) => { // unsubscribe consumer from topic
    this.emitter.removeListener('event', consumer);
  }
}
