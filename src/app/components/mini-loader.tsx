import React from 'react';
import { Oval } from 'react-loader-spinner';

export default function MiniLoader() {
  return (
    <div className="flex justify-center items-center">
      <Oval
        visible={true}
        height="26"
        width="26"
        color="#fff"
        secondaryColor="000"
        ariaLabel="oval-loading"
      />
    </div>
  );
}
