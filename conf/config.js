'use strict';

const DEV = {
  firebase: {
    apiKey: "AIzaSyBRxenGVkmqOeD3ydkJdh-raEkU-kMnQdU",
    authDomain: "blankys-3561c.firebaseapp.com",
    databaseURL: "https://blankys-3561c.firebaseio.com",
    storageBucket: "blankys-3561c.appspot.com",
    messagingSenderId: "318268114708"
  }
};

const QA = {
  firebase: {
    apiKey: "AIzaSyBRxenGVkmqOeD3ydkJdh-raEkU-kMnQdU",
    authDomain: "blankys-3561c.firebaseapp.com",
    databaseURL: "https://blankys-3561c.firebaseio.com",
    storageBucket: "blankys-3561c.appspot.com",
    messagingSenderId: "318268114708"
  }
};

const PROD = {
  firebase: {
    apiKey: "AIzaSyBRxenGVkmqOeD3ydkJdh-raEkU-kMnQdU",
    authDomain: "blankys-3561c.firebaseapp.com",
    databaseURL: "https://blankys-3561c.firebaseio.com",
    storageBucket: "blankys-3561c.appspot.com",
    messagingSenderId: "318268114708"
  }
};

let config;
if (ENV === 'prod') {
  config = PROD;
} else if (ENV === 'qa') {
  config = QA;
} else {
  config = DEV;
}

export default config;