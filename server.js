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
    const trimmedTitle = req.body.title.trim();
    notesSchema.create({
        title:trimmedTitle,
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
    let data = await notesSchema.findOne({title: `${req.params.notesName}`})
    res.render('Notes', {data})
})

// edit notes
app.get('/edit/:notesName', async (req,res)=>{
    let data = await notesSchema.findOne({title: `${req.params.notesName}`})
    res.render('Edit', {data})
    
})

// save edited note

app.post('/save/:notesName', async(req,res)=>{
    await notesSchema.replaceOne({title:req.params.notesName},{
        title:req.body.newTitle,
        desc: req.body.newDesc
    })

    console.log("Document Changed")
    res.redirect('/')

})

app.listen(3000)