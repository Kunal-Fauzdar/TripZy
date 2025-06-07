const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js'); 
const methodOverride = require('method-override')
const path = require('path');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
main().then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
};
app.get('/listings',async (req,res)=>{
    let data = await Listing.find({}); 
    res.render('listing/index',{allListings : data});
});

//New Route
app.get('/listings/new',(req,res)=>{
    res.render("listing/new");
});

//Show Route
app.get('/listings/:id',async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("listing/show",{list});
});

//create route
app.post("/listings",(req,res)=>{
    let newList = new Listing(req.body.listing);
    newList.save().then(()=>{
        res.redirect("/listings");
    }).catch((err)=>{
        res.send(err);
    })
});
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/edit",{listing});
});

app.put("/listing/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,req.body.listing);
    res.redirect('/listings');
});

app.delete('/listings/:id',async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log(deletedListing);
});
app.listen(5050,()=>{
    console.log('server is listening');
})