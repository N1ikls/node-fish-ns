let express = require("express");
const tf = require("@tensorflow/tfjs");
let app = express();
const bp = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8081;
app.use(cors());
app.use(bp.json({ limit: "100mb" }));
app.use(bp.urlencoded({ limit: "100mb", extended: true }));
app.use("/", express.static("C:/Users/sau30/mobile-neuron/api/static"));
app.post("/post", async (req, res) => {
  const model = await tf.loadLayersModel("file://static/model/model.json");
  const image = req.body.imageBase64;
  const img_1 = image.replace(/^data:image\/(png|jpeg);base64,/, "");
  let buf = Buffer.from(img_1, "base64");
  const t = tf.node.decodeImage(buf).resizeNearestNeighbor([320, 240]);
  let predictions = await model.predict(t.reshape([1, 320, 240, 3])).data();
  console.log("Post");
  console.log(Array.from(predictions));
  res.status(201).send(Array.from(predictions));
});

app.get("/getImage", async (req, res) => {
  const model = await tf.loadLayersModel("file://static/model/model.json");
  const image = req.body.imageBase64;
  console.log(req.body);
  const img_1 = image.replace(/^data:image\/(png|jpeg);base64,/, "");
  let buf = Buffer.from(img_1, "base64");
  const t = tf.node.decodeImage(buf).resizeNearestNeighbor([320, 240]);
  let predictions = await model.predict(t.reshape([1, 320, 240, 3])).data();
  console.log("Get");
  console.log(Array.from(predictions).data);
  res.send(Array.from(predictions).data);
});
app.listen(PORT, () => {
  console.log("Server started", PORT);
});
