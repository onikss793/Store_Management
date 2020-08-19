module.exports = {
	rules: {
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1,
				VariableDeclarator: 1
			}
		],
		quotes: [
			'error',
			'single'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		semi: [
			'error',
			'always'
		],
		'keyword-spacing': [
			'error',
			{
				before: true,
				after: true
			}
		],
		'space-before-blocks': [
			'error',
			'always'
		],
		'brace-style': [
			'error',
			'1tbs'
		],
		'space-infix-ops': [
			'error',
			{
				int32Hint: false
			}
		],
		'key-spacing': [
			2
		],
		'eol-last': [
			'error',
			'always'
		],
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1,
				maxEOF: 0
			}
		],
		'one-var': [
			'error',
			{
				const: 'never',
				let: 'never'
			}
		],
		'no-var': 'error',
		'prefer-const': [
			'error', {
				destructuring: 'all',
				ignoreReadBeforeAssign: true
			}
		],
		'no-multi-assign': 'error',
		'no-new-object': 'error',
		'object-shorthand': ['error', 'always', { avoidQuotes: true }],
		'quote-props': ['error', 'as-needed'],
		'no-prototype-builtins': 'error',
		'no-array-constructor': 'error',
		'prefer-arrow-callback': 'error',
		'arrow-spacing': 'error',
		'arrow-parens': ['error', 'as-needed'],
	},
	env: {
		es6: true,
		jest: true,
		node: true
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2018
	},
	parser: 'babel-eslint',
	plugins: [],
	extends: ['eslint:recommended'],
	ignorePatterns: ['express']
};
