const {
  NODE_ENV,
  allowedCors,
} = require('../env');
const { corsMessage } = require('../constants/messages');

let corsOptions;
if (NODE_ENV === 'production') {
  console.log(corsMessage.production);
  corsOptions = {
    origin: (origin, callback) => {
      if (allowedCors.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(corsMessage.denied));
      }
    },
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
  };
} else {
  // Allow all Corrs for local develop
  console.log(corsMessage.allowed);
  corsOptions = {
    origin: '*',
    methods: '*',
    credentials: true,
  };
}

module.exports = corsOptions;
