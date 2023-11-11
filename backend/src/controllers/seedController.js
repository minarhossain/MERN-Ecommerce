const data = require("../data")
const User = require("../models/userModel")

const seedUser = async (req, res, next) => {
    try {
        // deleting all existing users
        await User.deleteMany({})

        // inserting new users from own make data
        await User.insertMany(data.users)
        res.status(200).json({ message: "Data Inserted", data: data.users })
    } catch (error) {
        next(error)
    }
}

module.exports = { seedUser }