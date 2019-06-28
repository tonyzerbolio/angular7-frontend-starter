UC_NAME = AngularJS
LC_NAME = angularjs
NAMESPACE = comet
DOCKER_REPO = comet

define header
	@echo ''
	@echo '*******************************'
	@echo "* $(1)"
	@echo '*******************************'
endef

define docker_setup_network
	$(call header,Checking Comet Docker Network)
	docker network inspect $(NAMESPACE)-network &> /dev/null || docker network create $(NAMESPACE)-network
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
# Docker Compose
##################################################
build:
	docker-compose --project-name $(NAMESPACE) --project-directory ../../ -f docker-compose.yml build $(LC_NAME)_build

clean:
	$(call header,Stopping $(UC_NAME) and Pruning Docker)
	@make docker-stop
	@docker image ls | grep $(NAMESPACE) | xargs -n1 docker image rm -f
	@docker system prune -f

deploy:
	$(docker_setup_network)
	$(call header,Deploying $(UC_NAME) to Docker)
	docker-compose --project-name $(NAMESPACE) --project-directory ../../ -f docker-compose.yml up --build --detach $(LC_NAME)_deploy

running:
	@docker container ls -f name=$(NAMESPACE)

stop:
	$(call header,Stopping $(UC_NAME))
	docker-compose --project-name $(NAMESPACE) --project-directory ../../ -f docker-compose.yml down

unit:
	$(docker_setup_network)
	docker-compose --project-name $(NAMESPACE) --project-directory ../../ -f docker-compose.yml run $(LC_NAME)_deploy npm run test