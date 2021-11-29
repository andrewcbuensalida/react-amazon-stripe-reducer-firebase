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

for firebase functions:
firebase init
choose functions
this will create functions folder
inside this folder theres node_modules and package.json

Access to XMLHttpRequest at 'https://us-central1-clone-b8548.cloudfunctions.net/api/payments/create?total=0' from origin 'https://amazon.anhonestobserver.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
This doesnt seem to affect the app. but if you want to remove this error, maybe in functions, instead of send(), do json() as a response.

CSS RESPONSIVE DESIGN:======================================================
laptop widths are 1200px, heights are 700px.
large mobile is 400px, height 800px
inline elements are not affected by width and height, slightly with padding, horizontally with margin. if you want it to be affected, should be inline-block.
put google fonts link including preload before the css link
a tags inherit font size and weight but not other properties like color because they have default styles, same thing for headers.
percentage are mainly userd for widths, they are relative to the parent. height is sometimes based on width.
for responsive, use max-width to prevent something from getting too big.
if there's a width and a max-width, it gets the lower value.
for width, use em or %
for font-size, use rem. to prevent exponential.
em are relative to PARENTS font size while rem are relative to the ROOT which is html{}
1.5rem = 150%
default on browsers is 16px font-size.
padding and margin use em.
