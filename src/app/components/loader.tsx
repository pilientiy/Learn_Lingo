import React from 'react';
import { Discuss } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-[80vh] bg-white">
      <Discuss
        visible={true}
        height="80"
        width="80"
        ariaLabel="discuss-loading"
      />
    </div>
  );
}
