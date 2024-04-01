const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamId: {
        type: Number,
        unique: true,
        default: () => Math.floor(1000 + Math.random() * 9000), // generate a random 4-digit number
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    users: [{
        type: Number, // Adjust the type to Number to match the userId in User model
        ref: 'User', // Reference the User model
    }],
});

// Method to add a user to the team
teamSchema.methods.addUser = async function (userId) {
    if (!this.users.includes(userId)) {
        this.users.push(userId);
        await this.save();
    }
};

// Method to remove a user from the team
teamSchema.methods.removeUser = async function (userId) {
    this.users = this.users.filter(id => id.toString() !== userId.toString());
    await this.save();
};

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
