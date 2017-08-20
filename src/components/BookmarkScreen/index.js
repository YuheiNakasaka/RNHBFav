import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Header,
  Footer,
  Left,
  Body,
  Right,
  Title,
  Content,
  Button,
} from 'native-base';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Share from 'react-native-share';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../assets/styles/bookmark/index';


class Bookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
    };
  }

  headerComponent() {
    return (
      <Header style={styles.header}>
        <Left>
          <Button
            transparent
            onPress={() => {
              Actions.pop();
            }}
          >
            <MaterialIcon name="chevron-left" style={styles.headerIcon} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerTitle}>ブックマーク</Title>
        </Body>
        <Right />
      </Header>
    );
  }

  userBarComponent() {
    const { creator, userIcon } = this.state.item;
    if (userIcon !== undefined && creator !== undefined) {
      return (
        <View style={styles.userBar}>
          <View style={styles.userBarLeft}>
            <Image style={styles.userIcon} source={{ uri: userIcon }} />
          </View>
          <View style={styles.userBarRight}>
            <View style={styles.userBarRightInner}>
              <Text style={styles.userBarRightInnerText}>{ creator }</Text>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  descriptionComponent() {
    const { description } = this.state.item;
    if (description !== '') {
      return (
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{ description }</Text>
        </View>
      );
    }
    return null;
  }

  titleComponent() {
    const { title } = this.state.item;
    if (title !== undefined) {
      return (
        <View>
          <Text style={styles.entryTitle}>{ title }</Text>
        </View>
      );
    }
    return null;
  }

  entryComponent() {
    const { entry, entryImage } = this.state.item;
    let entryImageComponent = null;
    if (entryImage !== undefined) {
      entryImageComponent = (
        <View style={styles.entryRight}>
          <Image style={styles.entryImage} source={{ uri: entryImage }} />
        </View>
      );
    }

    if (entry !== undefined) {
      const entryLeftStyle = entryImageComponent !== null ? styles.entryLeft : styles.entryLeftNonImg;
      return (
        <View style={styles.entryWrap}>
          <View style={entryLeftStyle}>
            <Text style={styles.entryText}>{ entry }</Text>
          </View>
          { entryImageComponent }
        </View>
      );
    }
    return null;
  }

  linkComponent() {
    const { link } = this.state.item;
    if (link !== '') {
      return (
        <View style={styles.entryLink}>
          <Text style={styles.entryLinkText}>{ link }</Text>
        </View>
      );
    }
    return null;
  }

  dateComponent() {
    const { date } = this.state.item;
    if (date !== '') {
      return (
        <View style={styles.entryDate}>
          <Text style={styles.entryDateText}>{ date }</Text>
        </View>
      );
    }
    return null;
  }

  entryWrapComponent() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          Actions.entry({ item: this.state.item });
        }}
      >
        { this.titleComponent() }
        { this.entryComponent() }
        { this.linkComponent() }
        { this.dateComponent() }
      </TouchableOpacity>
    );
  }

  bookmarkCountComponent() {
    const { bookmarkCount } = this.state.item;
    if (bookmarkCount !== '') {
      return (
        <View style={styles.bookmarkCount}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              Actions.bookmarkComment({ item: this.state.item });
            }}
          >
            <Text style={styles.bookmarkCountText}>{ bookmarkCount } users</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  footerComponent() {
    return (
      <Footer style={styles.footer}>
        <View style={styles.footerBookmark}>
          <Button
            transparent
            onPress={() => {
              Actions.bookmarkEdit({ item: this.state.item });
            }}
          >
            <MaterialIcon name="pencil-box-outline" style={styles.footerBookmarkButtonIcon} />
          </Button>
        </View>
        <Button
          transparent
          onPress={() => {
            Share.open({ url: this.state.item.link }).catch((err) => { console.log(err); });
          }}
        >
          <MaterialIcon name="share-variant" style={styles.footerShareButtonIcon} />
        </Button>
      </Footer>
    );
  }

  render() {
    return (
      <Container>
        { this.headerComponent() }
        <Content style={styles.content}>
          { this.userBarComponent() }
          { this.descriptionComponent() }
          { this.entryWrapComponent() }
          { this.bookmarkCountComponent() }
        </Content>
        { this.footerComponent() }
      </Container>
    );
  }
}

Bookmark.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Bookmark;
