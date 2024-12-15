import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import EditItemForm from './components/EditItemForm';
import Header from './components/Header';
import LocalNews from './components/LocalNews';
import GlobalNews from './components/GlobalNews';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/add" element={<AddItemForm />} />
          <Route path="/edit/:id" element={<EditItemForm />} />
          <Route path="/local-news" element={<LocalNews />} />
          <Route path="/global-news" element={<GlobalNews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
