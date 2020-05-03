module.exports = (req, res) => {
	const { superuser, is_admin, store_id } = req;

	res.status(200).json({ superuser, is_admin, store_id });
};