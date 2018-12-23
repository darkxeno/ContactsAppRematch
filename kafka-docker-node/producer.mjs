import topics from './topics';
import k from 'kafka-streams';
import cuid from 'cuid';
import config from './config.js';

const kafkaStreams = new k.KafkaStreams(config);
const stream = kafkaStreams.getKStream(null);
stream.to('CONTACTWITHSTATS');//topics.CONTACTS);

console.log(`producing on ${topics.CONTACTS}`);


const names = ['Tino', 'Jonatan', 'Jose', 'Miguel', 'Adrian', 'Suso'];

function startSending() {
  // unique messages
  let counter = 1;
  setInterval(() => {
    const randomName = names[ Math.floor(Math.random() * (names.length-1)) ];
    const key = randomName;

    const value = {
      id: key,
      changes: Math.floor(Math.random() * 100)
      /*name: randomName,
      //imgUrl: "https://raw.githubusercontent.com/rexxars/react-hexagon/master/logo/react-hexagon.png",
      email: randomName.toLowerCase() + '@mobgen.com',
      phoneNumber: '+34' + Date.now()           */
    }

    console.log('Sending:', value);

    stream.writeToStream({
        key,
        value: JSON.stringify(value)
      })
  }, 1000);
}

stream.start()
  .then(() => {
    console.log('producer init success!');
    startSending();
  });