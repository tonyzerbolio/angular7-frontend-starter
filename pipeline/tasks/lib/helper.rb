# frozen_string_literal: true

def copy_build_artifacts_to_jenkins(image_to_copy_from,
                                    files_to_copy,
                                    dest_on_jenkins)
  files_to_copy.each do |src_file|
    sh copy_command(image_to_copy_from, src_file, dest_on_jenkins)
  end
end

def run_docker_command(image, command)
  <<-SHELL
    docker run --rm -t #{image} bash -c \"#{command}\"
  SHELL
end

def run_docker_command_with_name(image, name, command)
  <<-SHELL
    docker run --name #{name} --rm -t #{image} bash -c \"#{command}\"
  SHELL
end

def exec_docker_command_with_name(name, command)
  <<-SHELL
    docker exec -t #{name} bash -c \"#{command}\"
  SHELL
end

def run_docker_command_with_entrypoint(image, entrypoint, command)
  <<-SHELL
    docker run --rm -t #{image} #{entrypoint} \"#{command}\"
  SHELL
end

def copy_command(image_to_copy_from,
                 file_to_copy,
                 dest_on_jenkins)
  <<-SHELL
    docker create --name angularjs_app_build #{image_to_copy_from}
    docker cp angularjs_app_build:#{file_to_copy} #{dest_on_jenkins}
    docker rm -f angularjs_app_build
  SHELL
end

def run_benchmark(images)
  <<-SHELL
    docker run --rm -t --net host --pid host --userns host --cap-add audit_control \
        -e DOCKER_CONTENT_TRUST=$DOCKER_CONTENT_TRUST \
        -v /etc:/etc \
        -v /usr/bin/docker-containerd:/usr/bin/docker-containerd \
        -v /usr/bin/docker-runc:/usr/bin/docker-runc \
        -v /usr/lib/systemd:/usr/lib/systemd \
        -v /var/lib:/var/lib \
        -v /var/run/docker.sock:/var/run/docker.sock \
        --label docker_bench_security \
        docker/docker-bench-security -c container_images -t #{images}
  SHELL
end

def render_k8s_template(template)
  erb_template = ERB.new(File.read(template)).result
  rendered_service = YAML.safe_load(erb_template)
  # Write Rendered Config Data to file
  File.open(template, 'w') \
    { |file| file.write(rendered_service.to_yaml) }
end

def k8s_apply(template)
  <<-SHELL
    kubectl apply -f #{template}
  SHELL
end
