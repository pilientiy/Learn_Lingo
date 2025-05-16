'use client';

import React from 'react';

interface GlobalErrorProps {}

function GlobalError({}: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div>
          <p>Something globally went wrong</p>
        </div>
      </body>
    </html>
  );
}

export default GlobalError;
