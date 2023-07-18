# event-stream-pubsub

A simple wrapper around the EventEmitter, allowing us to speak in a pub/sub terms.

Supports in-memory, stateless event streaming out of the box.

## installation

```
npm install --save event-stream-pubsub
```

## usage

```ts
// define your event data-type
interface PhotoSelectedEvent {
  source: string;
  photo: {
    width: number;
    height: number;
    uri: string;
  };
}

// instantiate this particular stream
const photoSelectedEventStream = new EventStreamPubSub<PhotoSelectedEvent>();

// add a subscriber
const consumer = (event: PhotoSelectedEvent) => console.log(event);
photoSelectedEventStream.subscribe({ consumer });

// publish to the stream
const exampleEvent = {
  source: 'CAMERA_ROLL',
  photo: {
    width: 1000,
    height: 1000,
    uri: 'file://...',
  },
};
photoSelectedEventStream.publish(exampleEvent);
```
