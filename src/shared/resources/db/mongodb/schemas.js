const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    region: {
        type: String,
        required: true,
        lowercase: true,
    },
    rating: {
        type: Number,
    },
    fee: {
        type: Number,
    },
    sales: {
        type: Number,
        default: 0,
    },
});

const Agent = mongoose.model("Agent", AgentSchema);

const RegionSchema = new mongoose.Schema({
    region: {
        type: String,
        lowercase: true,
    },
    address: {
        type: String,
        lowercase: true,
    },
    total_sales: {
        type: Number,
    },
    manager: {
        type: String,
        lowercase: true,
    },
    top_agents: {
        type: String,
        lowercase: true,
    },
})

const Region = mongoose.model("Region", RegionSchema);

module.exports = 
{
    Agent,
    Region
};