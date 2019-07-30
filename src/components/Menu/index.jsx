import React from 'react';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <div>
      <Link to={'/login'}>login</Link>
      <Link to={'/signup'}>signup</Link>
      <Link to={'/dashboard'}>dashboard</Link>
    </div>
  );
}
