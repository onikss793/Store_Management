module.exports = {
	ping: (root, args, context) => {
		console.log(root);
		console.log(args);
		console.log(context);
		return 'pong';
	}
}