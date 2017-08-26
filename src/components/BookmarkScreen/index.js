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
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Share from 'react-native-share';
import Hyperlink from 'react-native-hyperlink';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchBookmarkInfo } from '../../models/api';
import { itemObject } from '../../libs/utils';
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
      <Header style={styles(this.props.isNightMode).header}>
        <Left>
          <Button
            transparent
            onPress={() => {
              Actions.pop();
            }}
          >
            <MaterialIcon name="chevron-left" style={styles(this.props.isNightMode).headerBackIcon} />
          </Button>
        </Left>
        <Body>
          <Title style={styles(this.props.isNightMode).headerTitle}>ブックマーク</Title>
        </Body>
        <Right />
      </Header>
    );
  }

  userBarComponent() {
    const { creator, userIcon } = this.state.item;
    if (userIcon !== undefined && creator !== undefined) {
      return (
        <TouchableOpacity
          onPress={() => {
            Actions.userBookmark({ title: creator });
          }}
        >
          <View style={styles(this.props.isNightMode).userBar}>
            <View style={styles(this.props.isNightMode).userBarLeft}>
              <Image style={styles(this.props.isNightMode).userIcon} source={{ uri: userIcon }} />
            </View>
            <View style={styles(this.props.isNightMode).userBarRight}>
              <View style={styles(this.props.isNightMode).userBarRightInner}>
                <Text style={styles(this.props.isNightMode).userBarRightInnerText}>{ creator }</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }

  descriptionComponent() {
    const { description } = this.state.item;
    if (description !== '') {
      return (
        <View style={styles(this.props.isNightMode).description}>
          <Hyperlink
            linkStyle={styles(this.props.isNightMode).descriptionLink}
            onPress={(urlText) => {
              fetchBookmarkInfo(urlText).then((resp) => {
                Actions.entry({ item: itemObject(resp, urlText) });
              }).catch((e) => {
                console.log(e);
              });
            }}
          >
            <Text style={styles(this.props.isNightMode).descriptionText}>{ description }</Text>
          </Hyperlink>
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
          <Text style={styles(this.props.isNightMode).entryTitle}>{ title }</Text>
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
        <View style={styles(this.props.isNightMode).entryRight}>
          <Image style={styles(this.props.isNightMode).entryImage} source={{ uri: entryImage }} />
        </View>
      );
    }

    if (entry !== undefined) {
      const entryLeftStyle = entryImageComponent !== null ? styles(this.props.isNightMode).entryLeft : styles(this.props.isNightMode).entryLeftNonImg;
      return (
        <View style={styles(this.props.isNightMode).entryWrap}>
          <View style={entryLeftStyle}>
            <Text style={styles(this.props.isNightMode).entryText}>{ entry }</Text>
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
        <View style={styles(this.props.isNightMode).entryLink}>
          <Text style={styles(this.props.isNightMode).entryLinkText}>{ link }</Text>
        </View>
      );
    }
    return null;
  }

  dateComponent() {
    const { date } = this.state.item;
    if (date !== '') {
      return (
        <View style={styles(this.props.isNightMode).entryDate}>
          <Text style={styles(this.props.isNightMode).entryDateText}>{ date }</Text>
        </View>
      );
    }
    return null;
  }

  starComponent() {
    const { stars, colored_stars } = this.state.item;
    const starCount = stars || 0;
    const colorStarCount = colored_stars || 0;
    const totalStar = starCount + colorStarCount;
    if (totalStar === 0) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles(this.props.isNightMode).entryStars}
        activeOpacity={0.9}
        onPress={() => {
          Actions.bookmarkStar({ item: this.state.item });
        }}
      >
        <MaterialIcon name="star" style={styles(this.props.isNightMode).entryStarsIcon} />
        <Text style={styles(this.props.isNightMode).entryStarsText}>{ totalStar }</Text>
      </TouchableOpacity>
    );
  }

  entryWrapComponent() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            Actions.entry({ item: this.state.item });
          }}
        >
          { this.titleComponent() }
          { this.entryComponent() }
          { this.linkComponent() }
        </TouchableOpacity>
        <View style={styles(this.props.isNightMode).entryMeta}>
          { this.dateComponent() }
          { this.starComponent() }
        </View>
      </View>
    );
  }

  bookmarkCountComponent() {
    const { bookmarkCount } = this.state.item;
    if (bookmarkCount !== '') {
      return (
        <View style={styles(this.props.isNightMode).bookmarkCount}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              Actions.bookmarkComment({ item: this.state.item });
            }}
          >
            <Text style={styles(this.props.isNightMode).bookmarkCountText}>{ bookmarkCount } users</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  footerComponent() {
    return (
      <Footer style={styles(this.props.isNightMode).footer}>
        <View style={styles(this.props.isNightMode).footerBookmark}>
          <Button
            transparent
            onPress={() => {
              Actions.bookmarkEdit({ item: this.state.item });
            }}
          >
            <MaterialIcon name="pencil-box-outline" style={styles(this.props.isNightMode).footerBookmarkButtonIcon} />
          </Button>
        </View>
        <Button
          transparent
          onPress={() => {
            Share.open({ url: this.state.item.link }).catch((err) => { console.log(err); });
          }}
        >
          <MaterialIcon name="share-variant" style={styles(this.props.isNightMode).footerShareButtonIcon} />
        </Button>
      </Footer>
    );
  }

  render() {
    return (
      <Container>
        { this.headerComponent() }
        <Content style={styles(this.props.isNightMode).content}>
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
  isNightMode: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { styleData } = state;
  return {
    isNightMode: styleData.isNightMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bookmark);
