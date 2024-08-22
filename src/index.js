import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { composeWithDevTools} from 'redux-devtools-extension'

const firebaseConfig = {
  apiKey: "AIzaSyC0nsbeWDXNFZbJTShOanYyWCKXY-N_104",
  authDomain: "resume-builder-38c34.firebaseapp.com",
  projectId: "resume-builder-38c34",
  storageBucket: "resume-builder-38c34.appspot.com",
  messagingSenderId: "483378718649",
  appId: "1:483378718649:web:d1196610dec0572c707868",
  measurementId: "G-Z1NCXQ8RCR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()

// thunk me kbi b function return krnge to args me humesha firebase,firestore k instances ajaenge
const reduxStore = createStore(rootReducer,
  composeWithDevTools(
    
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
   
    reduxFirestore(firebase) 
  )
);


ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      {/* firebase,firestore k instances redux store me ajae */}
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={reduxStore.dispatch}
      createFirestoreInstance={createFirestoreInstance}
      >
      <App />
    </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);