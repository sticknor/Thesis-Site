// React
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Menu(props) {
  const { menuItems, siteTitle } = props;

  return (
    <div id="menuContainer">
      <div id="menu">
        <Link className="menuOption clickable homeMenuOption" to={'/'}>
          {siteTitle}
        </Link>

        {menuItems.map((menuItem, index) => {
          if (menuItem.showInMenu) {
            return (
              <Link
                className="menuOption clickable"
                to={menuItem.pageRoute}
                key={`menu-${menuItem.pageRoute}`}
              >
                <>
                  <span className="menuOptionTitle">
                    {menuItem.pageTitle}
                  </span>
                  {menuItem.pageSubtitle &&
                    <>
                      <br />
                      <span className="menuOptionSubtitle">
                        {menuItem.pageSubtitle}
                      </span>
                    </>
                  }
                </>
              </Link>
            );
          } else {
            return null;
          }
        })}
      </div >
    </div >
  );
}

Menu.propTypes = {
  siteTitle: PropTypes.string,
  menuItems: PropTypes.array,
}

export default Menu;
