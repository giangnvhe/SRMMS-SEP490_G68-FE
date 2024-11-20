import PropTypes from "prop-types";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const angle = parseFloat(progress) * 360;

  return (
    <div
      style={{
        background: `
                    radial-gradient(circle, #69c0ff 55%, transparent 56%),
                    conic-gradient(transparent 0deg ${angle}deg, #1890ff ${angle}deg 360deg),
                    #52c41a
                `,
        borderRadius: "50%",
        width: `${parseInt(size, 10)}px`,
        height: `${parseInt(size, 10)}px`,
      }}
    />
  );
};

ProgressCircle.propTypes = {
  progress: PropTypes.string,
  size: PropTypes.string,
};

export default ProgressCircle;
