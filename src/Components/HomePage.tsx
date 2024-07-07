import { useContext, useEffect, useRef, useState } from "react"
import { logincontext } from "../ContextFiles/LoginContext"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../FirebaseFiles/Firebase";


const HomePage = () => {

  const { room, enterRoomBtn, Logoutbtn } = useContext(logincontext);
  const roomInputRef = useRef<any>();

  const [newMessage, setNewMessage] = useState("");

  const [message, setMessage] = useState<any>([]);

  useEffect(() => {

    if (room) {
      const Query = query(collection(db, "Messages"), where("room", "==", room),
        orderBy("createdAt"));
      var Unsub = onSnapshot(Query, (snap) => {
        let mess: any = [];
        snap.forEach((doc) => {
          mess.push({ ...doc.data(), id: doc.id });
        });
        setMessage(mess);
      });


    }

    return () => {
      if (Unsub)
        Unsub();

    }

  }, [room]);


  const sendMessagebtn = async (e: any) => {

    if (newMessage === null) return

    await addDoc(collection(db, "Messages"), {
      text: newMessage,
      createdAt: serverTimestamp(),
      name: auth.currentUser?.displayName,
      room,
    })
    setNewMessage("");

  }


  return (
    <>
      <div className="home_container">

        {
          room ?
            <div className="chat_room">
              <div className="chat_heading">
                <h3>Chit-ChatApp</h3>
                {
                  <p>Welcome <b>{auth.currentUser?.displayName} </b></p>
                }

              </div>
              <div className="chat_messages">
                {
                  message.map((msg: any) => <p key={msg.id}> <b>{msg.name}:</b> {msg.text}</p>
                  )
                }

              </div>
              <div className="chat_btn">
                <input type="text" placeholder="Message" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />


                <button onClick={sendMessagebtn}>Send</button>
              </div>
            </div>
            :
            <div className="chat-dialogue">
              <h4>Enter ChatRoom</h4>
              <input type="text" ref={roomInputRef} />
              <button onClick={() => enterRoomBtn(roomInputRef.current.value)}>Enter</button>

              <button onClick={Logoutbtn}>Logout</button>

            </div>

        }

      </div>


    </>

  )
}

export default HomePage
