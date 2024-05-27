const itemService = require("../services/itemService");

async function getItems(req, res) {
  try {
    const items = await itemService.getItems();
    res.json(items);
  } catch (err) {
    res.status(500).send(`Error fetching items: ${err.message}`);
  }
}

async function addItem(req, res) {
  const itemData = req.body;
  if (req.userId == "" || req.userId == undefined) {
    return res.json({ error: "Invalid User" });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.json({ error: "Empty request!!" });
  }
  try {
    const result = await itemService.addItem(itemData, req.userId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getItemsByUserID(req, res) {
    if (req.userId == "" || req.userId == undefined) {
        return res.json({ error: "Invalid User" });
      }
  try {
    const result = await itemService.getItemByUserID(req.userId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getItems,
  addItem,
  getItemsByUserID
};
