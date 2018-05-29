import topics from './topics';
import Kafka from 'no-kafka';

console.log(`consuming on ${topics.CONTACTS}`,topics);

const consumer = new Kafka.SimpleConsumer({
  connectionString: process.env.KAFKA_URL
});

// data handler function can return a Promise
const dataHandler = (messageSet, topic, partition) => {
  messageSet.forEach((m) => {
  	const rawValue = m.message.value.toString('utf8');
  	let value;
  	try {
  		value = JSON.parse(rawValue);
  	} 
  	catch (error){
  		console.error('Error while parsing message', error);
  	}
    console.log(topic, partition, m.offset, value);
  });
};

consumer.init()
  .then(() => {
    // Subscribe to partiton 0 in the given topic:
    return consumer.subscribe(topics.CONTACTS, [0], dataHandler);
  });