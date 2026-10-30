const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main().then((res) => {
    console.log("connection successfully!");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
    {
        from: "neha",
        to: "priya",
        msg: "send me your exam sheets",
        created_at: new Date(),
    },
    {
        from: "priya",
        to: "neha",
        msg: "sure, I'll send them in 5 minutes",
        created_at: new Date(),
    },
    {
        from: "rahul",
        to: "amit",
        msg: "bro, did you complete the assignment?",
        created_at: new Date(),
    },
    {
        from: "amit",
        to: "rahul",
        msg: "not yet, I will finish it tonight",
        created_at: new Date(),
    },
    {
        from: "sana",
        to: "ayesha",
        msg: "are you coming to college tomorrow?",
        created_at: new Date(),
    },
    {
        from: "ayesha",
        to: "sana",
        msg: "yes, let's meet near the library",
        created_at: new Date(),
    },
    {
        from: "rohan",
        to: "vikas",
        msg: "please share today's class notes",
        created_at: new Date(),
    },
    {
        from: "vikas",
        to: "rohan",
        msg: "okay bro, sending them now",
        created_at: new Date(),
    },
    {
        from: "riya",
        to: "simran",
        msg: "have you started preparing for the exams?",
        created_at: new Date(),
    },
    {
        from: "simran",
        to: "riya",
        msg: "yes, let's study together this weekend",
        created_at: new Date(),
    }
];

Chat.insertMany(allChats);



