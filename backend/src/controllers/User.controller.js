const User = require('../models/User.model.js');

const userController = {
    getAllUsers : async (req, res) => {
        const results = await User.getAllUsers();
        results.map(result => {result.password = undefined}); //clear password output
        const newArr = results.map((i) => ({name: i, thang: 'deptrai'}))
        console.log(newArr);
        res.status(201).send(results);
    },
}

module.exports = userController;