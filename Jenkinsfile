pipeline {
    agent any
    stages {
        stage('Prepare Workspace') { // Optional stage for cleaning workspace
            steps {
                cleanWs()
            }
        }
        stage('Clone Repository') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/suss58/jenkins-and-docker.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install' // Adjust based on your project (e.g., Maven, Gradle, etc.)
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t my-docker-image:latest .' // Replace `my-docker-image` with your image name
            }
        }
        stage('Run Docker Container') {
            steps {
                echo 'Running Docker container...'
                sh 'docker run -d -p 3000:3000 --name my-container my-docker-image:latest' // Adjust ports and container name
            }
        }
    }
    post {
        always {
            echo 'Cleaning up Docker container...'
            sh '''
                docker stop my-container || true
                docker rm my-container || true
            '''
        }
        success {
            echo 'Build and deployment completed successfully!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
