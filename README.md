WorldCup2014Dashboard
===============
A World Cup 2014 Brazil Dashboard. Use AngularJS library. 

## [Demo](http://northerneyes.github.io/WorldCup2014Dashboard)
A demo is available on the Github Pages [here](http://northerneyes.github.io/WorldCup2014Dashboard)

## Setup
````
npm install
bower install
gulp
````

## App Structure
An app structure of this project is modularized into very specific functions. 

### index.html

The index.html lives at the root in app folder of front-end structure. The index.html file will primarily handle loading in all the libraries and Angular elements.

### Assets folder
The assets folder is pretty standard. It will contain all the assets needed for the app that are not related my AngularJS code.

### Components and shared folders
We have two subfolders in here and a couple JavaScript files at the root of the folder. The app.module.js file will handle the setup of my app, load in AngularJS dependencies and so on. 

The components folder will contain the actual sections for our Angular app. These is the static views, directives and services for our specific section of the site. Each page should have it’s own subfolder with it’s own controller, services, and HTML files. Each component here will resemble a mini-MVC application by having a view, controller and potentially services file(s). It's like multiple mini Angular applications inside of our giant Angular application. For now it is only one page - home.

The shared folder contain the individual features that our app have. In our case it group and scroll directive, providers for our app and some utils, like a underscore. These features we want to reuse on multiple pages.