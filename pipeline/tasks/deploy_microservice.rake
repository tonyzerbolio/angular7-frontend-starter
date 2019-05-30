# frozen_string_literal: true

require_relative 'lib/helper'

desc 'Deploy Angular TC into EKS'
task :"deploy:container" do
  # Get Env Variables
  deploy_env = ENV['DEPLOY_ENV']
  env_vars = YAML.load_file(File.join(__dir__,
                                      "envs/#{deploy_env.downcase}.yml"))

  # Generate K8s Service Template
  @namespace = 'development'
  @env = deploy_env
  service_template = 'pipeline/templates/kubernetes/service.yml'
  render_k8s_template(service_template)

  # Create or Update Service
  sh k8s_apply(service_template)

  # Generate K8s Deployment Template
  @angular_tc_replica_count = 2
  @angular_tc_docker_image = @keystore.retrieve("#{deploy_env}_ANGULARJS_APP_IMAGE_ID")
  @region = ENV['AWS_REGION']
  @secrets_bucket = @keystore.retrieve(env_vars['deployment_bucket'])
  @secrets_file = "angularjs-app-configs-#{ENV['deployment_id']}.sh"
  deployment_template = 'pipeline/templates/kubernetes/deployment.yml'
  render_k8s_template(deployment_template)

  # Trigger Deployment
  sh k8s_apply(deployment_template)
end
