import React from 'react';
import classNames from 'classnames';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';

import Searchbar from './Searchbar';

import logo from '../../assets/images/logo/logo.png';
import DashboardIcon from '../../assets/svg/dashboard.svg';

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
  showCartSidebar,
}) => {

  const navTitleClass = classNames({
    'NavigationAppBar-title': true,
    'NavigationAppBar-title--hidden': searchbar,
  });

  const windowLocation = window.location;

  return (
    <AppBar className="NavigationAppBar"
            title={
                <span className={ navTitleClass } data-tour="welcome" >
                  <span  className="NavigationAppBar-title--shopname" >{ shopName }</span> <br />
                  {/*<span  className="NavigationAppBar-title--ref" >{ refCode }</span>*/}
                  <span  className="NavigationAppBar-title--ref" >{ refCode || 'REF: CZ-001'}</span>
                </span>
              }
              leftIcon={
                !searchbar && <img className="NavigationAppBar-logo" src={logo} alt="Shop logo"/>
              }
            onLeftIconClick={
                () => windowLocation.assign('http://demo.shophobe.com/')
              }
            fixed >
            <Searchbar searchbar={ searchbar }
                      hideSearchbar={ hideSearchbar }/>

            {
              !searchbar && <Navigation type="horizontal" className="NavigationAppBar-right-comp">
                <IconButton
                  className="NavigationAppBar-search--button"
                  onClick={
                    () => {
                      showSearchbar();
                    }
                  }
                  icon='search'
                />
                {
                  (location.pathname === '/') ?
                    <span>
                    {
                      vendor ?
                        <IconButton className="NavigationAppBar-icon"
                                    icon={
                                      <img  className="NavigationAppBar-dashboard-icon"
                                            src={ DashboardIcon }
                                            alt="Dashboard Icon"/>
                                    }
                                    onClick={ () => history.push('/dashboard') }
                                    data-tour="click-dashboard" /> :
                        <IconButton className="NavigationAppBar-icon" icon='shopping_cart' onClick={showCartSidebar}/>
                    }
                    </span> :
                    <IconButton className="NavigationAppBar-icon"
                                icon='store'
                                onClick={ () => history.push('/') }/>
                }
                <IconMenu icon={
                            (profilePic) ?
                              <Avatar className="NavigationAppBar-user-profile-icon" title="user image" image={ profilePic }/> :
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
                                      icon="store"
                                      onClick={() => history.push('/')} caption='Home' />
                        }
                        <MenuItem  value='profile'
                                    icon='account_circle'
                                    caption='Profile'
                                    onClick={
                                      () => {
                                        const urlParts = window.location.hostname.split('.');

                                        if (urlParts.lentght < 3) {
                                          window.open('http://www.shophobe.cf');
                                        } else if (urlParts[2] === 'com') {
                                          window.open('http://www.shophobe.com');
                                        } else {
                                          window.open('http://www.shophobe.cf');
                                        }
                                      }
                                    } />
                        <MenuItem value='settings'
                                  icon='settings'
                                  caption='Settings'
                                  onClick={() => history.push('/settings')} />
                        <MenuDivider />
                        <MenuItem value='signout'
                          icon='power_settings_new'
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
            }
      </AppBar>
  );
}

export default NavigationAppBar;
