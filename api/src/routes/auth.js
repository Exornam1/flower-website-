const express = require("express");
const { getUser, addUser } = require("../lib/helpers/user");

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;

		const exists = await getUser(username);
		if (exists) {
			return res.status(400).json({ error: "Email already registered" });
		}

		const hash = await bcrypt.hash(password, 10);
		const user = await addUser({
			username,
			password: hash,
		});

		res.status(201).json({
			id: user.id,
			username: user.username,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	const user = await getUser(username);
	if (!user) {
		return res.status(400).json({ error: "Invalid Email or Password" });
	}

	const valid = await bcrypt.compare(password, user.password_hash);
	if (!valid) {
		return res.status(400).json({ error: "Invalid Email or Password" });
	}

	res.json({ id: user.id, email: user.email, name: user.full_name });
});

module.exports = router;