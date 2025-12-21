import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 30,
  },
  text: {
    fontFamily: 'Sora, sans-serif',
    fontWeight: 700,
    fontSize: '40px',
  },
});

const LogoIcon = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <svg
      className={classes.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <text
        x="50%"
        y="38"
        textAnchor="middle"
        className={classes.text}
        fill={theme.palette.text.primary}
      >
        O
      </text>
    </svg>
  );
};

export default LogoIcon;
