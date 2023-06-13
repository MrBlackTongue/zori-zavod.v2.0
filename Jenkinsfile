pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'scp -r build/* root@91.105.199.36:/var/www/zolotenkov/front'
            }
        }
    }
}
