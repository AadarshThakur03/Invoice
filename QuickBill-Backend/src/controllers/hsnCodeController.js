const hsnCodeService = require("../services/hsnCodeService");

async function getHsnCodes(req, res) {
  try {
    const hsnCodes = await hsnCodeService.getHsnCodes();
    res.json(hsnCodes);
  } catch (err) {
    res.status(500).send(`Error fetching HSN codes: ${err.message}`);
  }
}

async function addHsnCode(req, res) {
  const hsnCodeData = req.body;
  console.log(req.userId, "addHsnCode");
  if (req.userId == "" || req.userId == undefined) {
    return res.json({ error: "Invalid User" });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.json({ error: "Empty request!!" });
  }
  try {
    const result = await hsnCodeService.addHsnCode(hsnCodeData, req.userId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getHsnCodesByUserID(req, res) {
  if (req.userId == "" || req.userId == undefined) {
    return res.json({ error: "Invalid User" });
  }
  try {
    const result = await hsnCodeService.getHsnCodeByUserID(req.userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}
async function getHsnCodeByNameAndUserId(req, res) {
  const { hsnCode, id } = req.params;
  const userId = req.userId;

  if (req.userId == "" || req.userId == undefined) {
    return res.json({ error: "Invalid User" });
  }

  try {
    const result = await hsnCodeService.getHsnCodeByNameAndUserId(
      hsnCode,
      id,
      userId
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addHsnCode,
  getHsnCodes,
  getHsnCodesByUserID,
  getHsnCodeByNameAndUserId
};
