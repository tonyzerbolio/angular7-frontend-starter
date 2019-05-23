# frozen_string_literal: true

require_relative 'lib/helper.rb'

desc 'Build Application with Docker'
task :"build:application" do
  image_id = 'angularjs_app:build'
  puts "Image Tag: #{image_id}"
  $stdout.flush
  @docker.build_docker_image(image_id,
                             dockerfile: 'Dockerfile')
  puts "Built Image Tag: #{image_id}"
end

desc 'Build Docker Image'
task :"build:image:angularjs_app" do
  build_dir = "#{Dir.pwd}/containers/angularjs_app"
  files_to_copy = ['/app/dist/', '/app/package.json']
  copy_build_artifacts_to_jenkins('angularjs_app:build',
                                  files_to_copy,
                                  build_dir)
  deploy_env = ENV['DEPLOY_ENV']
  ecr_repo = @keystore.retrieve("#{deploy_env}_ANGULARJS_APP_ECR_REPO")
  image_id = "#{ecr_repo}:#{ENV['deployment_id']}"
  puts "Image Tag: #{image_id}"
  @docker.build_docker_image(image_id,
                             build_context: build_dir)
  puts "Built Image Tag: #{image_id}"
  @keystore.store("#{deploy_env}_ANGULARJS_APP_IMAGE_ID", image_id)
end

desc 'Push Docker Image'
task :"push:image:angularjs_app" do
  deploy_env = ENV['DEPLOY_ENV']
  image_id = @keystore.retrieve("#{deploy_env}_ANGULARJS_APP_IMAGE_ID")
  @docker.push_docker_image(image_id)
  puts "Pushed #{image_id} to ECR"
end

desc 'Promote Docker Image'
task :"promote:image:angularjs_app" do
  image_id = @keystore.retrieve('DEV_ANGULARJS_APP_IMAGE_ID')
  @keystore.store('PROD_ANGULARJS_APP_IMAGE_ID', image_id)
end
