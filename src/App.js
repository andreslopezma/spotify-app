import React, { Fragment, useState } from 'react';
import NewRelase from './components/NewRealese';
import HeaderNav from './components/HeaderNav';
import Album from './components/Album';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {
  const [idAlbum, setIdAlbum] = useState('');
  return (
    <Fragment>
      <HeaderNav />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NewRelase
              setIdAlbum={setIdAlbum}
            />} />
            <Route path="/album" element={<Album
              idAlbum={idAlbum}
            />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </Fragment>
  );
}

export default App;