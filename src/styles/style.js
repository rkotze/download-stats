import React from 'react';

const link = {
  normal: {
    borderBottom: '1px dotted #c00',
    color: '#c00'
  },
  hover: {
    borderBottom: '1px solid rgb(0, 168, 0)',
    color: 'black',
  },
  active: 'hover',
  touchActive: {
    borderBottom: '1px dashed rgb(0, 168, 0)',
    color: 'black',
  },
  focusFromTab: {
    outline: '2px solid rgb(0, 152, 0)',
    outlineOffset: '2px',
    color: 'black',
  },
  touchActiveTapOnly: true,
};

const childLink = {};
Object.keys(link).forEach((key) => {
  if (key !== 'touchActiveTapOnly') {
    childLink[`onParent${key.slice(0, 1).toUpperCase()}${key.slice(1)}`] = link[key];
  }
});

export default {
  link,
  childLink,
  p: {
    margin: '3vh 0',
    lineHeight: '1.4',
  }
}