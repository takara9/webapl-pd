# ポッドのPDツール

Kubernetesにコンテナをデプロイした時に、ポッドのホスト名やIPアドレスを確認して、意図したとおりに、アクセスが分散されているかを確認したい時に利用できるツール。

ブラウザでアクセスする方法、および、REST-APIでアクセスする方法の２つのケースを提供する。






## コンテナのビルド方法

GitHubからクローンしてビルドする。

~~~
git clone ssh://git@github.com/takara9/webapl-pd
cd webapl-pd
docker build -t maho/pd-tools:0.1 .
docker run --rm -p 3000:3000 --name pd-tools maho/pd-tools:0.1
docker push maho/pd-tools:0.1
~~~


GitLabからCloneして




## Jenkinsのビルドパイプラインの構築

* GitLabのWeb画面から"Create New Project" -> "Import project" に進む
* 新規プロジェクトtkr/pd-tools:0.1 として、GitHubよりインポート。Privateプロジェクトにする。
* GitLabの認証情報(ユーザー名とパスワード）を登録する。

* Kubernetesにテスト用名前空間を作成しておく。
* 上記の名前空間をデフォルトにしたkubeconfigファイルを準備して、Jenkinsへ登録する。
* 






