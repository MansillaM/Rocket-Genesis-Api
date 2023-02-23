const Data = require('../../shared/resources/db/mongodb/schemas').Agent;

const emailList = async (req, res) => {
  try {
    const agents = await Data.find();
    const emails = agents.map(agent => agent.email);
    res.send(emails.toString());
  } catch (error) {
    res.status(500).send(error);
  }
};

const regionAverage = (req,res) => {
  const region = req.query.region.toLowerCase();
  const agents = Data.filter(agent => agent.region.toLowerCase() === region);

  if(!agents.length){
    res.send(`No agents in region: ${region}`);
    return;
  }

  // Try to keep heavy calculations after escape clauses
  const avgRating = agents.reduce((total, current)=>{return total + +current.rating},0) / agents.length;
  const avgFee = agents.reduce((total, current)=>{return total + +current.fee},0) / agents.length;

  res.send({
    region,
    average_rating:avgRating.toFixed(2),
    average_fee:avgFee.toFixed(2)
  });
};

module.exports = {emailList,regionAverage};