const express = require('express')
const app  = express();
const path = require('path')
const notesSchema = require('./db');
const { log } = require('console');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')



// home page

app.get('/', async(req,res)=>{
    data = await notesSchema.find()
    res.render('Home',{data})
})


// create new note
app.post('/create', async (req,res)=>{

    notesSchema.create({
        title:req.body.title,
        desc:`${req.body.disc}`
    })
    res.redirect('/')
})


// delete notes
app.get('/delete/:notesName', async (req,res)=>{
    const trimmedTitle = req.params.notesName.trim();
    await notesSchema.findOneAndDelete({title: trimmedTitle})
    
    res.redirect('/')
})

// read notes
app.get('/notes/:notesName', async (req,res)=>{
    await notesSchema.findOne({title: `${req.params.notesName}`})
    
    res.render('Notes')
})

app.listen(3000)