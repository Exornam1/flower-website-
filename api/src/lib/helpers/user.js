async function getUser(username) {
	const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
		username,
	]);
	return rows[0] || null;
}

async function addUser(username, password) {
	const { rows } = await pool.query(
		`INSERT INTO ${this.table} (username, password_hash)
       VALUES ($1, $2)
       RETURNING *`,
		[username, password]
	);
	return rows[0];
}

module.exports = { getUser, addUser };
