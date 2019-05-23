# frozen_string_literal: true

desc 'Run Static Analysis'
task :"sonarqube:analysis" do
  image_id = 'angularjs_app:build'
  sh run_docker_command(image_id, '/app/code_analysis.sh')
end

desc 'Run Unit Test'
task :"tests:unit" do
  image_id = 'angularjs_app:build'
  sh run_docker_command(image_id, 'npm run test')
end

desc 'Run Smoke Test'
task :"tests:smoke" do
  image_id = 'angularjs_app:build'
  test_container = 'angular_test'
  sh run_docker_command(image_id, 'npm run e2e')
  `docker rm -f #{test_container}`
end

desc 'Run Docker Security Benchmark'
task :"security:benchmark" do
  deploy_env = ENV['DEPLOY_ENV']
  ecr_repo = @keystore.retrieve("#{deploy_env}_ANGULARJS_APP_ECR_REPO")
  image1 = 'angularjs_app:build'
  image2 = "#{ecr_repo}:#{ENV['deployment_id']}"
  sh run_benchmark("#{image1},#{image2}")
end
