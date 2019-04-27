# A free, fast, and easy-to-edit portfolio website for artists and designers.

* Simply designed to showcase your work 
* Fast and repsonsive on desktop and mobile
* Simple setup 
* Easily updated via Google Sheets
* Code is free to use and edit without attribution

## Sample Sites
 * [https://samt.work](https://samt.work) ([source](https://docs.google.com/spreadsheets/d/1rvivc9pnHCLM84f4JuXdvfaah-XlbHpvQ_ORprPTJLg/edit?usp=sharing))
 * [Portfolio Site example]() ([source](https://docs.google.com/spreadsheets/d/1CqeQA0AkN-1WGU28zhnaJbBr5f4gZfaTE8TW3mmB7Q4/edit?usp=sharing))
 
*If you use this project to build your site, please [let me know](srticknor@gmail.com) so I can add it here!*

## Requirements
Having some knowledge of web programming can be helpful for customizing your site and troubleshooting.
However, all that's REQUIRED is:
* [A GitHub account](https://github.com/)
* [A Google account](https://accounts.google.com/)
* Your images and videos hosted on the web (Flickr, Imgur, YouTube, Vimeo, GitHub, etc...)

## Instructions

### 1. Fork Repo
Click the 'Fork' button in the top right corner of this project page. Then, select the GitHub account where you will keep the repo for your portfolio site.

### 2. Build Site In Google Sheets
Your Google Sheet will contain the site plan for your website. Menus, layouts, and content will be generated based on what you put into the sheet. Copy this [starter sheet](https://docs.google.com/spreadsheets/d/1CqeQA0AkN-1WGU28zhnaJbBr5f4gZfaTE8TW3mmB7Q4/edit?usp=sharing) into your own Google account. 

#### 2a. Editing The Google Sheet

Each tab of the Google Sheet will become a menu option in your website. Menu items can have subitems, and be built accodring to the following tempaltes availabe:

You will need to follow the templates closely in order for your site to render properly:
##### Splash
##### Carousel
##### Grid
##### Scroll
##### About
##### DETAILS
##### ARCHIVE

#### 2b. Verify / Format The Google Sheet

#### 2c. Publish Google Sheet
Go to your Google Sheet and click `File -> Publish to the web...`. Publish the entire document then close this dialogue. 

### 3. Add Sheet ID To Your Repo 
* Your Sheet ID can be found in its URL. Look for the string of numbers and letters between `https://docs.google.com/spreadsheets/d/` and `/edit....`. For example, my Sheet URL is `https://docs.google.com/spreadsheets/d/1rvivc9pnHCLM84f4JuXdvfaah-XlbHpvQ_ORprPTJLg/edit#gid=541725311`, so my Sheet ID is `1rvivc9pnHCLM84f4JuXdvfaah-XlbHpvQ_ORprPTJLg`
* Go to your portfolio site repo and open `index.html`
* Add your Sheet ID to line 26 `var site = new Site(sheetID="YOUR SHEET ID HERE");`
* Commit your changes

### 4. Publish Site With GitHub Pages

### 5. Adding A Custom Domain (Recommended - Not Required) 

