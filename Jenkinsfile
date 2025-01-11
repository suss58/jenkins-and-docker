pipeline {
    agent any
    stages {
        stage('Prepare Workspace') { 
            steps {
                echo 'Cleaning the workspace...'
                cleanWs()
            }
        }
        stage('Clone Repository') {
            steps {
                echo 'Cloning the repository...'
                git branch: 'main', 
                    url: 'https://github.com/suss58/jenkins-and-docker.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh '''
                    # Ensure Node.js and npm are installed
                    node --version || echo "Node.js not found!"
                    npm --version || echo "npm not found!"
                    # Install dependencies for the project
                    npm install
                '''
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh '''
                    # Build Docker image with a specific tag
                    docker build -t jenkins-and-docker:latest .
                '''
            }
        }
        stage('Run Docker Container') {
            steps {
                echo 'Running Docker container...'
                sh '''
                    # Stop and remove any existing container with the same name
                    docker stop my-container || true
                    docker rm my-container || true
                    # Run the new Docker container
                    docker run -d -p 3000:3000 --name my-container jenkins-and-docker:latest
                '''
            }
        }
    }
    post {
        always {
            echo 'Post-build actions: Cleaning up resources...'
            sh '''
                # Stop and remove the container after the build
                docker stop my-container || true
                docker rm my-container || true
            '''
        }
        success {
            echo 'Build and deployment completed successfully!'
        }
        failure {
            echo 'Build or deployment failed. Check logs for details.'
        }
    }
}
