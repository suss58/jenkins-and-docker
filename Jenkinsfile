pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/suss58/jenkins-and-docker.git'
        BRANCH = 'main'
        IMAGE_NAME = 'jenkins-and-docker'
        CONTAINER_NAME = 'my-container'
        PORT = '3000'
    }

    stages {
        stage('Prepare Workspace') {
            steps {
                echo 'Cleaning workspace...'
                cleanWs() // Cleans up previous workspace files
            }
        }

        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    try {
                        sh "docker build -t ${IMAGE_NAME}:latest ."
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
                        // Stop any previous instance of the container
                        sh '''
                            docker stop ${CONTAINER_NAME} || true
                            docker rm ${CONTAINER_NAME} || true
                        '''
                        // Start the new container
                        sh "docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest"
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
                    sh '''
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
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
