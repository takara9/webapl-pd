pipeline {

  environment {
    registry = "harbor.labo.local/tkr/webapl-pd"
    dockerImage = ""
    KUBECONFIG = credentials('webapl-pd-ns')
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
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
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
        }
      }
    }

    stage('K8sクラスタへのデプロイ') {
      steps {
        script {
          sh 'kubectl cluster-info --kubeconfig $KUBECONFIG'
          sh 'sed s/__BUILDNUMBER__/$BUILD_NUMBER/ deploy.yaml > webapl-pd.yaml'
          sh 'kubectl apply -f webapl-pd.yaml --kubeconfig $KUBECONFIG'
        }
      }
    }

  }
}


