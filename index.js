const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodoverride = require("method-override");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodoverride("_method"));


main().then((res ) =>{
    console.log("connection successfully!");
}).catch((err) =>{
    console.log(err); 
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//Index Route
app.get("/chats" ,async (req,res) =>{
  let chats = await Chat.find();
  console.log(chats);
  res.render("index.ejs",{chats});
});

app.get("/", (req,res) =>{
  res.send("server is working!");
} );

//Create route
app.post("/chats" , (req,res) =>{
  let {from, to, msg} = req.body;
  let newChat = new Chat({
    from : from,
    to : to,
    msg: msg,
    created_at: new Date()
  });
  newChat.save()
  .then((req,res) =>{
    console.log("chat was saved!");
  }).catch((err) =>{
    consoel.log(err);
  });
  res.redirect("/chats");
});


//Edit route
app.get("/chats/:id/edit",async (req,res) =>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", {chat});
});

//update route
app.put("/chats/:id" ,async (req,res) =>{
  let {id} =req.params;
  let { msg : newMsg } = req.body;
  let updatedChat =await Chat.findByIdAndUpdate(
    id ,
    {
      msg: newMsg,
      updated_at:new Date()
    },
    {
      runValidators: true,
       new: true
    }
  );
  
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req,res) =>{
  let {id} =  req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});


// new route
app.get("/chats/new" ,(req,res) =>{
  res.render("new.ejs");
})


app.listen(3000,()=>{
    console.log("app is listning on port 3000");
});
