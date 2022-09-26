import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';

function Profile() {
  return (
    <div>
      <Header title="Profile" disabledSearch={ false } />
      <Footer />
    </div>
  );
}

export default Profile;
