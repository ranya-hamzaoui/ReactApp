import React from "react";
import '../../styles/dashborad.css'
import '../../styles/globals.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/reducers/authReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { canAccess } from '../../utils/utils';
function SideBar({ collapsed }: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isConnected, user } = useAppSelector((state) => state.auth) as any;
  const navigation = [
    {
      path: '/home',
      index: 0,
      name: 'Home',
      icon: 'house-door',
      current: pathname === "/",
      canAccess: canAccess(["ADMIN", "USER"], user.role)
    },
    {
      path: '/posts',
      index: 1,
      name: 'Posts',
      icon: 'person',
      current: pathname === "/",
      canAccess: canAccess(["ADMIN", "USER"], user.role)
    },
    {
      path: '/users',
      index: 2,
      name: 'users',
      icon: 'gear',
      current: pathname === "/",
      canAccess: canAccess(["ADMIN", "USER"], user.role)
    }
  ]
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <>
      <div className={`sidebar-modern ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!collapsed && <h4>My Dashboard</h4>}
        </div>
        <nav className="sidebar-nav">

          {navigation.map((link, key) => (
            link.canAccess && (
              <Link to={link.path} className="nav-link">
                <i className={`bi bi-${link.icon}`} ></i>
                {!collapsed && <span>{link.name}</span>}
              </Link>
            )
          ))}
          <a onClick={handleLogout} className="nav-link">
            <i className="bi bi-box-arrow-right"></i>
            {!collapsed && <span>Logout</span>}
          </a>
        </nav>
      </div>
    </>
  );
};

export default SideBar;