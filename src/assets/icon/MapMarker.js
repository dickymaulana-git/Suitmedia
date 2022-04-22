import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import Color from '../../config/color';

function MapMarker(props) {
  return (
    <Svg
      style={{
        width: 30,
        height: 30,
      }}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        fill={Color.primary || props.fill}
        d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"
      />
    </Svg>
  );
}

export default MapMarker;
