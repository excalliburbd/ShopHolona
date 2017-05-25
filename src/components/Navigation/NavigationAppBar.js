import React from 'react';
import classNames from 'classnames';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';

import logo from '../../assets/images/logo/logo.png';

import './NavigationAppBar.css';

const NavigationAppBar = ({
  searchbar,
  history,
  location,
  hideSearchbar,
  userLoggedIn,
  handleSignOut,
  showSearchbar,
  handleSignIn,
  shopName,
  userImg,
  refCode,
}) => {

  const navTitleClass = classNames({
    'NavigationAppBar-title': true,
    'NavigationAppBar-title--hidden': searchbar,
  })

  const searchbarClass = classNames({
    'Searchbar': true,
    'Searchbar--hide': !searchbar,
  })

  return (
    <AppBar className="NavigationAppBar"
              title={
                <span className={ navTitleClass }>
                  <span>{ shopName }</span> <br />
                  <span>{ refCode }</span>
                </span>
              }
              leftIcon={
                <Avatar
                  className="NavigationAppBar-logo"
                  title="Shop_logo"
                  image={ logo }
                   />
              }
              onLeftIconClick={
                () => history.push('/')
              }
              fixed >
            <Autocomplete
              className={
                searchbarClass
              }
              placeholder="Search"
              id="search"
              value={''} >
              <IconButton
                icon='clear'
                onClick={ () => hideSearchbar() }
                className="NavigationAppBar-searchbar--close" />
            </Autocomplete>

            <Navigation type="horizontal" className="NavigationAppBar-right-comp">
              <IconButton
                className="NavigationAppBar-search--button"
                onClick={
                  () => showSearchbar()
                }
                icon='search'
              />

              <div className="NavigationAppBar-rewards">
                <h2>Money 0.00</h2>
              </div>

              <IconMenu icon="card_giftcard" className="NavigationAppBar-GiftPoint">
                <MenuItem value='money' caption='Money 0.00' />
              </IconMenu>

              {
                (location.pathname === '/') ?
                  <IconButton className="NavigationAppBar-cart" icon='shopping_cart' /> :
                  <IconButton disabled />
              }

              <IconMenu icon={
                          (userImg) ?
                            <Avatar title="user image" image={ userImg }/> :
                            'account_circle'
                        }
                        position='topRight'
                        className="NavigationAppBar-profile-menu"
                        iconRipple={ false }
                        menuRipple={ false } >
                {
                  (userLoggedIn) ?
                    <div className="NavigationAppBar-profile-menuitem">
                      <MenuItem value='dashboard'
                        icon="dashboard"
                        onClick={() => history.push('/dashboard')} caption='Dashboard' />
                      <MenuItem value='profile'
                                icon='profile'
                                caption='Profile' />
                      <MenuItem value='settings'
                                icon='settings'
                                caption='Settings'
                                onClick={() => history.push('/settings')} />
                      <MenuDivider />
                      <MenuItem value='signout'
                        icon='signout'
                        onClick={ () => {
                          handleSignOut();
                          history.push('/');
                        }}
                        caption='Sign Out' />
                    </div > :
                    <div className="NavigationAppBar-profile-menuitem">
                      <MenuItem value='signin'
                                icon='account_circle'
                                onClick={ handleSignIn }
                                caption='Sign In/Sign Up' />
                    </div>

                }
              </IconMenu>
            </Navigation>
      </AppBar>
  );
}

export default NavigationAppBar;
