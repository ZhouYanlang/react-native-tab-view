/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
} from 'react-native';
import { SceneRendererPropType } from './TabViewPropTypes';
import type { SceneRendererProps } from './TabViewTypeDefinitions';

type Props = SceneRendererProps & {
  swipeEnabled?: boolean;
  children?: any;
  style?: any;
}

export default class TabViewSheet extends Component<void, Props, void> {
  static propTypes = {
    ...SceneRendererPropType,
    swipeEnabled: PropTypes.bool,
    children: PropTypes.node,
    style: ScrollView.propTypes.style,
  };

  componentDidMount() {
    this._positionListener = this.props.position.addListener(this._updatePosition);
  }

  componentDidUpdate() {
    // this._updateScroll();
  }

  componentWillUnmount() {
    this.props.position.removeListener(this._positionListener);
  }

  _positionListener: string;

  _updatePosition = (e: { value: number }) => {

  };

  _scrollView: Object;

  _setRef = (el: Object) => (this._scrollView = el);

  _updateScroll = () => {
    const { index } = this.props.navigationState;
    const { width } = this.props.layout;

    this._scrollView.scrollTo({ x: index * width });
  };

  _handleScroll = (e) => {
    this.props.position.setValue(
      e.nativeEvent.contentOffset.x / this.props.layout.width
    );
  };

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        directionalLockEnabled
        scrollEnabled={this.props.swipeEnabled}
        automaticallyAdjustContentInsets={false}
        bounces={false}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={this._handleScroll}
        ref={this._setRef}
        style={this.props.style}
      >
        {this.props.children}
      </ScrollView>
    );
  }
}
