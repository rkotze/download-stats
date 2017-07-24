import React from 'react';

export default function withLoading(){
  return function(MyComponent){
    return function(props){
      const { success, failure } = props;
      if(success === null && failure === null){
        return <p>Loading...</p>
      }

      if(success && failure === null){
        return (<MyComponent {...props} />);
      }

      console.log(failure);

      return <p>Failed to fetch data.</p>
    }
  }
}