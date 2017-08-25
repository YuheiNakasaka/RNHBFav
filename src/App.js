import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Root from './components/RootScreen/index';
import Bookmark from './components/BookmarkScreen/index';
import BookmarkComment from './components/BookmarkCommentScreen/index';
import BookmarkEdit from './components/BookmarkEditScreen/index';
import Entry from './components/EntryScreen/index';
import Auth from './components/AuthScreen/index';
import Menu from './components/MenuScreen/index';
import Tour from './components/TourScreen/index';

const App = () => (
  <Router>
    <Scene modal>
      <Scene key="root" hideNavBar>
        <Scene key="home" component={Root} initial />
        <Scene key="bookmark" component={Bookmark} />
        <Scene key="entry" component={Entry} />
      </Scene>
      <Scene key="auth" component={Auth} hideNavBar panHandlers={null} />
      <Scene key="bookmarkComment" component={BookmarkComment} hideNavBar panHandlers={null} />
      <Scene key="bookmarkEdit" component={BookmarkEdit} hideNavBar panHandlers={null} />
      <Scene key="menu" component={Menu} hideNavBar panHandlers={null} />
      <Scene key="tour" component={Tour} hideNavBar panHandlers={null} />
    </Scene>
  </Router>
);

export default App;
