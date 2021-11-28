https://www.youtube.com/watch?v=RDV3Z1KCBvo

setup a firebase project, and create database firestore, and enable authentication.

to deploy front end to firebase:
install firebase cli with : npm i -g firebase-tools
firebase login
delete the existing firebase config files from the clone
firebase init
select hosting
select project on firebase
public directory? build
single page app yes
npm run build
go to firebase console, upgrade to blaze plan because using firebase functions
then firebase deploy
now add a custom domain. set it up in aws route 53.

after 24 hours, ssl should be good.

couldnt get github auto deploy to work

workflow is during development, npm run start in the root folder for the front end, then npm run serve in the functions folder to emulate cloud functions but locally. this will give a link to the emulator, then change axios base url to that one. this still hits the firestore and stripe api.
when ready to deploy, npm run build, then firebase deploy if changed the front and back end.
if just the front end, firebase deploy --except functions. if just backend, firebase deploy --only functions.

stripe:
go in functions folder, then npm run deploy. this runs firebase deploy --only functions.
it will give you a function URL. copy paste into axios.js
in the stripe console, publishable key can be made public, but not the secret key.
