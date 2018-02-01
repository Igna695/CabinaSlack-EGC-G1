#!/usr/bin/env bash

if [ "$TRAVIS_BRANCH" = "master" ]
	then
		docker build -t bot_slack https://github.com/Igna695/CabinaSlack-EGC-G1

		DOCKER_ID_USER=$DOCKER_USER

		docker login --username=$DOCKER_USER --password=$DOCKER_PASSWORD

		docker tag bot_slack $DOCKER_ID_USER/bot_slack

		docker push $DOCKER_ID_USER/bot_slack

fi

if [ "$TRAVIS_BRANCH" = "develop" ]
	then
		echo "No es la rama master."



fi
