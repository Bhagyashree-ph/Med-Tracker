import React from 'react';
import styled from 'styled-components';

const Typography = styled.span`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: ${({ size }) => `${size}px`}; 
  font-weight: ${({ weight }) => weight}; 
  color: ${({ color }) => color || '#50727B'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
`;

const typographyProps = {
  h1: {
    size: 36,
    weight: 'bold',
  },
  h2: {
    size: 32,
    weight: 'bold',
  },
  h3: {
    size: 26,
    weight: 'bold',
  },
  h4: {
    size: 22,
    weight: 'bold',
  },
  h5: {
    size: 18,
    weight: 'bold',
  },
  h6: {
    size: 16,
    weight: 'bold',
  },
  subtitle1: {
    size: '24px',
    weight: 'normal',
  },
  subtitle2: {
    size: '22px',
    weight: 'normal',
  },
  body1: {
    size: '20px',
    weight: 'normal',
  },
  body2: {
    size: '14px',
    weight: 'normal',
  },
  caption: {
    size: '12px',
    weight: 'normal',
  },
};

const MyTypography = ({ variant, children, style={}, className, ...props }) => {
  if (!typographyProps[variant]) {

    console.error(`Invalid variant: ${variant}`);

    return null;

  }
  const typographyPropsForVariant = typographyProps[variant] ;
  // console.log(typographyProps[variant]);
  return (
    <Typography
      style={style}
      className={className}
      size={typographyPropsForVariant.size}
      weight={typographyPropsForVariant.weight}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default MyTypography;