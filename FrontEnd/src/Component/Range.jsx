import React from "react";
import PropTypes from "prop-types";
import { styled, alpha, Box } from "@mui/system";
import { Slider as BaseSlider, sliderClasses } from "@mui/base/Slider";

// Main Slider Component
export default function SliderValueLabel() {
  const [value, setValue] = React.useState(10); // State to track slider value

  // Handler function for slider change
  const handleSliderChange = (event, newValue) => {
    setValue(newValue); // Update the value when slider moves
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={value} // Bind the value to state
        onChange={handleSliderChange} // Handle slider change
        defaultValue={10} // Initial value
        slots={{ valueLabel: SliderValueLabelComponent }} // Use the custom label component
        valueLabelDisplay="on" // Show the value label always
      />
    </Box>
  );
}

// Custom Value Label for Slider
function SliderValueLabelComponent({ children }) {
  return (
    <span className="label">
      <div className="value">{children}</div>
    </span>
  );
}

// Prop types for the label component
SliderValueLabelComponent.propTypes = {
  children: PropTypes.node.isRequired, // Expected prop is a node (can be text, number, etc.)
};

// Blue color palette for styling
const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  300: "#66B2FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B3",
  900: "#003A75",
};

// Grey color palette for styling
const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

// Styled Slider component with MUI system
const Slider = styled(BaseSlider)(
  () => `
  color: ${blue[500]}; // Set slider color based on the palette
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &.${sliderClasses.disabled} {
    pointer-events: none;
    cursor: default;
    color: ${grey[300]};
    opacity: 0.4;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.3;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-left: -6px;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: ${blue[500]};
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    &:hover {
      box-shadow: 0 0 0 6px ${alpha(blue[200], 0.3)};
    }

    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 8px ${alpha(blue[200], 0.5)};
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 8px ${alpha(blue[200], 0.5)};
      outline: none;
      transform: scale(1.2);
    }
  }

  & .label {
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 14px;
    background-color: ${blue[600]};
    width: 32px;
    height: 32px;
    padding: 0;
    visibility: hidden;
    color: #fff;
    border-radius: 50% 50% 50% 0;
    position: absolute;
    transform: translate(0%, -140%) rotate(-45deg) scale(0);
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :hover .label {
    visibility: visible;
    transform: translate(0%, -140%) rotate(-45deg) scale(1);
  }

  :hover .value {
    transform: rotate(45deg);
    text-align: center;
  }
`
);
