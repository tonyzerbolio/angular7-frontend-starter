require 'erb'
require 'minimal_pipeline'
require 'yaml'
require './pipeline/tasks/shared/vars'
require 'cfn-nag'

Dir.glob('pipeline/tasks/*.rake').each do |task_file|
  load task_file
end

task :'static-analysis' do
  sh 'rubocop'
end

desc 'Run CFN Analysis'
task :'CFN-test' do
  puts "\n\nCFN-NAG Static security tests"
  Dir.glob('pipeline/templates/cloudformation/*.yaml') do |cfn_file|
    failures = CfnNag.new(config: CfnNagConfig.new).audit_aggregate_across_files_and_render_results(input_path: File.open(cfn_file))
    raise "CFN Nag found #{failures} issue(s)." unless failures.to_i.zero?
  end
end
