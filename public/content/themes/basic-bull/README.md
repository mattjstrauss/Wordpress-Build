Basic Bull
===

## Overview
The idea behind this theme is to create a scaleable base in which I can start from to customize and extend to meet the projects needs. It has some common features built in and is meant to be an always expanding and improving idea.



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

### Extended Features
* Pages/templates are created for custom user login, settings and registration incase the "Custom Login by Bull Interactive plugin" is enabled
* Front end display of the following admin UI:
  * Hidden WP admin bar with button toggle to show/hide
  * Log out, profile, user registration (If "Custom Login by Bull Interactive plugin" is active) and edit admin links 
* When the "Custom Login by Bull Interactive plugin" is active it is set up to prevent anyone from seeing the site unless logged in. It is currently set up as a gateway but can be altered to just create custom login screens.


### Components
* Tabs
* Accordion
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