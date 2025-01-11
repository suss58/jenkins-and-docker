pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-form:latest'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/suss58/jenkins-and-docker'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).run('-p 3000:3000')
                }
            }
        }
    }
}
