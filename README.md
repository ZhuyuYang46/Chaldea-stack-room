# Chaldea-stack-room
Instruction Document 
Starting front-end and back-end:
Front-end startup
Enter the front-end directory
 cd novel-app/frontend
Install dependencies (required for the first run or after code update)
 npm install
Start the development server 
npm run dev

Backend startup 
Enter the backend directory 
cd novel-app/backend
Install dependencies 
npm install
Configure database connection
Modify the username, password and database name in .env.
Make sure the MySQL service is running.
Create the database and perform migrations 
npx sequelize-cli db:create
npx sequelize-cli db:migrate
Start the backend service 
npm start
Registration and Login
Open the website, click on Register or Login in the upper right corner.
Register an account
Enter the Register page and fill in the prompts as follows:
Username 
Email 
Password 
Click on Sign up.
After success, you will be prompted with success or automatically redirected to the login page. 
Log in account
Enter the Login page, input the Email and Password, and click Login.
After a successful login, the login credentials (JWT) will be automatically saved and you will be redirected to the Novel List.
A Logout button and a welcome message will be displayed in the upper right corner, indicating that you are logged in. 
Log out
Click on the Logout button on the top right corner, and the local credentials will be cleared, returning to the unlogged-in state.
After logging in, you can access private pages (such as: novel list/details/chapters, favorites, tag management, creating/editing novels, etc.). 

Search 
- Entry location:
- Navigation bar or the top search/filter area on the Novel List page.
- Steps to use:
1) Enter keywords in the search box for searching.
2) If no matches are found, display "No novels found."
- Highlighted tag buttons indicate selection, multiple selections are allowed, and the filtering conditions will be automatically applied. 

Tag
Position: on the header
Add: Enter the name in the "New Tag Name" field and click "Create"
Delete: Click "Delete" on the tag list below Tag Management
Editor: Click on "edit" on the tag list below "Tag Management", then rename it and click "save".

Collect novels (Add and View)
Steps to add to favorites:
Open the details page of any novel.
Click the "favorite" button, and the button text will change to "Unfavorite".
After successful collection, you can view it on the "My Favorites" page.
View the collection list:
Enter the "My Favorites" page from the navigation bar .
The list will display all the collected novels, and you can click to enter the details page.
Click the "Unfavorite" button in the collection list to directly remove this collection. 

Add Chapter 
1) Open details page of novel, find “add Chapter”button
2)Fill in the chapter title and content (both are required) on the editing page.
3) Click "Create Chapter" to submit.
4) After success, you will be redirected back to the novel details page or the chapter reading page.
- Viewing and Reading Chapters:
Click on a chapter in the chapter list on the novel details page to enter the reading page.
- The top of the reading page provides three buttons 
- "← Return to Contents": Return to the novel details page.
- "← Previous ": Jump to the previous chapter (grayed out and unclickable when it's the first chapter).
- "Next →": Jump to the next chapter (grayed out and unclickable when it's the last chapter).

Add a novel (Create and select tags)
Entry location:
Navigation bar button “+ New Novel”
Steps to create a novel:
Enter the novel title, author, cover image URL, and summary.
Check one or more tags in the “Tags” area.
Click the “Create Novel” button to submit.