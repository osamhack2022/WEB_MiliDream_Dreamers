module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["airbnb-base"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {
		"no-console": "off",
		"spaced-comment": "off",
		"no-else-return": "off",
	},
};
