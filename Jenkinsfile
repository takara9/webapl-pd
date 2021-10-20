pipeline {

  environment {
    registry = "harbor.labo.local/tkr/webapl-pd"
    dockerImage  = ""
    dockerImage2 = ""    
    KUBECONFIG = credentials('test-k8s1-webapl-pd')
  }

  agent any
  stages {

    stage('GitLabからソースコード取得') {
      steps {
        echo 'Notify GitLab'
        updateGitlabCommitStatus name: 'build', state: 'pending'
        updateGitlabCommitStatus name: 'build', state: 'success'
      }
    }

    stage('コンテナイメージのビルド') {
      steps {
        script {
          dockerImage  = docker.build registry + ":$BUILD_NUMBER"
          dockerImage2 = docker.build registry + ":latest"
        }
      }
    }

    stage('コンテナイメージの脆弱性検査') {
      steps {
        script {
          sh 'echo "check 1"'
        }
      }
    }


    stage('コンテナの単体テスト') {
      steps {
        script {
          sh 'echo "check 2"'
        }
      }
    }


    stage('コンテナレジストリへプッシュ') {
      steps {
        script {
          docker.withRegistry("https://harbor.labo.local","harbor") {
            dockerImage.push()
          }
          docker.withRegistry("https://harbor.labo.local","harbor") {
            dockerImage2.push()
          }
        }
      }
    }

    stage('K8sクラスタへのデプロイ') {
      steps {
        script {
          sh 'kubectl cluster-info --kubeconfig $KUBECONFIG'
          #sh 'sed s/__BUILDNUMBER__/$BUILD_NUMBER/ deploy.yaml > webapl-pd.yaml'
          sh 'kubectl apply -f webapl-pd.yaml --kubeconfig $KUBECONFIG'
        }
      }
    }

  }
}


