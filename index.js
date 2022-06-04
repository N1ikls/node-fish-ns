const tf = require("@tensorflow/tfjs-node");
async function loadModel() {
  const model = await tf.loadLayersModel("file://static/model/model.json");
 
  return model;
}
module.exports = loadModel();
