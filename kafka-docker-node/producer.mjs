import topics from './topics';
import Kafka from 'no-kafka';
import cuid from 'cuid';
import crypto from 'crypto';

const secret = 'abcdefg';

console.log(`producing on ${topics.CONTACTS}`);


const names = ['Tino', 'Jonatan', 'Jose', 'Miguel', 'Adrian', 'Suso'];

function startSending(p) {
  // unique messages
  let counter = 1;
  setInterval(() => {
    const randomName = names[ Math.floor(Math.random() * (names.length-1)) ];
    //const key = cuid();
    /*const key = crypto.createHmac('sha256', secret)
                   .update(randomName)
                   .digest('hex');*/

    const key = randomName.toLowerCase();                   

    const value = {
      id: key,
      name: randomName,
      //imgUrl: "https://raw.githubusercontent.com/rexxars/react-hexagon/master/logo/react-hexagon.png",
      email: randomName.toLowerCase() + '@mobgen.com',
      phoneNumber: '+34' + Date.now()           
    }

    console.log('Sending:', value);

    p.send({
        topic: topics.CONTACTS,
        partition: 0, // which partition to target - only 1 in this demo
        message: {
          key,
          value: JSON.stringify(value)
        }
      })
      .then((result) => {
        counter++;
        console.log(result); // array of results
      });
  }, 1000);
}

const producer = new Kafka.Producer({
  connectionString: process.env.KAFKA_URL
});

producer.init()
  .then(() => {
    console.log('producer init success!');
    startSending(producer);
  });