# CMFP-Press

CMFP-Press is a **CRUD application** built with **React.js** and **Redux** for state management. It uses **JSON Server** to mock a REST API for managing press content.

## Features

- **CRUD Operations**: Create, read, update, and delete press content.
- **State Management**: Managed efficiently with Redux.
- **Mock API**: Data served using JSON Server.

## Tech Stack

- **Frontend**: React.js, Redux
- **Backend (mock)**: JSON Server
- **Data**: Stored in `db.json`

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mohamedkardidi/cmfp-press.git
   cd cmfp-press
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the mock API**:

   ```bash
   json-server --watch db.json --port 3002
   ```

4. **Run the React app**:

   ```bash
   npm start
   ```

Access the app at `http://localhost:3001` and the API at `http://localhost:3002`.

## Project Structure

```
CMFP-PRESS/
├── public/              # Public assets
├── src/                 # Application source code
│   ├── actions/         # Redux actions
│   ├── components/      # UI Components
│   ├── reducers/        # Redux reducers
│   ├── App.js           # Main component
│   ├── store.js         # Redux store
│   └── index.js         # React entry point
├── db.json              # JSON Server data
├── LICENSE.txt          # Project license
└── package.json         # Project metadata
```

## License

This project is licensed under the [MIT License](LICENSE.txt).