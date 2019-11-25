# frozen_string_literal: true

desc 'Generates secrets file'
task :'setup:secrets' do
  deploy_env = ENV['DEPLOY_ENV']
  env_vars = YAML.load_file(File.join(__dir__,
                                      "envs/#{deploy_env.downcase}.yml"))
  config_bucket = @keystore.retrieve(env_vars['deployment_bucket'])

  content = ''

  raise 'Missing ENV Variable deployment_id' if ENV['deployment_id'].nil?

  filename = "angularjs-app-configs-#{ENV['deployment_id']}.sh"
  @crossing.upload_content(config_bucket, filename, content)
end
