import React, { useState, useEffect } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";
import { ID, Query } from "appwrite";

const Room = () => {
  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
    setMessages(response.documents);
  };

  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    // getMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
      user_id: "",
      username: "",
    };

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );

    setMessageBody("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            required
            maxLength="1000"
            placeholder="Say Something..."
            onChange={(e) => setMessageBody(e.target.value)}
            value={messageBody}
            cols="30"
            rows="10"
          ></textarea>
          <input type="submit" value="Send" />
        </div>
      </form>
      {messages.map((messages) => (
        <div key={messages.$id}>
          <div>
            <p>{messages.$createdAt}</p>
          </div>
          <div>
            <span>{messages.body}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Room;
