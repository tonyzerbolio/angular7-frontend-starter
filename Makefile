build:
	docker-compose build angular_tc_build

unit:
	docker network inspect comet-network &> /dev/null || docker network create comet-network
	docker-compose run angular_tc_build npm run test

e2e:
	docker network inspect comet-network &> /dev/null || docker network create comet-network
	docker-compose run angular_tc_build npm run e2e

deploy:
	docker network inspect comet-network &> /dev/null || docker network create comet-network
	docker-compose up --build --detach angular_tc_deploy

stop:
	docker-compose down
