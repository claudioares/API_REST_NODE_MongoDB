const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const UserListingSchema = new Schema({
    id: ObjectId,
    username: String,
    email: String,
    password: String,
    phone: String,
    cpf:String,
    street: String,
    number: String,
    city: String,
    country: String

})

const UserListing = mongoose.model('userBD', UserListingSchema)

export default UserListing;