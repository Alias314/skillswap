import React, { useRef } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";
import '../App.css'

function home() {
    const messageRef = useRef();
    const ref = collection(firestore, "messages");

    const handleSave = async(e) => {
        e.preventDefault();
        console.log(messageRef.current.value);

        let data = {
            message: messageRef.current.value
        }

        try {
            addDoc(ref, data);
        } 
        catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut dignissimos laudantium voluptate eaque mollitia officia saepe officiis porro illo dolorum sapiente, ab voluptatem aspernatur debitis aliquid quae ducimus error soluta.</p>
            
            <br></br>
            <h3>testing firebase</h3>
            <div>
                <form onSubmit={handleSave}>
                    <label>Enter Message</label>
                    <input type="text" ref={messageRef} />
                    <button type="submit">Save</button> 
                </form>
            </div>
        </div>
    )
}

export default home;