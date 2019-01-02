import topics from './topics';
import Kafka from 'no-kafka';

console.log(`consuming on ${topics.CONTACTS}`,topics);

const consumer = new Kafka.SimpleConsumer({
  connectionString: process.env.KAFKA_URL
});

const producer = new Kafka.Producer({
  connectionString: process.env.KAFKA_URL
});

let changes = {};
let counter = 1;

// data handler function can return a Promise
const dataHandler = (messageSet, topic, partition) => {
  messageSet.forEach((m) => {
  	const rawValue = m.message.value.toString('utf8');
  	let value;
  	try {
  		value = JSON.parse(rawValue);
  		changes[value.id] = changes[value.id] !== undefined ? changes[value.id]+1 : 0;
  		value.changes = changes[value.id];
	    console.log('Sending:', value);

	    producer.send({
	        topic: topics.CONTACTS_WITH_STATS,
	        partition: 0, // which partition to target - only 1 in this demo
	        message: {
	          key: value.id,
	          value: JSON.stringify(value)
	        }
	      })
	      .then((result) => {
	        counter++;
	        console.log(result); // array of results
	      });  		
  	} 
  	catch (error){
  		console.error('Error while parsing message', error);
  	}
    console.log(topic, partition, m.offset, value);
  });
};

producer.init()
  .then(() => {
		return consumer.init()
		  .then(() => {
		  	console.log('producer init success!');
		    // Subscribe to partiton 0 in the given topic:
		    return consumer.subscribe(topics.CONTACTS, [0], dataHandler);
		  });  	
  }); 






