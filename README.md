# Project Build w/ Wordpress and Gulp.js

## Overview
The idea behind this project is to have a boilerplate setup and ready to go that uses my preferred/current workflow (The theme will have another README.md for theme specific functionality with all the animated gifs).

This one consists of keeping Wordpress's core isolated from the working files as a Submodule so that Wordpress can continue to be updated and not create extra bloat to a projects repository. 

The projects configuration is different as it allows the developer to create independent configuration files so that certain constants are in place. For example, the staging and production environments will most likely have similar configuration settings but everyone works in different environments locally. This allows the developer to set up their local environments  with different parameters and won't effect other developers throughout the process.

This workflow also use Gulp for automating certain tasks such as linting, autoprefixing and compiling my CSS and Javascript, while also constructing a SVG spritemap based off of individual SVG files located in the specified directory.



## Default Wordpress Plugins:
Below are some of the common plugins that I start with. The only real one that is "required" is ACF. Others simply extend certain commonly requested functions.
1. Advanced Custom Fields Pro: Used to customize and extend Wordpress' authoring capabilities
2. ACF to REST API: Used to expose ACF content to the Wordpress REST API
3. Custom Login by Bull Interactive: Used to brand the login screen
4. Custom TinyMCE Editor by Bull Interactive: Used to customize the built in WYSIWYG
5. iThemes Security: Used to offer an additional layer of security and preform scheduled database backups
6. Ninja Forms: Used to create simple forms
7. Regenerate Thumbnails: Used to regenerate images after custom images have been applied to the build
8. Search Everything: Used to extend Wordpress' core search functionality to include ACF content and modified returned results
9. Simple Page Ordering: Used to drag and drop page/post content for potential displays on the front end
10. Smush: Used to offer additional image optimization on upload
11. WP REST Filter: Used to extend the endpoints to allow filter queries
12. Yoast SEO: Used to extend the customization of SEO aspects

## Steps for getting Wordpress where it needs to be via the Terminal
1. If site folder exists proceed to step 2. If not follow the commands below:<br />
`cd PROJECT-ROOT/public/`
`mkdir site`
2. Traverse to the site folder within the projects directory<br />
`cd PROJECT-ROOT/public/site`<br />
3. Download the Wordpress files<br />
`curl -OL http://wordpress.org/latest.tar.gz`<br />
4. Unpack the files<br />
`tar xfz latest.tar.gz`<br />
5. Move the files to the root<br />
`mv wordpress/* .`<br />
6. Remove the leftovers<br />
`rm latest.tar.gz && rm -rf wordpress`

## Establish your host environment
1. Create/setup your host environment and url
2. Point the host to your `public` folder
3. Create your database

## Setup your environment's config file
1. Locate `wordpress.php` within `PROJECT-ROOT/config/` and assign the table prefix<br />
2. Locate your enivironment's config file within within `PROJECT-ROOT/config/servers` and apply your `WP_HOME` url and database credentials

## Working with [Gulp.js](https://gulpjs.com/)
1. Dependencies [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm)
> npm is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer.
2. Check that you have node and npm installed by running `node -v` and `npm -v` in your terminal
3. If the commant is not found install them using the links above and if it doesn't work in your project's folder, try installing them globally using your `sudo` commant

## Gulp Core Files
1. gulp.js
2. package.js
3. Node_modules (not created until gulp is installed by following below)

## Gulp Usage
1. To install you position yourself in the project folder by traversing via terminal using the cd command and install using npm by running the command below:<br />
`$ npm install`

2. To initially process javascript, sass and any gulp tasks found in the gulp.js file by running the command below:<br />
`$ gulp`

3. To watch javascript, sass and any gulp tasks found in the gulp.js file by running the command below:<br />
`$ gulp watch`

4. To add SVG’s to spritemap, drop any svg into the /src/svg folder. The name of the svg will become the id of the svg.<br />
> Make any changes such as fill="currentColor" to the svg inside of the /src/svg folder and Gulp will process.

## Gulp Task File Structure:

1. JavaScript<br />
`/src/lib/*.js` -> `/js/lib` -- Any standalone JavaScript file. Usually for polyfills or large libraries independent of the projects unique scripts.<br />
`/src/plugins/*.js` -> `/js/plugins.js` -- All files get concat, and minified into one plugins.js<br />
`/src/partials/*.js -> `/js/scripts.js` -- All files get concat, and minified into one scripts.js<br />

2. CSS<br />
`/src/css/*` -> `/css/style.css` -- All files get concat into one style.css<br />
`/src/css/admin`<br />
`/src/css/base`<br />
`/src/css/components`<br />
`/src/css/layouts`<br />
`/src/css/utilities`style.scss <br />

3. SVG<br />
`/src/svg/*.svg` -> `/img/spritemap.svg`<br />

Include SVG’s using via the code below:
``` html
<svg>
      <use xlink:href="PATH/img/spritemap.svg#FILE-NAME"></use>
<svg>
```
The FILE-NAME above should not include .svg at the end of it just as it is above.


## Ignored from this repository are the following
- *~
- *.keep
- .DS_Store
- .sass-cache
- _assets
- node_modules
- bkp
- bkp/
- bkp/*
- css/config.rb
- scss/.sass-cache
- scss/.sass-cache/*
- public/site/* (Wordpress Core)
