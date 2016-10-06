/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  View,
  StyleSheet,
} from 'react-native';
import { SceneRendererPropType } from './TabViewPropTypes';
import type { Route, Scene, SceneRendererProps } from './TabViewTypeDefinitions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = SceneRendererProps & {
  route: Route;
  renderScene: (scene: Scene) => ?React.Element<any>;
  style?: any;
}

export default class TabViewPage extends Component<void, Props, void> {
  static propTypes = {
    ...SceneRendererPropType,
    renderScene: PropTypes.func.isRequired,
    style: PropTypes.any,
  };

  render() {
    const { navigationState, renderScene, route, style } = this.props;
    const { routes, index } = navigationState;

    const scene = {
      route,
      focused: index === routes.indexOf(route),
      index: routes.indexOf(route),
    };

    return (
      <Animated.View style={[ styles.container, style ]}>
        {renderScene(scene)}
      </Animated.View>
    );
  }
}
