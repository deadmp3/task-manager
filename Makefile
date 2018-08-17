migrate-db:
	npm run sequelize db:migrate

undo-migrate-db:
	npm run sequelize db:migrate:undo

seed-db:
	npm run sequelize db:seed:all

start:
	npm start

develop:
	npm run nodemon -- --exec npm run babel-node -- server/bin/task-manager.js

test:
	npm test

lint:
	npm run eslint -- server app __test__