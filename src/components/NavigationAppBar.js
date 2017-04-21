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

import logo from '../assets/images/logo/logo.png';

import './NavigationAppBar.css';

const NavigationAppBar = ({
  searchbar,
  history,
  hideSearchbar,
  userLoggedIn,
  handleSignOut,
  showSearchbar,
  handleSignIn
}) => {

  const navTitleClass = classNames({
    'NavigationAppBar-title--hidden': searchbar,
  })

  const searchbarClass = classNames({
    'Searchbar': true,
    'Searchbar--hide': !searchbar,
  })

  return (
    <AppBar className="NavigationAppBar"
              title={
                <div className={ navTitleClass }>
                  <span>ShopName</span> <br />
                  <span>Shop reference code</span>
                </div>
              }
              leftIcon={
                <Avatar
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

            <Navigation type="horizontal" className="Right-comp">
              <IconButton
                className="NavigationAppBar-search--button"
                onClick={
                  () => showSearchbar()
                }
                icon='search' />

              <IconMenu className="NavigationAppBar-rewards"
                        icon={
                          <div>
                            <h2>Money 0.00</h2>
                            <h2>Rewards 0.00</h2>
                          </div>
                          } />

              <IconMenu icon="card_giftcard" className="NavigationAppBar-GiftPoint">
                <MenuItem value='money' caption='Money' />
                <MenuItem value='reward' caption='Reward' />
              </IconMenu>

              <IconButton icon='cart' />

              <IconMenu icon={
                          <Avatar title="Shop_logo" image={ logo }/>
                        }
                        position='topRight'
                        className="profile-menu"
                        iconRipple={ false }
                        menuRipple={ false } >
                {
                  (userLoggedIn) ?
                    <div>
                      <MenuItem value='dashboard'
                        icon="dashboard"
                        onClick={() => history.push('/dashboard')} caption='Dashboard' />
                      <MenuItem value='profile'
                                icon='profile'
                                caption='Profile' />
                      <MenuItem value='settings'
                                icon='settings'
                                caption='Settings' />
                      <MenuDivider />
                      <MenuItem value='signout'
                        icon='signout'
                        onClick={ () => {
                          handleSignOut();
                          history.push('/');
                        }}
                        caption='Sign Out' />
                    </div> :
                    <MenuItem value='signin'
                              icon='account_circle'
                              onClick={ handleSignIn }
                              caption='Sign In/Sign Up' />
                }
              </IconMenu>
            </Navigation>
      </AppBar>
  );
}

export default NavigationAppBar;
