import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import Color from '../../config/color';

function ChevronLeft(props) {
  return (
    <Svg
      style={{
        width: 40,
        height: 40,
      }}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        fill={Color.primary || props.fill}
        d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z"
      />
    </Svg>
  );
}

export default ChevronLeft;
