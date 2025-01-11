pipeline {
    agent any
    stages {
        stage('Prepare Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/suss58/jenkins-and-docker.git'
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
                sh 'docker build -t jenkins-and-docker:latest .'
            }
        }
        stage('Run Docker Container') {
            steps {
                echo 'Running Docker container...'
                sh 'docker run -d -p 3000:3000 --name react-container jenkins-and-docker:latest'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up Docker container...'
            sh '''
                docker stop react-container || true
                docker rm react-container || true
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
