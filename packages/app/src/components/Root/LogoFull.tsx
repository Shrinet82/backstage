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

const LogoFull = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <svg
      className={classes.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 50"
    >
      <text
        x="0"
        y="38"
        className={classes.text}
        fill={theme.palette.text.primary}
      >
        OPSIE
      </text>
    </svg>
  );
};

export default LogoFull;
