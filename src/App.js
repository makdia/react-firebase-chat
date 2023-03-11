import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

firebase.initializeApp({
  // your config
  apiKey: "AIzaSyAr2aPqEs0k290KCg1Zoo0rKrV2KBmKWgM",
  authDomain: "live-chat-6cece.firebaseapp.com",
  projectId: "live-chat-6cece",
  storageBucket: "live-chat-6cece.appspot.com",
  messagingSenderId: "955816003085",
  appId: "1:955816003085:web:9a6559f9962b7abc7cb744",
  databaseURL: "https://live-chat-6cece-default-rtdb.firebaseio.com"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1><img src="./logo.png" alt="ChitChat" /></h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn /> }
      </section>
    </div>
  );
}

function SignIn() {
  const [data, setData] = useState({
     name: '',
     email: '',
     password: ''
  });

  const [option, setOption] = useState("SignIn");

  const handleChange = (event) => {
     const { name, value } = event.target;
     setData({ ...data, [name]: value });
     console.log(value);
  };

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  const register = (data) => {
    if (!data.name) alert("Please enter name");
    registerWithEmailAndPassword(data.name, data.email, data.password);
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await firestore.collection("users").add({
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <>
    { option==="SignIn" ?
    <div id="loginform">
      <div>
        <div className="row">
          <label>Username</label>
          <input name="email" placeholder="Enter your username" type="text" value={data.email} onChange={handleChange}/>
        </div>
        <div className="row">
          <label>Password</label>
          <input name="password" placeholder="Enter your password" type="password" value={data.password} onChange={handleChange}/>
        </div>
        <div id="button" className="row">
          <button onClick={() => signInWithEmailAndPassword(data.email, data.password)}>Log in</button>
        </div>
        <label>Don't have an account? <a href="#" onClick={() => setOption("SignUp")}>Sign Up</a></label>
      </div>
      <div id="alternativeLogin">
        <label>Or sign in with:</label>
          <div id="iconGroup">
            {/*<a href="#" id="facebookIcon"></a>
            <a href="#" id="twitterIcon"></a>*/}
            <a href="#" id="googleIcon" onClick={signInWithGoogle}></a>
          </div>
        </div>
      </div>
    :
    <div id="registrationform">
      <div>
        <div className="row">
          <label>Name</label>
          <input name="name" placeholder="Enter your name" type="text" value={data.name} onChange={handleChange}/>
        </div>
        <div className="row">
          <label>Email</label>
          <input name="email" placeholder="Enter your email" type="text" value={data.email} onChange={handleChange}/>
        </div>
        <div className="row">
          <label>Password</label>
          <input name="password" placeholder="Enter your password" type="password" value={data.password} onChange={handleChange}/>
        </div>
        <div id="button" className="row">
          <button onClick={() => register(data)}>Sign Up</button>
        </div>
        <label>Don't have an account? <a href="#" onClick={() => setOption("SignIn")}>Sign In</a></label>
      </div>
      <div id="alternativeLogin">
        <label>Or sign in with:</label>
          <div id="iconGroup">
            {/*<a href="#" id="facebookIcon"></a>
            <a href="#" id="twitterIcon"></a>*/}
            <a href="#" id="googleIcon" onClick={signInWithGoogle}></a>
          </div>
        </div>
      </div>
    }
    </>
  )

}

function SignUp() {
  const [data, setData] = useState({
     name: '',
     email: '',
     password: ''
  });

  const setOption = () => {
    
  };

  const handleChange = (event) => {
     const { name, value } = event.target;
     setData({ ...data, [name]: value });
     console.log(value);
  };

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const register = (data) => {
    if (!data.name) alert("Please enter name");
    registerWithEmailAndPassword(data.name, data.email, data.password);
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await firestore.collection("users").add({
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
    <div id="registrationform">
      <div>
        <div className="row">
          <label>Name</label>
          <input name="name" placeholder="Enter your name" type="text" value={data.name} onChange={handleChange}/>
        </div>
        <div className="row">
          <label>Email</label>
          <input name="email" placeholder="Enter your email" type="text" value={data.email} onChange={handleChange}/>
        </div>
        <div className="row">
          <label>Password</label>
          <input name="password" placeholder="Enter your password" type="password" value={data.password} onChange={handleChange}/>
        </div>
        <div id="button" className="row">
          <button onClick={() => register(data)}>Sign Up</button>
        </div>
        <label>Don't have an account? <button onClick={() => setOption()}>Sign In</button></label>
      </div>
      <div id="alternativeLogin">
        <label>Or sign in with:</label>
          <div id="iconGroup">
            <a href="#" id="facebookIcon"></a>
            <a href="#" id="twitterIcon"></a>
            <a href="#" id="googleIcon" onClick={signInWithGoogle}></a>
          </div>
        </div>
      </div>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}><img src="./logout.png" alt="Sign Out" /></button>
  )
}

function ChatRoom() {
  const dummy = useRef();
  const [output, setOutput] = useState('list');
  const [threadId, setThreadId] = useState('0G3V81bIkaExyvQPHpVI');
  //console.log(threadId);
  const messagesRef = firestore.collection("messageTreads").doc(threadId).collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const messageThreadsRef = firestore.collection("messageTreads");
  const query2 = messageThreadsRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  //console.log(messages);
  const [formValue, setFormValue] = useState('');


  //const { uid } = auth.currentUser;
  //const [threadList, setThreadList] = useState([])
  //const threadList = firestore.collection("messageTreads").where('creatorsId', "==", uid ).onSnapshot();
 // console.log(threadList);
  /*firestore.collection("messageTreads").where("creatorsId", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            threadList.push(doc.data());
            console.log(doc.id, " => ", doc.data());
        });
        setThreadList(threadList)
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });*/


  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    {/*await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      threadId: '0G3V81bIkaExyvQPHpVI'
    })*/}
    firestore.collection('messageTreads').doc(threadId).collection('messages')
      .add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user: {
          _id: uid,
          photoURL: photoURL
        }
      })
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  const messageThread = async (e) => {
    /*{await messageThreadsRef.add({
      name: 'One',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })}*/
    setThreadId(e.id);
    const { uid } = auth.currentUser;
    await messageThreadsRef.doc(e.id)
      .set({
        id: e.id,
        name: e.name,
        email: e.email,
        creatorsId: uid,
        userIds: [uid, e.id]
      })
      .then(() => {
        console.log('User added!');
      });
    setOutput('message');
    setThreadId(e.id);
  }

  const openMessageThread = async (e) => {
    setOutput('message');
    setThreadId(e);
  }

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Get reference to all of the documents
  const [myId, setMyId] = useState()
  const [myOptions, setMyOptions] = useState([])
  const getDataFromAPI = () => {
  setMyOptions(myOptions)
  console.log("Retrieving list of documents in collection");
  const collectionRef = firestore.collection("users");
  const documents = collectionRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
       console.log("Parent Document ID: ", doc.data());
       myOptions.push({ id: doc.data().uid, name: doc.data().name, email: doc.data().email })
      });
      setMyOptions(myOptions)
    }).catch(err => {
      console.log("Error getting documents", err);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const [threads, setThreads] = useState([])
  useEffect(() => {
    firestore.collection('messageTreads').where("userIds", "array-contains-any", [auth.currentUser.uid])
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            email: '',
            creatorsId: '',
            ...documentSnapshot.data()
          }
        })
        setThreads(threads)
      })
    if(output === 'message') {
      scrollToBottom()
    }
  }, [messages]);

  return (<>
    { output === 'list' ?
      <div id="plist" className="people-list">
            <div className="input-group">
              <div style={{ textAlign: 'center', marginTop: '120px' }}>
                <h3>Start Chatting</h3>
                <form className='search-form' onSubmit={handleSubmit} >
                  <Autocomplete
                    style={{ width: 500 }}
                    freeSolo
                    autoComplete
                    autoHighlight
                    options={myOptions}
                    getOptionLabel={option => option.name}
                    renderInput={(params) => (
                      <TextField {...params}
                        onChange = {getDataFromAPI}
                        variant="outlined"
                        label="Search Here"
                      />
                    )}
                    onChange={(event, newValue) => {
                      setMyId(newValue);
                    }}
                  />
                  <Button
                        type="submit"
                        className='button search-submit'
                        onClick={() => messageThread(myId)}>
                        Submit
                    </Button>
                </form>
              </div>
            </div>
            <ul className="list-unstyled chat-list mt-2 mb-0">
              {
                threads.map((thread, threadIndex) => {
                  return (
                    <li key={threadIndex} className="clearfix" onClick={() => openMessageThread(thread.id)}>
                      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                      <div className="about">
                        <div className="name">{thread.name}</div>
                        <div className="status"> <i className="fa fa-circle offline"></i></div>                                            
                      </div>
                    </li>
                  )
                })
              }
              {/*<li className="clearfix active" onClick={() => messageThread('fDcfJJclZVKnDr6fc8Sx')}>
                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                        <div className="about">
                            <div className="name">Aiden Chavez</div>
                            <div className="status"> <i className="fa fa-circle online"></i></div>
                        </div>
              </li>
              <li className="clearfix" onClick={() => messageThread('le5wePBVj2dhf4XJpRDg')}>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar"/>
                        <div className="about">
                            <div className="name">Mike Thomas</div>
                            <div className="status"> <i className="fa fa-circle online"></i></div>
                        </div>
              </li>                                    
              <li className="clearfix" onClick={() => messageThread('0G3V81bIkaExyvQPHpVI')}>
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"/>
                        <div className="about">
                            <div className="name">Christian Kelly</div>
                            <div className="status"> <i className="fa fa-circle offline"></i></div>
                        </div>
              </li>
              <li className="clearfix">
                        <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="avatar"/>
                        <div className="about">
                            <div className="name">Monica Ward</div>
                            <div className="status"> <i className="fa fa-circle online"></i></div>
                        </div>
              </li>
              <li className="clearfix">
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar"/>
                        <div className="about">
                            <div className="name">Dean Henry</div>
                            <div className="status"> <i className="fa fa-circle offline"></i></div>
                        </div>
              </li>*/}
            </ul>
      </div>
    :
      <>
        <main>

          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>

        </main>

        <form className="messaging-form" onSubmit={sendMessage}>

          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type your message here" />

          <button type="submit" disabled={!formValue}><img src="./send.png" alt="Send" /></button>

        </form>
      </>
    }
  </>)
}

function ChatMessage(props) {
  const { text, user } = props.message;
  const uid = user['_id'];
  const photoURL='';
  const messageclassName = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageclassName}`}>
      <img src={photoURL || './user.png'} />
      <p>{text}</p>
    </div>
  </>)
}

export default App;
