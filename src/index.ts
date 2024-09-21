import { EventEmitter } from 'eventemitter3';

export type EventStreamConsumer<T> = (event: T) => void;
export class EventStream<T> {
  private emitter: EventEmitter;
  constructor() {
    this.emitter = new EventEmitter();
  }
  public publish = (event: T) => {
    this.emitter.emit('event', event);
  };
  public subscribe = ({ consumer }: { consumer: EventStreamConsumer<T> }) => {
    // subscribe consumer to topic
    this.emitter.on('event', consumer);
  };
  public unsubscribe = ({ consumer }: { consumer: EventStreamConsumer<T> }) => {
    // unsubscribe consumer from topic
    this.emitter.removeListener('event', consumer);
  };
}
