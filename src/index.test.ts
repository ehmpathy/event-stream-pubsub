import { EventStream } from './index';

describe('EventStreamPubSub', () => {
  interface CustomKeyboardEvent {
    photo: {
      width: number;
      height: number;
      uri: string;
    };
    deselect: () => void;
  }
  const customKeyboardEventStream = new EventStream<CustomKeyboardEvent>();

  const exampleEvent = {
    photo: {
      width: 50,
      height: 50,
      uri: 'some uri',
    },
    deselect: () => {},
  };
  it('should be possible to publish events', () => {
    customKeyboardEventStream.publish(exampleEvent);
  });
  it('should be possible to subscribe and unsubscribe to/from events', () => {
    const consumer = () => {};
    customKeyboardEventStream.subscribe({ consumer });
    customKeyboardEventStream.unsubscribe({ consumer });
  });
  it('should find that subscribers are notified of events when they occur', () => {
    let counter = 0;
    const consumer = () => {
      counter += 1;
    };
    customKeyboardEventStream.subscribe({ consumer });
    customKeyboardEventStream.publish(exampleEvent);
    expect(counter).toEqual(1);
    customKeyboardEventStream.publish(exampleEvent);
    expect(counter).toEqual(2);
    customKeyboardEventStream.publish(exampleEvent);
    customKeyboardEventStream.publish(exampleEvent);
    customKeyboardEventStream.publish(exampleEvent);
    expect(counter).toEqual(5);
  });
  it('should find that subscribers are not notified of events that occured before they subscribed', () => {
    let counter = 0;
    const consumer = () => {
      counter += 1;
    };
    customKeyboardEventStream.publish(exampleEvent);
    customKeyboardEventStream.subscribe({ consumer });
    expect(counter).toEqual(0);
    customKeyboardEventStream.publish(exampleEvent);
    expect(counter).toEqual(1);
  });
  it('should find that subscribers are not notified about events after they unsubscribe', () => {
    let counter = 0;
    const consumer = () => {
      counter += 1;
    };
    customKeyboardEventStream.subscribe({ consumer });
    customKeyboardEventStream.publish(exampleEvent);
    expect(counter).toEqual(1);
    customKeyboardEventStream.unsubscribe({ consumer });
    customKeyboardEventStream.publish(exampleEvent);
    customKeyboardEventStream.publish(exampleEvent);
    customKeyboardEventStream.publish(exampleEvent);
    expect(counter).toEqual(1); // still only 1
  });
  it('should find that subscribers get the event accurately', () => {
    let foundEvent: any;
    const consumer = (event: any) => {
      foundEvent = event;
    };
    customKeyboardEventStream.subscribe({ consumer });
    customKeyboardEventStream.publish(exampleEvent);
    expect(foundEvent).toEqual(exampleEvent);
  });
});
