define header
	@echo ''
	@echo '*******************************'
	@echo "* $(1)"
	@echo '*******************************'
endef

define docker_setup_network
	$(call header,Checking Comet Docker Network)
	docker network inspect comet-network &> /dev/null || docker network create comet-network
endef

list:
	@echo 'build'
	@echo 'docker-clean'
	@echo 'docker-deploy'
	@echo 'docker-e2e'
	@echo 'docker-running'
	@echo 'docker-stop'
	@echo 'docker-unit'
	@echo 'k8s-deploy'
	@echo 'list'

build:
	docker-compose --project-name comet --project-directory . -f local/docker/docker-compose.yml build angularjs_deploy

docker-clean:
	$(call header,Stopping DynamoDB and Pruning Docker)
	@make docker-stop
	@docker system prune -f

docker-deploy:
	$(docker_setup_network)
	$(call header,Deploying AngularJS to Docker)
	docker-compose --project-name comet --project-directory . -f local/docker/docker-compose.yml up --build --detach angularjs_deploy

docker-e2e:
	$(docker_setup_network)
	$(call header,E2E AngularJS to Docker)
	docker-compose --project-name comet --project-directory . -f local/docker/docker-compose.yml run angularjs_deploy npm run e2e

docker-running:
	@docker container ls -f name=comet

docker-stop:
	$(call header,Stopping DynamoDB)
	docker-compose --project-directory . -f local/docker/docker-compose.yml down

docker-unit:
	$(docker_setup_network)
	docker-compose --project-name comet --project-directory . -f local/docker/docker-compose.yml run angularjs_deploy npm run test

k8s_deploy:
	$(call header,Deploying AngularJS on K8S)
	@kubectl apply -f local/kubernetes/deployment.yml
	@kubectl apply -f local/kubernetes/service.yml
