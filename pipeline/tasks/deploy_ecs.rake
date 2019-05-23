# frozen_string_literal: true

desc 'Deploy Service into ECS'
task :"deploy:container" do
  deploy_env = ENV['DEPLOY_ENV']
  stack_name = "#{deploy_env}-ANGULARJS-APP-ECS-SERVICE"
  env_vars = YAML.load_file(File.join(__dir__,
                                      "envs/#{deploy_env.downcase}.yml"))
  case deploy_env
  when 'DEV'
    cluster = @keystore.retrieve('NONPROD_ECS_CLUSTER_ID')
    key_image_name = @keystore.retrieve('DEV_ANGULARJS_APP_IMAGE_ID')
  when 'PROD'
    cluster = @keystore.retrieve('PROD_ECS_CLUSTER_ID')
    key_image_name = @keystore.retrieve('PROD_ANGULARJS_APP_IMAGE_ID')
  end
  docker_image = ENV['DOCKER_IMAGE'] || key_image_name
  keystore_key = "#{deploy_env}_ANGULARJS_APP_TARGETGROUP"
  params = {
    'Cluster' => cluster,
    'ClusterSize' => '2',
    'DeploymentID' => ENV['deployment_id'],
    'DockerImage' => docker_image,
    'SecretsBucket' => @keystore.retrieve(env_vars['deployment_bucket']),
    'SecretsFile' => "angularjs-app-configs-#{ENV['deployment_id']}.sh",
    'TargetGroup' => @keystore.retrieve(keystore_key)
  }

  @cloudformation.deploy_stack(stack_name, params, 'provisioning/ecs.yaml')
end
