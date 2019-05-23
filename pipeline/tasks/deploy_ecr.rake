# frozen_string_literal: true

desc 'Deploy ECR Repository'
task :"deploy:ecr" do
  deploy_env = ENV['DEPLOY_ENV']
  stack_name = "#{deploy_env}-ANGULARJS-APP-ECR-REPOSITORY"
  params = { 'RepoName' => "#{deploy_env.downcase}-angularjs-app" }

  @cloudformation.deploy_stack(stack_name, params, 'provisioning/ecr_repository.yaml')
  @keystore.store("#{deploy_env}_ANGULARJS_APP_ECR_REPO",
                  @cloudformation.stack_output(stack_name, 'DemoECRRepository'))
end
