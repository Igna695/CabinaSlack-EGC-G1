#!/usr/bin/env bash

if [ "$TRAVIS_BRANCH" = "master" ]
	then
		sudo docker build -t bot_slack https://github.com/Igna695/CabinaSlack-EGC-G1

		DOCKER_ID_USER=egc1718

		docker login --username=egc1718 --password=madre1960

		docker tag bot_slack $DOCKER_ID_USER/bot_slack

		docker push $DOCKER_ID_USER/bot_slack

fi

if [ "$TRAVIS_BRANCH" = "develop" ]
	then
		echo "No es la rama master."



fi
