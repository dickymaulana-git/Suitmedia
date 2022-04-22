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
        d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z"
      />
    </Svg>
  );
}

export default MapMarker;
