install:
	npm install

test:
	npx jest

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run

start:
	npx babel-node src/bin/gendiff.js

build:
	npm run build

lint:
	npx eslint .