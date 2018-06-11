Basic Bull
===

## Overview
The idea behind this theme is to create a scaleable base in which I can start from to customize and extend to meet the projects needs. It has some common features built in and is meant to be an always expanding and improving idea.

I utilize ACF Pro's local JSON feature which saves field group and field settings as .json files within your theme. The idea is similar to caching, and both dramatically speeds up ACF and allows for version control over your field settings! 

The idea is that I can build components in chuncks while versioning each and expanding on them as necessary.

I build each component individually, make it inactive and then when its ready I "clone" it inside of a Flexible Content Field to allow for a modular based template that can be ordered however the publisher sees fit.

There is still a lot that needs to be done. I need to create a more stripped down version that is way more optimized but that will come next. This prototype is strictly for progress demonstration purposes.

#### Multi-level Push Nav w/ Breadcrumbs and Barba.js
![Multi-level Push Nav w/ Breadcrumbs and Barba.js](http://bullinteractive.co/img/multilevel-push-menu.gif)
#### Theme and Publishing Utilities
![Theme Utilties w/ User Management Capabilities](http://bullinteractive.co/img/theme-utilities.gif)
#### Custom Login User Flow
![User Workflow](http://bullinteractive.co/img/user-management-flow-reduced.gif)
#### Components - General w/ Background Video, Share and Tabs
![Components](http://bullinteractive.co/img/menu-general-tab-reduced.gif)
#### Components - WYSIWYG Format Options and Accordion
![Components](http://bullinteractive.co/img/wysiwyg-formatting-accordion-reduced.gif)
#### Components - Custom Audio Player and Image Carousel
![Components](http://bullinteractive.co/img/slick-images-audio-general-reduced.gif)
#### Components - Text Carousel and Custom Embed Video Styling w/ Plyr
![Components](http://bullinteractive.co/img/slick-text-video-styling-finish-reduced.gif)

### General Features
* Customizable Wordpress dashboard to include widgets to offer some website onboading
* Customizable backend menu item names and order based on user role permissions to offer more clarity (to remove/edit these features locate the custom-admin-menu.php file)
* Customizable branding moments that override Wordpress' defaults such as the login screen logo, small logo at the top and the footer text/link as well as create a branded color pallete for all of the UI
* Page View field that is displayed on the backend to use to determine what "poplular" content is. It can be used for insights or to query content. For example, you can have a "popular pages" section that uses these page counts. They can also be reset invidually or bulk edited.
* Scalable and reusable components with various visual options built with ACF Pro
* Improved formatting of iFrame content upon placing the code in the WYSIWYG by programatically wrapping them in a div
* Improved WordPress images w/ caption shortcode to make the markup have better accessibility
* Custom user role creation and user role capabilities to allow for an adjusted level of permissions beyond the default. The purpose for this is to offer a level of restrictions for certin Wordpress admin areas
* Improved formatting for WYSIWIG text styles to allow for simpler content authoring as well as more flexibility. The following is what is currently in place:
  * Stripped down buttons to remove certain formats (blockquote, spellchecker, superscript, subscript, charmap, wp_more, wp_adv, undo, redo, dfw).
  * Added custom format dropdown with the following:
    * Modified labels for the h1-h6
    * The ability to change the type of ul or ol to show different marks such as squares, roman numerals, etc.
    * The ability to make inline links buttons and change the style of links in general
    * Add a different method to incorporate blockquote with "cites"
    * The ability to format Q & A content (temporaray)
    * Change the fonts between serif and sans serif
  * Added the ability to include tool tips within the content
  * Added a forground color button with stripped down options to limit the user from going off brand
* Custom navigation class to adjust markup to make it more semantic and accessible


### Extended Features
* Pages/templates are created for custom user login, settings and registration incase the "Custom Login by Bull Interactive plugin" is enabled
* Front end display of the following admin UI:
  * Hidden WP admin bar with button toggle to show/hide
  * Log out, profile, user registration (If "Custom Login by Bull Interactive plugin" is active) and edit admin links 
* When the "Custom Login by Bull Interactive plugin" is active it is set up to prevent anyone from seeing the site unless logged in. It is currently set up as a gateway but can be altered to just create custom login screens.
* Incorporating barba.js which focuces on PJAX (aka push state ajax) to enhance the user's experience (Still a work in progress)
* Multi-level push navigation with dynamic breadcrumbs (Still a work in progress)
* Component specific layout and appearance options
* On theme activation, create Home and Blog page and assign them to the front and posts page
* Custom post type and custom taxonomy classes to quickly create new content types


### Components 
* Tabs
* Accordions
* Carousel(s)
  * Text
  * Image
  * Video (Coming soon)
* Share Modal
* Media Players (Local or embeded)
  * Audio (Local can be branded with CSS)
  * Video (Both local or embeded can be branded with CSS utilizing [https://plyr.io]Plyr)
* Google Map(s)
  * Location information is dynamically injected within the backend upon map change
  * Style can be custmomized via js/partials/maps.js

### Component Options (Options vary per comonent)
* Background Image
  * Color overlay option
  * Background position for focal point adjustments
* Background Video
  * Local or embeded video
  * Embedded video poster image override
* Background Color
* Spacing
  * Top and bottom (Default, Small, Medium or Large)

### ACF Flexible Content Fields with the following components and options

* Tabbed sections for organization. By default all components have a "Overview" tab to over a description and authoring instructions and a "Styles" tab to adjust certain visuals specific to the component itself.
* A text input field used to replace/overrides the components label for better readability when authoring content. For example, if you would like to add a "Accordion" component you can create you own label for it that may be contextual so that when you adding other content you can determine what the intended usage of the accordion is without having to review the content within it.
* Changed "Add to gallery" button text with the gallery to say Add Image(s) and remove the "No Image Selected" text on single image fields