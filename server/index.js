require("dotenv").config()

  const User = require("./models/user.model");
  const Note = require("./models/note.model");
const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString)

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const jwt = require('jsonwebtoken');
const {   authenticationToken } = require('./utilities');

app.use(express.json());
 
app.use(
    cors()
);

app.get('/', (req, res) => {
    res.json({data: "Hello World!"})
});


//backend done
// create account

app.post('/create-account', async (req, res) => {
      
    const {name, email, password} = req.body;

    if(!name){
        return res.status(400).json({error: true ,message: "name is required"});
    }

if(!email){
    return res.status(400).json({error: true, message: "email is required"});
}

if(!password){
    return res.status(400).json({error: true, message: "password is required"});
}

const isUser = await User.findOne({ email: email});

if(isUser){
    return res.status(400).json({error: true, message: "user already exists"});
}

const user = new User({ name, email, password });
await user.save();

const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "360000m"
});;

return res.json({
    error: false,
    user,
    accessToken,
    message: "User created successfully"
}); 
});

//login

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email){
        return res.status(400).json({error: true, message: "email is required"});
    }

    if(!password){
        return res.status(400).json({error: true, message: "password is required"});
    }

    const userInfo = await User.findOne({email:email});

    if(!userInfo){
        return res.status(401).json({error: true, message: "Invalid credentials"});
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "360000m",
        });

        return res.json({
            error: false,
           email,
            accessToken,
            message: "Logged in successfully"
        });


    }else{
        return res.status(401).json({error: true, message: "Invalid credentials"});
     }
})


//Get User


app.get('/get-user', authenticationToken, async (req, res) => {
const {user} = req.user;

const isUser = await User.findOne({_id: user._id});

if(!isUser){
    return res.sendStatus(401);

}

return res.json({
    user: {name:isUser.name, email: isUser.email, "id": isUser._id, createdOn: isUser.createdOn},
    message:"",

});
});

//add notes

app.post('/add-note', authenticationToken, async (req, res) => {
    const {title, content, tags} = req.body;
    const {user} = req.user;

    if (!title){
        return res.status(400).json({error:true, message:"Title is required"});
    }

    if (!content){
        return res.status(400).json({error:true, message:"Content is required"});
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId : user._id
        });
        
        await note.save();

        return res.json({
            error:false,
            note,
            message: "Note added succesfully"
        });
    } catch (error) {
        return res.status(500).json({
            error:true,
            message:"internal server error"
        })
    }  
}); 

//edit note
app.put('/edit-note/:noteId', authenticationToken, async (req, res) =>{
  const noteId = req.params.noteId;
  const {title, content, tags, isPinned} = req.body;
  const {user} = req.user;

  if(!title && !content && !tags){
    return res.status(400).json({error: true, message: "No changes provided"});
  }

  try{
    const note = await Note.findOne({_id: noteId, userId: user._id});

if(!note) {
    return res.status(404).json({error: true, message: "Note not found"});
  
}

if(title) note.title = title;

if(content) note.content = content;

if(tags) note.tags = tags;

if(isPinned) note.isPinned = isPinned;

await note.save();

return res.json({
    error: false,
    note,
    message: "Note updated successfully"
})
  }catch(error) {
    return res.status(500).json({
        error: true,
        message: "Internal server error"
    })
    }
})

// get all notes

app.get('/get-all-notes/', authenticationToken, async (req, res) => {
    const {user} = req.user;

  try{
    const notes = await Note.find({userId: user._id
    }).sort({ isPinned: -1});

    return res.json({
        error: false,
        notes,
        message: "All notes rertrieved successfully"
    });
  }catch(error){
    return res.status(500).json({
        error:true,
        message:"internal server error"
    });
  }

    })

    // delete notes

    app.delete('/delete-note/:noteId', authenticationToken, async (req, res) => {
        const noteId = req.params.noteId;
        const {user} = req.user;

        try{
            const note = await Note.findOne({_id: noteId, userId: user._id});

            if(!note){
                return res.status(404).json({error: true, message: "Note not found"});
            }
            
            await note.deleteOne({_id: noteId, userId: user._id});

            return res.json({
                error: false,
                message: "Note deleted successfully"
            });
        }catch(error){
            return res.status(500).json({
                error: true,
                message: "Internal server error"
            });
        }

        })     

        //Update isPinned

        app.put('/update-note-isPinned/:noteId', authenticationToken, async (req, res) => {

            const noteId = req.params.noteId;
            const {isPinned} = req.body;
            const {user} = req.user;
          
          
            try{
              const note = await Note.findOne({_id: noteId, userId: user._id});
          
          if(!note) {
              return res.status(404).json({error: true, message: "Note not found"});
            
          }
          
         
          
         note.isPinned = isPinned ;
          
          await note.save();
          
          return res.json({
              error: false,
              note,
              message: "Note updated successfully"
          })
            }catch(error) {
              return res.status(500).json({
                  error: true,
                  message: "Internal server error"
              })
              }
        })



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  
  
module.exports = app;
