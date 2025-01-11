pipeline {
    agent any
    stages {
        stage('Prepare Workspace') {
            steps {
                cleanWs() // Cleans up any previous workspace files
            }
        }
        stage('Clone Repository') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/suss58/jenkins-and-docker.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    try {
                        // Building Docker image with the tag from Dockerfile
                        sh 'docker build -t jenkins-and-docker:latest .' // Replace with your image name if needed
                    } catch (Exception e) {
                        echo "Error building Docker image: ${e}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                echo 'Running Docker container...'
                script {
                    try {
                        // Running Docker container with specified port mapping and container name
                        sh 'docker run -d -p 3000:3000 --name my-container jenkins-and-docker:latest'
                    } catch (Exception e) {
                        echo "Error running Docker container: ${e}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Cleaning up Docker container...'
            script {
                try {
                    // Stopping and removing the Docker container
                    sh '''
                        docker stop my-container || true
                        docker rm my-container || true
                    '''
                } catch (Exception e) {
                    echo "Error during cleanup: ${e}"
                }
            }
        }
        success {
            echo 'Build and deployment completed successfully!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
