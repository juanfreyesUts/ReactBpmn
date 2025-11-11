import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <ul className='nav'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/viewer">Viewer</Link>
        </li>
        <li>
          <Link to="/modeler">Modeler</Link>
        </li>
      </ul>
    </nav>
  )
}
