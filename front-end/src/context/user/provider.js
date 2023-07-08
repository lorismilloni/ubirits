import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import UserContext from './context';

function UserProvider({ children }) {
  const [user, setUser] = useState([]);

  const value = useMemo(() => ({
    user,
    setUser,
  }), [user]);

  return (
    <UserContext.Provider value={ value }>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;
