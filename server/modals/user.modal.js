import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import 'dotenv/config'


let url=process.env.MONGO_URL;

main().then((res)=>{console.log("Connection is up")}).catch(err => console.log(err));
console.log("Hello");

async function main() {
  await mongoose.connect(url);
}


const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number: {
        type: Number,
        required: true,
        unique: true
    }
    
});

const User = mongoose.model('User',userSchema);

export default User;
