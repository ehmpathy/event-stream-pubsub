# event-stream-pubsub

This library is a simple wrapper around the EventEmitter class that lets us more formally think about using it in a pub/sub fashion, specifically intended for in-memory, stateless event streaming.


## installation

```
npm install --save event-stream-pubsub
```

## usage

```ts
// 1. define your event data-type
interface PhotoSelectedEvent {
  source: string;
  photo: {
    width: number;
    height: number;
    uri: string;
  };
}

// 2. instantiate this particular stream
const photoSelectedEventStream = new EventStreamPubSub<PhotoSelectedEvent>();

// 3. add a subscriber
const consumer = ({ event }: { event: PhotoSelectedEvent }) => console.log(event);
photoSelectedEventStream.subscribe({ consumer });

// 4. publish to the stream
const exampleEvent = {
  source: 'CAMERA_ROLL',
  photo: {
    width: 1000,
    height: 1000,
    uri: 'file://...',
  },
};
photoSelectedEventStream.publish({ event: exampleEvent });

// NOTE: on .publish, the `consumer` we defined above would have triggered resulting in `console.log(exampleEvent)`
```
