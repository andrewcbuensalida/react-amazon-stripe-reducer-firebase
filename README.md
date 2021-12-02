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
borders use px
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
separate typography from layout
put tag selectors first, then class selectors.
bolder or strong tags jump to the next available font-weight while bold jumps to 700.
typography first, then big layout
almost every website, have this:
img{
    max-width:100%;
    display:block;
}
this is because images are by default inline, so it has a little bit of extra space at the end or something like that. a good reset to put on the top is:
* means select every element.
*{
    box-sizing:border-box;
}
body{
    margin: 0;
    color: #404040;
    font-family: 'Ubuntu', sans-serif;
    font-size: 1.125rem;
    font-weight: 300;
    line-height:1.6 //this means 1.6 times bigger than font size. this is inherited. 1 .4 is default.
}
use <main> for the central column, and <aside> for sidebar widgets.
in flexbox, margins dont collapse anymore in direct children.

===========================================================================
viewport meta tag
to prevent phones from shrinking the content even if we have media queries, include this in the head section of the document
<meta name="viewport" content="width=device-width, initial-scale=1">

=====================================================================
text-transform: uppercase       makes it all caps, 
text-transform: capitalize       makes the first letter of the words caps
letter-spacing: 1px               is the horizontal spacing
line-height: 1.6              is the vertical spacing

background-image ==============================================================
background-image if there's anything on top, if not, use image
syntax for background-image
background-image: url(myFolder/myImage.jpg);
by default, background-image tiles, aka repeats if the content is big enough. otherwise, the size of the image just fits the content.
these are useful:
background-position: center;
background-size: cover;

============================================================================
box-sizing:border-box         makes the sizes include the border and padding, not just the content
inputs by default are not border-box, buttons are not
pseudo classes, like :last-child only will apply if that element is the last child. it doesnt mean select the last child of that element.

h1 p { } means select all the p inside h1.
h1 > p { } means select the p's that are direct children of h1 BUT classes are better because what if markup changes
h1 + p { } means select the p if it is a sibling immediately after the h1
h1, p { } means select h1's and p's
h1 ~ p { } select all p's if it's a sibling to h1 and the p comes after

whenever you have a background image, suggested to have background color, just in case the image doesn't load, so you can see the text still if the text was white.
background image is always on top of background color.
dont make line width too wide. maky it around 530px.
larger screen sizes should have a little bit bigger font sizes, like 1.125rem

viewport===============================================================================
if you put a percentage for height, it doesnt work because the parent, if it's the body, is always changing, unless the parent(body) has an absolute value.
if height is too short, content will overflow. can set the overflow to scroll or hidden.
that's why setting height isn't usual.
75vh means 75% of the viewport height
vmin and vmax are weird. vmin is based on whatever is smaller, width or height.
if setting a 100vh, do min-height, not just height. so that if user squashes browser, image wont get too short.
if you're scrolling even if it's 100vh, probably because it's not box-sizing: border-box. that's because the size is not yet adding border and padding.

forms =========================================================================================
<label for="myNameID">Name:</label>
<input id="myNameID" type="text">
OR can wrap input inside label so don't need to have 'for'
button type="button" doesn't submit the form, but if there was no type, or the type was submit, it would submit.
value is what's inside the input. 
placeholder is inside the input but disappears once typing. 
and disabled
attribute selector is like input[type="text"] will only select inputs with attribute type of text
text properties arent inherited in forms so usually put this in forms:
input {
    font-family: inherit;
    text-align: inherit;
    border: 1px solid #404040;
    border-radius:5px;
}
==================================================================
gradients are actually background-images
syntax is 
background-image: linear-gradient(red,blue);    can replace linear with radial
this will make div on top red, going down blue.
(to right,red,blue) makes left red, right blue.
(45deg, red, blue) from lower left to upper right
(0deg, red, blue) from bottom to top. so the degrees goes clockwise
(to bottom right, red, blue)   from top left to bottom right
(90deg,red 75%, blue)    from left to right, will be pure red for 75% of the space and then will start to turn blue.
for buttons; rule of thumb, top and bottom padding should be smaller than left and right, so
.btn{
    display:inline-block;
    padding: .75em 1.5em;
    cursor:pointer;
    border:0;
    transform:scale(1.05)    makes it 150% bigger, but doesn't affect the flow, so other elements don't know it got bigger, but visually it did.
    transition: transform .25s
}
transition =============================================================================
can only transition some properties
it's basically how fast a property changes when hovering or clicking etc
transition: color 1s;           means whenever the color changes, take 1s.
there's also delay which is how long before it starts, and timing-function which is how it accelerates.
difference with animation is animation doesn't need user initiation.
put transition on the element's normal state, not it's hover state.

transform==================================================================
transform:translate()
transform:scale(1.5)      makes it 150% bigger, but doesn't affect the flow, so other elements don't know it got bigger, but visually it did.

===================================================================================
border-image: linear-gradient(to left, red, blue) 1;       borders can have a background-image as well. the 1 at the end means the image will stretch along the border, without the 1 means image will be on all 4 corners.

background blend mode ====================================================================
needs background-image and a background-color, or two background-images
background-blend-mode:multiply        keeps dark pixels
:screen           keeps light pixels
:overlay          keeps neutrals   ///not really used much

this is different from mix-blend-mode, which is the blending of the element and elements behind it. doesn't matter if it's siblings, or descendants. mix-blend-mode has to be applied to the element on the top. this is how to do knockout/cutout text. cant do that with background-blend-mode.
for a white background and text that has the image inside, element with text has to be on top, color:black, mix-blend-mode: screen, background-color:white. 
for a black background with the text with the image inside, text on top, background-color:black; color:white; mix-blend-mode:multiply;
mask-image only works on some browsers. so go for blend modes.
svg clip is more complicated.
background-blend-mode is between the background-image and the background-color within one element.
the background-image is sort of like a child of the element when it comes to z-index. that's why if sibling A has z-index of 100 and a background-image, and sibling B has z-index
position:absolute           turns block elements into inline
can combine background-image:url(...), linear-gradient(45deg,red,blue);

flexbox=================================================================================
if flex-wrap:nowrap     if there's too many, it will shrink to the size of the element including margin, then just overflow. 
if flex-wrap: wrap      it will go until the width of the container, then go to the next line.
flex-flow combines flex wrap and flex direction into one line.
justify-content: left is the same as flex-start, right as flex-end;
space-between is more used than space-evenly is more used than space-around.
default of align-items, the vertical height, is stretch.
align-items: baseline    aligns the first line of text.
justify-content is main axis, left and right, if default flex-direction which is row.
align-items is cross axis, up and down. this is at the row level.
align-content:center is the for all the contents rows as a whole if it were to wrap, itll be all in the middle vertically. less commmon to use this.
align-self:center   is placed in the actual element, not parent, to align itself wherever.
in each sibling, can put a flex:.2 , flex:.6, flex:.2 as long as it adds up to 1, signifies the proportion of extra space they take.
flex-grow:2 means itll grow twice the speed of an element that has flex-grow:1. default is 0, wont grow.
flex-shrink:2 means itll shrink twice as much as an element with flex-shrink:1. default is 1, but 0 wont shrink.
flex-basis is the ideal width, default is auto, means if there's no width, itll default to the content width, if there is a width, flex-basis will be the width. or can override it. this difference with width and flex-basis, is flex-basis is working on the main axis.
flex: combings the grow, shrink, basis. default is 0 1 auto.
flex: 1    is short for grow:1, flex-basis:0.
flex: auto   is short for grow:1 shrink:1 basis:auto.
a common pattern to put on a main thing is flex:1 0 auto.
in flex, margin-top and bottom auto will center vertically. 
when changing the flex-direction of an image, use flex-basis instead of width. but to fix the bug, have to include min-width:0 and min-height:0.
backgrounds on the body are misleading because they fill up the whole space. but border on the body just fills up the content, if height and width not defined.

grid ============================================================================





deploy simple life website, barbeque signup, and 