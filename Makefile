build:
	docker-compose build app_build

unit:
	docker-compose run app_build npm run test

e2e:
	docker-compose run app_build npm run e2e

deploy:
	docker-compose up --build --detach app_deploy

stop:
	docker-compose down
