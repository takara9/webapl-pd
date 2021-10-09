# コンテナのビルド方法


~~~
docker build -t maho/pd-tools:0.1 .
docker run --rm -p 3000:3000 --name pd-tools maho/pd-tools:0.1
docker push maho/pd-tools:0.1
~~~

