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
                // Install npm dependencies
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                // Run tests with Jest
                sh 'npm test -- --coverage'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                // Build the Docker image
                sh 'docker build -t react-app .'
            }
        }
        stage('Run Docker Container') {
            steps {
                echo 'Running Docker container...'
                // Run the container with the specified port and container name
                sh 'docker run -p 3000:3000 --name react-app-container -d react-app'
            }
        }
    }
    post {
        always {
            // Clean up or perform notifications if needed
        }
        success {
            // Actions to take when the build is successful
        }
        failure {
            // Actions to take if the build fails (e.g., send notifications)
        }
    }
}
