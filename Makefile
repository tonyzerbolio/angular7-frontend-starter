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
	@echo 'clean'
	@echo 'deploy'
	@echo 'list'
	@echo 'running'
	@echo 'stop'
	@echo 'unit'

##################################################
# Docker
##################################################
docker-build:
	docker-compose --project-name comet --project-directory . -f local/docker/docker-compose.yml build angularjs_build

docker-clean:
	$(call header,Stopping DynamoDB and Pruning Docker)
	@make docker-stop
	@docker image ls | grep comet | xargs -n1 docker image rm -f
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
	docker-compose --project-name comet --project-directory . -f local/docker/docker-compose.yml down

docker-unit:
	$(docker_setup_network)
	docker-compose --project-name comet --project-directory . -f local/docker/docker-compose.yml run angularjs_deploy npm run test

##################################################
# Kubernetes
##################################################
build:
	@docker build -f DockerfileMultiStage --target BUILD_STAGE -t comet/angularjs_build:latest .
	@docker build -f DockerfileMultiStage --target DEPLOY_STAGE -t comet/angularjs:latest .

clean:
	$(call header,Removing Service1 Docker Images)
	@docker image rm -f comet/angularjs comet/angularjs_build

build-app:
	@docker build -f DockerfileMultiStage --target BUILD_STAGE -t comet/angularjs_build:latest .

build-deploy:
	@docker build -f DockerfileMultiStage --target DEPLOY_STAGE -t comet/angularjs:latest .

deploy:
	$(call header,Deploying Service 1 on Kubernetes)
	@docker image ls | grep -w "comet/angularjs_build" &> /dev/null || docker build -f DockerfileMultiStage --target BUILD_STAGE -t comet/angularjs_build:latest .
	@docker image ls | grep -w "comet/angularjs" &> /dev/null || docker build -f DockerfileMultiStage --target DEPLOY_STAGE -t comet/angularjs:latest .
	@kubectl apply -f local/kubernetes/deployment.yml
	@kubectl apply -f local/kubernetes/service.yml

stop:
	$(call header,Deleting Service 1 Kubernetes Objects)
	@kubectl get pods --namespace comet | grep "angularjs" | grep -v "Terminating" && \
	kubectl delete -f local/kubernetes/service.yml && \
	kubectl delete -f local/kubernetes/deployment.yml

running:
	@kubectl get pods --namespace comet

unit:
	@docker run comet/angularjs npm run test
