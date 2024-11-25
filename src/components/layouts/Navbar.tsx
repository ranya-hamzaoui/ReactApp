import {Container,Nav,Navbar,Button} from 'react-bootstrap';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { logout } from '../../redux/reducers/authReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { canAccess } from '../../utils/utils';

function NavBar() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isConnected, user } = useAppSelector((state) => state.auth) as any;
  const navigation = [
      {
          path : '/home',
          index : 0,
          name : 'Home',
          current: pathname === "/",
          canAccess: canAccess(["ADMIN", "USER"], user.role)
      },
      {
        path : '/posts',
        index : 1,
        name : 'Posts',
        current: pathname === "/",
        canAccess: canAccess(["ADMIN", "USER"], user.role)
    },
    {
        path : '/users',
        index : 2,
        name : 'users',
        current: pathname === "/",
        canAccess: canAccess(["ADMIN", "USER"], user.role)
    }
  ]  
  const handleLogout=()=> {
    dispatch(logout())
    navigate('/')
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          { navigation.map((link, key) => (
            link.canAccess &&  (<Nav.Link as={Link} to={link.path} key={key}>
            {link.name}
          </Nav.Link> )
          ))}
        </Nav>
       {isConnected && (<div className="d-flex align-items-center">
         <div className="me-3">
           <span className="fw-bold">{user.name}</span>
         </div>
         <Button variant="outline-danger" onClick={handleLogout}>
           Logout
         </Button>
       </div>)}
      </Navbar.Collapse>
    </Container>
  </Navbar>
    )
}

export default NavBar;