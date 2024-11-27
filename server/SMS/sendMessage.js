import mongoose from "mongoose";
import User from "../modals/user.modal.js";
import schedule from 'node-schedule';
import twilio from 'twilio';




const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

async function sendMessage(phone, message) {
    try {
        console.log(phone);
        
        await client.messages.create({
            body: message,
            from: "+12299494835", // Your Twilio number
            to: `+91${phone}`
        });
        console.log(`Message sent to ${phone}`);
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

async function scheduleMessages() {
    const users = await User.find();
  
   
    
    users.forEach(user => {
        // Schedule for breakfast
       
        
        schedule.scheduleJob({ hour: 7}, () => {
            sendMessage(user.number, `Good morning ${user.name}! It's time for breakfast.`);
        });

        // Schedule for lunch
        schedule.scheduleJob({ hour: 1 }, () => {
            sendMessage(user.number, `Hi ${user.name}! It's time for lunch.`);
        });

        // Schedule for snacks
        schedule.scheduleJob({ hour: 4 }, () => {
            sendMessage(user.number, `Hello ${user.name}! Time for some snacks.`);
        });

        // Schedule for dinner
        schedule.scheduleJob({ hour: 8 }, () => {
            sendMessage(user.number, `Good evening ${user.name}! Dinner is ready.`);
        });
    });
}

// Call the scheduling function
export default scheduleMessages;