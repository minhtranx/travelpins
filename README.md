<h1><a href="https://travelpins.netlify.app/">https://travelpins.netlify.app/</a></h1>

## This file will be updated later. I'm too lazy ;).

### Tech Stacks

-   [React v16.8](https://facebook.github.io/react/) with [Hooks](https://reactjs.org/docs/hooks-intro.html), useContext & useReducer.
-   [React Router 4 (HashRouter)](https://reacttraining.com/react-router/) for declarative browser + server routes.
-   [Mapbox](https://www.mapbox.com/) for free geo/map APIs.
-   [Material-UI](https://material-ui.com/) for styling.
-   [Apollo Server & Client](https://www.apollographql.com/docs/react/) for GraphQL communications, including GraphQL Subscriptions for real time data.
-   MongoDB hosted FREE by [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), models & queries handled by [Mongoose](https://mongoosejs.com/).
-   [Cloudinary API](https://cloudinary.com/) for images upload/storage.
-   Authentication with [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2).
-   App Server is hosted FREE on [Heroku](https://heroku.com/), so it will be slow on first load. Don't judge me.
-   App Client is hosted FREE on [Netlify](https://www.netlify.com/).

### User Guide

-   Login to https://travelpins.netlify.app/ with your Google account.
-   [Optional] Allow browsers to identify your location.
-   Click anywhere on the map to add a Pin with Title, Content and an Image, then Save.
-   You can add/delete your own pins.
-   You can add comments to other users' pins.

### User Guide - Real time experience with GraphQL Subscriptions

-   Open a different browser and login with a different Google account.
-   You can add/delete your pins and your other browser/account will see the pins removed immediately.
-   You can add comments and your other browser/account will see the comments immediately and vice versa.

### Pin Colors

-   <span style="font-weight:bold;color:red;">RED</span> Pin is your current location.
-   <span style="font-weight:bold;color:green;">GREEN</span> Pins are the recently added pins in the last 30 minutes.
-   <span style="font-weight:bold;color:blue;">BLUE</span> Pins are the ones that have been added more than 30 minutes.
-   <span style="font-weight:bold;color:pink;">PINK</span> Pins are draft pins that have not been submitted yet.

### Development Guide

-   TBD.

### Deployment Guide

-   TBD.

### TO-DO(s)

-   Upgrade NPM packages and resolve unmet/peer dependencies.
-   Remove unused NPM packages.
