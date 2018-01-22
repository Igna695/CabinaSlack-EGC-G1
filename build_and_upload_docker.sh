#!/usr/bin/env bash

if [ "$TRAVIS_BRANCH" = "master" ]
	then
		docker build -t appbot .

		export DOCKER_ID_USER=egc1718

		docker login --username=egc1718 --password=madre1960

		docker tag appbot $DOCKER_ID_USER/appbot

		docker push $DOCKER_ID_USER/appbot

fi

if [ "$TRAVIS_BRANCH" = "develop" ]
	then
		echo "No es la rama master."



fi
