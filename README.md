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
units=================================================================
a tags inherit font size and weight but not other properties like color because they have default styles, same thing for headers.
percentage are mainly used for widths, they are relative to the parent. height is sometimes based on width.
for responsive, use max-width to prevent something from getting too big, like on images, containers,
if there's a width and a max-width, it gets the lower value.
for width, use em or %
for font-size, use rem. to prevent exponential.
em are relative to PARENTS font size while rem are relative to the ROOT which is html{}
but if it's a different property other than font-size, such as padding, em are relative to the font size of the element itself.
1.5rem = 150%
default on browsers is 16px font-size.
padding and margin use em.
use % if you know how many total columns and dividing divs among it
flex=====================================================================
normally, divs will have 100% width of the container (even if we set width to less than 100%) and stack vertically, but with display flex, theyll be side by side horizontally, and width will only be it's content, and the height will be 100%.
if you do align-items:flex-start, the height will shrink to fit content only
<selector>:last-child applies to the last of the that selector, not the last child that's a child of that selector.
usually have margin: 0 on the body
to change the width of columns, could do the bootstrap way of giving a column a class col-2 which means it takes 50% of the container assuming total number of containers is 4. col-3 would take 75% of the container.
or give it flex:.25 for a width of 1 column, flex:.5 for a width of 2 columns, etc again assuming total columns is 4.
media query==================================================================
if doing mobile first,
@media (min-width:650px){
    <!-- desktop styling -->
}
note that the bigger min-width is below smaller one to work
if doing desktop first, do this below the desktop styling. media queries always after the selector that you want to change.
@media (max-width:675px){
    <!-- mobile styling -->
    .column{
        flex-direction:column
    }
    .col{
        90%
    }
}
==============================================================================
always have a a:focus if you have a a:hover