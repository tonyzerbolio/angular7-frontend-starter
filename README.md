# Angular App

### Build and Tests

#### Build and Run using Docker Compose

This project uses Nginx to serve the requests from the AngularJS App. All Build and Tests should use the make commands below which uses docker for every step to ensure consistency with pipeline deployments

Execute the following command to build the Angular App:

```bash
make build
```

To Run Unit Tests

```bash
make unit
```

To Run E2E Tests

```bash
make e2e
```

To Deploy the App locally

```bash
make deploy
```

Once deployed, you can access the application from your browser at: `http://localhost:8080/`

To stop the deployed container and clean up builds

```bash
make stop
```
