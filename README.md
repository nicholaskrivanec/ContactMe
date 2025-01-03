

where to find specific code.

### Root HTML

There are only one important HTML file in this project which is the base page around the application. It is a bit different from a default React project as you can find the skeleton HTML `index.html` in the root folder instead of `public`.

### CSS and images

`src/client/app.css`.

### Application

core frontend React application in `src/client`. Here you have a normal React setup with `index.js` as the glue that pieces the `.jsx` components together

### Backend

The backend logic is located under `src/server`. `src/server/index.js` is the main file handling the APIs. 

### Database
use [SQLite](https://www.sqlite.org/docs.html) database.  
The database file is called `database.db`. It is placed inside the `w3s-dynamic-storage` folder.  
SQLite connection path to the database is `w3s-dynamic-storage/database.db` which you can use to connect to the SQLite database programmatically.   
Database creation, queries, and database connection can be found in `db/index.js`.

---  
**Do not change the `w3s-dynamic-storage` folder name or `database.db` file name!**  
**By changing the `w3s-dynamic-storage` folder name or `database.db` file name, you risk the space not working properly.**
