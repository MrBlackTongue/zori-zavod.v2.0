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
                withCredentials([sshUserPrivateKey(credentialsId: 'my-ssh-key', keyFileVariable: 'sshKey')]) {
                    sh 'scp -i $sshKey -r build/* root@91.105.199.36:/var/www/zolotenkov/front'
                }
            }
        }
    }
}
