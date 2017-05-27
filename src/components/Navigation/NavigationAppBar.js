import React from 'react';
import classNames from 'classnames';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';

import FaBarChart from 'react-icons/lib/fa/bar-chart';

import Searchbar from './Searchbar';

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
  vendor,
  profilePic,
}) => {

  const navTitleClass = classNames({
    'NavigationAppBar-title': true,
    'NavigationAppBar-title--hidden': searchbar,
  });

  const windowLocation = window.location;

  return (
    <AppBar className="NavigationAppBar"
              title={
                <span className={ navTitleClass }>
                  <span  className="NavigationAppBar-title--shopname" >{ shopName }</span> <br />
                  {/*<span  className="NavigationAppBar-title--ref" >{ refCode }</span>*/}
                  <span  className="NavigationAppBar-title--ref" >REF: CZ-001</span>
                </span>
              }
              leftIcon={
                <img className="NavigationAppBar-logo" src={logo} alt="Shop logo"/>
              }
              onLeftIconClick={
                () => windowLocation.assign('http://demo.shophobe.com/')
              }
              fixed >
            {/*<Autocomplete
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
            </Autocomplete>*/}

            <Searchbar  searchbar={ searchbar }
                        hideSearchbar={ hideSearchbar } />

            <Navigation type="horizontal" className="NavigationAppBar-right-comp">
              <IconButton
                className="NavigationAppBar-search--button"
                onClick={
                  () => {
                    showSearchbar();
                  }
                }
                icon='search'
              />
              {/*<div className="NavigationAppBar-rewards">
                <h2>Money 0.00</h2>
              </div>
              <IconMenu icon="card_giftcard" className="NavigationAppBar-GiftPoint">
                <MenuItem value='money' caption='Money 0.00' />
              </IconMenu>*/}
              {
                (location.pathname === '/') ?
                  <span>
                  {
                    vendor ?
                      <IconButton className="NavigationAppBar-icon"
                                  icon={<FaBarChart/>}
                                  onClick={ () => history.push('/dashboard') }/> :
                      <IconButton className="NavigationAppBar-icon" icon='shopping_cart' />
                  }
                  </span> :
                  <IconButton className="NavigationAppBar-icon"
                              icon='home'
                              onClick={ () => history.push('/') }/>
              }
              <IconMenu icon={
                          (profilePic) ?
                            <Avatar title="user image" image={ profilePic }/> :
                            'account_circle'
                        }
                        position='topRight'
                        className="NavigationAppBar-profile-menu"
                        iconRipple={ false }
                        menuRipple={ false } >
                {
                  (userLoggedIn) ?
                    <div className="NavigationAppBar-profile-menuitem">
                      {
                        (location.pathname === '/') ?
                          <MenuItem value='dashboard'
                                    icon="dashboard"
                                    onClick={() => history.push('/dashboard')} caption='Dashboard' /> :
                          <MenuItem value='dashboard'
                                    icon="home"
                                    onClick={() => history.push('/')} caption='Home' />
                      }
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
