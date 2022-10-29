import pkg from "@google-cloud/functions-framework"
const functions =pkg
import fetch from "node-fetch"

const API ="https://api.telegram.org/bot<replacewithyourtoken>"
const URL = "https://cloudfunctionurl"


const init =()=>{
    fetch(`${API}/setWebhook?url=${URL}`)
    .then(resp =>resp.json())
    .then(data =>{
        console.log("WEBHHOOK SET")
       return console.log(data)
    })
}

const replyMsg =(id, text)=>{
    const body = {
        chat_id: id,
        text
    }
    fetch(`${API}/sendMessage`,{
        method:'post',
        body:JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp =>resp.json())
    .then(data =>{
        console.log("reply sent")
       return console.log(data)
    })
}

functions.http('teleBot', (request, response)=>{
    // set your webhook url
    init()

    const {chat, text}=request.body.message
    // Reply sender with the same text that was sent 
    replyMsg(chat.id, text)
    //Handling upload of audio to telegram and processing it with text to speech API
    // TODO
    
    response.status(200).send("Hello GCP\n")
})
