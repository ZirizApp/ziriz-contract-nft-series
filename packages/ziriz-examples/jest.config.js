module.exports = {
	transform: { '^.+\\.ts?$': 'ts-jest' },
	testEnvironment: 'node',
	testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx|js)$',
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
}
