const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT * FROM flowers ORDER BY id ASC"
		);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query("SELECT * FROM flowers WHERE id=$1", [
			id,
		]);
		if (result.rows.length === 0)
			return res.status(404).json({ error: "Flower not found" });
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
