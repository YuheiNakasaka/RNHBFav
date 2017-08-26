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
import Eula from './components/EulaScreen/index';
import UserBookmark from './components/UserBookmarkScreen/index';
import BookmarkStar from './components/BookmarkStarScreen/index';

const App = () => (
  <Router>
    <Scene modal>
      <Scene key="root" hideNavBar>

        {/* TOPタイムライン */}
        <Scene key="home" component={Root} initial />

        {/* ブックマーク詳細 */}
        <Scene key="bookmark" component={Bookmark} />

        {/* Webviewでエントリを開くページ */}
        <Scene key="entry" component={Entry} />

        {/* ユーザーのブックマーク一覧を見るページ */}
        <Scene key="userBookmark" component={UserBookmark} />

        {/* ブコメ一覧 */}
        <Scene key="bookmarkComment" component={BookmarkComment} hideNavBar panHandlers={null} />

        {/* ブコメのスター付けてる人一覧 */}
        <Scene key="bookmarkStar" component={BookmarkStar} hideNavBar panHandlers={null} />
      </Scene>

      {/* メニュー */}
      <Scene key="menu" component={Menu} hideNavBar panHandlers={null} />

      {/* 初回のみツアーページ */}
      <Scene key="tour" component={Tour} hideNavBar panHandlers={null} />

      {/* 利用規約 */}
      <Scene key="eula" component={Eula} hideNavBar panHandlers={null} />

      {/* 認証ページ */}
      <Scene key="auth" component={Auth} hideNavBar panHandlers={null} />

      {/* ブコメ投稿フォーム */}
      <Scene key="bookmarkEdit" component={BookmarkEdit} hideNavBar panHandlers={null} />

      {/* ModalでWebview開きたい時用 */}
      <Scene key="modalEntry" component={Entry} hideNavBar panHandlers={null} />
    </Scene>
  </Router>
);

export default App;
