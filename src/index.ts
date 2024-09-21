import { EventEmitter } from 'eventemitter3';

export type EventStreamConsumer<T> = (event: T) => void;
export class EventStream<T> {
  private emitter: EventEmitter;
  constructor() {
    this.emitter = new EventEmitter();
  }
  public publish = (event: T): void => {
    this.emitter.emit('event', event);
  };
  public subscribe = ({
    consumer,
  }: {
    consumer: EventStreamConsumer<T>;
  }): void => {
    // subscribe consumer to topic
    this.emitter.on('event', consumer);
  };
  public unsubscribe = ({
    consumer,
  }: {
    consumer: EventStreamConsumer<T>;
  }): void => {
    // unsubscribe consumer from topic
    this.emitter.removeListener('event', consumer);
  };
}
