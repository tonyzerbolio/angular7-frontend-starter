@Library('pipeline-helpers') _

demoPipeline {
  projectName = 'angularjs-app'
  description = 'AngularJS App'
  env = 'DEV'
  projectDsl = 'angular'
  imageName = 'angularjs_app'
  rvmVersion = '2.5.1'
  cfnNag = true
  buildApplication = true
  runSonarScan = true
  runUnitTest = true
  runSmokeTest = true
  runCisBenchmark = true
  enforceSonarQuality = false
  downstreamEnv = []
}
