## Installation
## ການຕິດຕັ້ງ ແລະ ນຳໃຊ້ໂປຼເຈັທ
ຕິດຕັ້ງ Firebase
install firebase code:
```bash
npm i firebase
```
ຕິດຕັ້ງ Sweetalert2
install Sweetalert2 code:
```bash
$ npm i sweetalert2
```
ຕິດຕັ້ງ react-router-dom
install react-router-dom code:
```bash
$ npm i react-router-dom
```

## ເຂົ້າສູ່ລະບົບ firebase ແລະ ເຂົ້າໄປ Firebase console
ນຳເອົາ config ມາວ່າງແທນ firebaseConfig
```javascript
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Pass the app instance to getAuth
export { auth };
```
