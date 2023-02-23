const mongoose = require("mongoose");

// Schema for Agents
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

const Agent = mongoose.model("agents", AgentSchema);

// Schema for Region
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

// Schema for Unit prices
const UnitPriceSchema = new mongoose.Schema({
    standard: {
        type: Number,
        default: 8000,
    },
    premium: {
        type: Number,
        default: 12000,
    },
    excelium: {
        type: Number,
        default: 15000,
    },
})

const UnitPrice = mongoose.model("Unit Price", UnitPriceSchema);

// Schema for Installation Fees
const InstallationFeesSchema = new mongoose.Schema({
    standard: {
        type: Number,
        default: 8000,
    },
    premium: {
        type: Number,
        default: 12000,
    },
    excelium: {
        type: Number,
        default: 15000,
    },
})

const InstallationFees = mongoose.model("Installation Percentafe Fees", InstallationFeesSchema);

module.exports = 
{
    Agent,
    Region,
    UnitPrice,
    InstallationFees
};