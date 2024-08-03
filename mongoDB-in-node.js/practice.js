import mongoose from "mongoose";

export const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/learningMongo') // mongodb is the protocol
}

export const student = new mongoose.Schema({ // schema to validate values (instructions for collections not collections itself)
  firstName: String,
  lastName: String,
})

// to make it more validated and has more meta data

export const student2 = new mongoose.Schema({ // schema to validate values (instructions for collections not collections itself)
  firstName: {
    type: String,
    required: true,
    unique: true, // index! 
  },
  lastName: {
    type: String,
    required: true,
  },
  // nested collections
  info:{
    school:{
      type: String,
    },
    age: {
      type: Number,
    },
    grades:[{type:Number}]
  },
timestamps: true
})


export const Student = mongoose.model('student', student); // creates the collection/model, keep the name singular and it will make it plural for you


// connecting to the db
connect()
.then(async conn => {
  const student = await Student.find({firstName: "Aya"})
  console.log(student);
  
})
.catch(e => console.log(e));
