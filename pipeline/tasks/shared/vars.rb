# frozen_string_literal: true

@keystore = MinimalPipeline::Keystore.new
@docker = MinimalPipeline::Docker.new
@cloudformation = MinimalPipeline::Cloudformation.new
@crossing = MinimalPipeline::Crossing.new
