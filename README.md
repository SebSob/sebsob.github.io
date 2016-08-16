# 'Aneom News' by Sebastien Albert

Result: http://adneom-news.sebsob.be/

### Development instructions

After you have cloned/downloaded this repo you only have to do a few things in order to start developing:

First, navigate to the root folder of the application and install the required dependencies by running the following command

```sh
$ npm install
```
This will install the node dependencies and place them in the root folder `/node_modules/`.

Then run the following bower command (make sure you have bower installed):
```sh
$ bower install
```
This will install the web dependencies and place them in the resources folder `/resources/bower_components/`.

The `/resources/` folder should have 3 folders:
* `/resources/sass/` : this is where all of the SASS (.scss) files are located
* `/resources/js/` : this is where all of the JavaScript (.js) files are located
* `/resources/bower_components/` : this is where all the external libraries are located (AngularJS, Bootstrap, jQuery,...)


Once you have all the dependencies, run the following command to 'build' the project
```sh
$ gulp
```
This will automatically run 3 tasks:
* `styles` task is responsible for compiling sass to css, autoprefix it, clean it and place it all in one file `public/css/main.css`.
* `scripts` task is responsible for concatenating all JavaScript files, minify it and place it all in one file `public/js/main.js`.
* `watch` task will automaticaly watch for changes in both `/resources/sass/` and `/resources/js/` folders and will run the necessary tasks.

SASS (CSS) and JavaScript changes are made in the `/resources/sass/` and `/resources/js/` folders.

HTML changes are directly done in the `/public/` folder where you can find an `index.html` and a folder `/partials/` with HTML templates used for this Adneom News application.

### Tech

*Adneom News* uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Gulp] - the streaming build system (+ other gulp modules)
* [SASS] - CSS with superpowers
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [jQuery] - cross-platform JavaScript library
* [FontAwesome] - Icons!
* 

   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
   [Sass]: <http://sass-lang.com/>
   [Fontawesome]: <http://fontawesome.io/>

Cheers,
Sebastien