import { LineWave, MutatingDots } from 'react-loader-spinner';

export const LoadingMutatingDots = ({
  primaryColor = '#6922f7',
  secondaryColor = '#8e71f4',
  radius = '12.5',
  className,
}) => {
  return (
    <div className={`pt-[30vh] flex justify-center ${className}`}>
      <MutatingDots
        height="100"
        width="100"
        color={primaryColor}
        secondaryColor={secondaryColor}
        radius={radius}
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export const LoadingLineWave = ({ color = '#6922f7', colors = [], className }) => {
  return (
    <div className={`py-2 flex justify-center ${className}`}>
      <LineWave
        height="100"
        width="100"
        color={color}
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor={colors[0]}
        middleLineColor={colors[1]}
        lastLineColor={colors[2]}
      />
    </div>
  );
};
