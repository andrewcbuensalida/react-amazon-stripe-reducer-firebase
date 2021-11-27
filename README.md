https://www.youtube.com/watch?v=RDV3Z1KCBvo

setup a firebase project, and create database firestore, and enable authentication.

to deploy front end to firebase:
install firebase cli with : npm i -g firebase-tools
firebase login
firebase init
select hosting
select project on firebase
public directory? build
selected auto deploy with github
then firebase deploy

after 24 hours, ssl should be good.

couldnt get github auto deploy to work

workflow is npm run build, then firebase deploy
