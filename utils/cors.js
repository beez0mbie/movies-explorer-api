const {
  NODE_ENV,
  allowedCors,
} = require('../env');

let corsOptions;
if (NODE_ENV === 'production') {
  console.log('Production CORS');
  corsOptions = {
    origin: (origin, callback) => {
      if (allowedCors.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
  };
} else {
  // Allow all Corrs for local develop
  console.log('All CORS allowed');
  corsOptions = {
    origin: '*',
    methods: '*',
    credentials: true,
  };
}

module.exports = corsOptions;
