import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Layout from 'react-toolbox/lib/layout/Layout';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import MdStar from 'react-icons/lib/md/star';

import './Navigation.css';

const Navigation = ({ children }) => (
   <Layout>
    <NavDrawer pinned={ true } >
      <List selectable >
        <div className="Navigation-filler--div"/>
        <ListItem caption='Dashboard' className="Navigation--selected" />
        <ListItem caption='Order' />
        <ListItem caption='Products' />
        <ListItem caption='Reports' />
        <ListItem caption='Reviews' />
        <ListItem caption='Settings' />
      </List>
    </NavDrawer>
    <Panel>
      <AppBar className="Navbar"
              title=""
              leftIcon='logo'
              rightIcon={
                <MdStar />
              }
              fixed>
          <h1 style={{ marginRight: '10em'}}>I'm a big fat guy</h1>
      </AppBar>
      { children }
    </Panel>
  </Layout>
);

export default Navigation;
