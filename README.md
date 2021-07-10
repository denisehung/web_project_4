# Web Project 4 - Around The U.S.

## Intro

This project is part of the Practicum Web Development bootcamp (sprint 4 to 9). It's an interactive page called 'Around The U.S.' where users can add, remove and like image cards. The webpage is fully responsive and created with HTML, CSS and JavaScript (Object Oriented Programming). The BEM methodology has been applied to structure both CSS and project files.

The website appearance corresponds with the [design specs](https://www.figma.com/file/SurN1jaeEQIhuZEDMhmWWf/Sprint-4%3A-Around-The-U.S.-%7C-desktop-%2B-mobile?node-id=0%3A1) provided in Figma.

[**View live project here**](https://denisehung.github.io/web_project_4/) :rocket:

## Project description
* The page consists of image cards which are rendered from an API server, shared with other students. New cards can be added by submitting a popup form that requires a title and an image URL as inputs. When the user clicks on the card, a modal window with full size image and image caption will open.
* Each card has a like button and a like counter that keeps track of the number of likes. Cards can also be unliked.
* Only cards that were added by the user itself can be deleted. A bin icon is displayed on these cards; clicking on this icon will open a modal window to confirm if the user wants to delete the card.
* The user can change profile information (profile image, name and description) by submitting the edit form. 
* Form validation is implemented on each form. This is done with JavaScript by assessing the ValidityState of the inputs rather than using the browser built-in form validation.
* Changes on the page (e.g. adding/deleting card, editing profile) were managed with Fetch API, a promise-based JavaScript API for making asynchronous HTTP requests in the browser.
* Object Oriented Programming has been applied by using separate classes for the popups, user info, form validation and card components.
* The project was built and bundled with Webpack, including the use of Babel and PostCSS.


## Used technologies

The project is created with:

* HTML
* CSS
* JavaScript (ES6)
* Flexbox
* Grid
* BEM
* API
* Webpack
* Babel
* PostCSS
