# frozen_string_literal: true

desc 'Deploy ALB For AngularJS App'
task :"deploy:alb" do
  deploy_env = ENV['DEPLOY_ENV']
  stack_name = "#{deploy_env}-ANGULARJS-APP-ALB"
  case deploy_env
  when 'DEV'
    subnets = @keystore.retrieve('ELB_SUBNET_IDS')
    vpc_id = @keystore.retrieve('VPC_ID')
  when 'PROD'
    subnets = @keystore.retrieve('ELB_SUBNET_IDS_PROD')
    vpc_id = @keystore.retrieve('VPC_ID_PROD')
  end
  params = {
    'DeployEnv' => deploy_env,
    'Subnets' => subnets,
    'VpcId' => vpc_id,
    'HostedZoneName' => @keystore.retrieve('DNS_ZONE_NAME')
  }

  @cloudformation.deploy_stack(stack_name, params, 'provisioning/alb.yaml')
  @keystore.store("#{deploy_env}_ANGULARJS_APP_ALB",
                  @cloudformation.stack_output(stack_name,
                                               'LoadBalancerDNSName'))
  @keystore.store("#{deploy_env}_ANGULARJS_APP_TARGETGROUP",
                  @cloudformation.stack_output(stack_name,
                                               'LoadBalancerTargetGroupName'))
end
