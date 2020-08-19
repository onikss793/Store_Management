module.exports = (req, res) => {
	const { is_admin, store_id } = req;

	res.status(200).json({ is_admin, store_id });
};
