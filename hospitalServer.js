/* 
make a hospital that changes, inserts, replace, and removes kidneys 
first get the info about the kidneys with (app.get)
in app.get you should write code to check number of kidneys, number of healthy kidneys
number of unhealthy kidneys, and show it on locahost 

then write code to insert new kidneys using (app.post) need to use postman for this

then write code to replace kidneys, use app.put for that 

then write code to delete kidneys, use app.delete for this one.
while deleting kidneys make sure you won't be deleting unhealthy kidneys if there is none, 
so when there is no unhealthy, show that there is no unhealthy kidneys to remove, do same with 
replace, so if there is no unhealthy kidneys, there is nothing we can replace.
*/

const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const user = [{
    name: "Rampal", 
    kidneys: [{
        healthy: true
    }]
}]

app.get("/", (req,res) => {
    const rampalKidneys = user[0].kidneys;
    const numberOfKidneys = rampalKidneys.length;

    let numberOfHealthyKidneys = 0;

    for(i=0; i<rampalKidneys.length; i++) {
        
        if(rampalKidneys[i].healthy) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })

});

app.post("/" , (req,res) => {
    const newKidneys = req.body.newKidneys;
    user[0].kidneys.push({
        healthy: newKidneys
    })
    res.json({
        msg: "Post Done"
    })
});

app.put("/", (req,res) => {
    for(i=0;i<user[0].kidneys.length; i++) {
        user[0].kidneys[i].healthy = true
    }

    res.json({
        msg: "Put Done"
    })
})

app.delete("/", (req,res) => {
    if(isThereAtLeastOneUnhealthyKidney ()) {
    const healthyKidneysOnly = [];
    for(let i=0;i<user[0].kidneys.length; i++) {
        if(user[0].kidneys[i].healthy) {
        healthyKidneysOnly.push({
            healthy: true
        });
    }
    }
    user[0].kidneys = healthyKidneysOnly;
    res.json({
        msg: "Delete Done"
    });
} else {
    res.status(411).json({
        msg: "There is no unhealthy kidnyes which needs fixing."
    })
}
});

function isThereAtLeastOneUnhealthyKidney() {
    let atLeastOneUnhealthyKidney = false;
    for(i=0;i<user[0].kidneys.length; i++) {
        if(!user[0].kidneys[i].healthy) {
            atLeastOneUnhealthyKidney = true
        }
    }
    return atLeastOneUnhealthyKidney
}


app.listen(port);




// hey