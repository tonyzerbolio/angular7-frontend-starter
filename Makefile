UC_NAME = AngularJS
LC_NAME = angularjs
NAMESPACE = comet
DOCKER_REPO = comet

define header
	@echo ''
	@echo '*************************************************************************'
	@echo "* $(1)"
	@echo '*************************************************************************'
endef

list:
	@echo 'build'
	@echo 'clean'
	@echo 'deploy'
	@echo 'deployments'
	@echo 'images'
	@echo 'list'
	@echo 'pods'
	@echo 'pod-details'
	@echo 'remove'
	@echo 'service'
	@echo 'services'
	@echo 'unit'

##################################################
# Kubernetes
##################################################
build:
	@docker build -f Dockerfile --target BUILD_STAGE -t $(DOCKER_REPO)/$(LC_NAME)_build:latest .
	@docker build -f Dockerfile --target DEPLOY_STAGE -t $(DOCKER_REPO)/$(LC_NAME):latest .

build-app:
	@docker build -f Dockerfile --target BUILD_STAGE -t $(DOCKER_REPO)/$(LC_NAME)_build:latest .

build-deploy:
	@docker build -f Dockerfile --target DEPLOY_STAGE -t $(DOCKER_REPO)/$(LC_NAME):latest .

clean:
	$(call header,Removing $(UC_NAME) Docker Images)
	@docker image rm -f $(DOCKER_REPO)/$(LC_NAME) $(NAMESPACE)/$(LC_NAME)_build

deploy:
	$(call header,Checking for Comet Namespace on Kubernetes)
	@kubectl get namespaces | grep -w $(NAMESPACE) || kubectl create namespace $(NAMESPACE)

	$(call header,Deploying $(UC_NAME) on Kubernetes)
	@docker image ls | grep -w "$(DOCKER_REPO)/$(LC_NAME)_build" &> /dev/null || docker build -f Dockerfile --target BUILD_STAGE -t $(DOCKER_REPO)/$(LC_NAME)_build:latest .
	@docker image ls | grep -w "$(DOCKER_REPO)/$(LC_NAME)" &> /dev/null || docker build -f Dockerfile --target DEPLOY_STAGE -t $(DOCKER_REPO)/$(LC_NAME):latest .
	@kubectl apply -f local/kubernetes/deployment.yml
	@kubectl apply -f local/kubernetes/service.yml

deployments:
	@kubectl get deployments --namespace $(NAMESPACE)

images:
	@docker image ls | grep "$(DOCKER_REPO)"

pods:
	@kubectl get pods --namespace $(NAMESPACE)

pod-details:
	@kubectl get pods --namespace $(NAMESPACE) | grep $(LC_NAME) | awk '{print $$1}' | xargs -I {} kubectl get pod {} --namespace $(NAMESPACE) --output=yaml

remove:
	$(call header,Deleting $(UC_NAME) Kubernetes Objects)
	@kubectl get pods --namespace $(NAMESPACE) | grep "$(LC_NAME)" | grep -v "Terminating" &> /dev/null  && \
	kubectl delete -f local/kubernetes/service.yml && \
	kubectl delete -f local/kubernetes/deployment.yml

service:
	@kubectl describe svc $(LC_NAME) --namespace $(NAMESPACE)

services:
	@kubectl get svc --namespace $(NAMESPACE)

unit:
	@docker run $(DOCKER_REPO)/$(LC_NAME)_build npm run test
