import mongoose from "mongoose";

async function startDB() {
    await mongoose.connect('exemplo: <mongodb+srv://<usuario>:<senha>@cluster0.xvvvsnm.mongodb.net/test>')
}

export default startDB;