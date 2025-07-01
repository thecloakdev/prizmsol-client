"use client";

import { AppProgressProvider as ProgressProvider } from '@bprogress/next';

const NProgressProvider = ({ children }: any) => {
  return (
    <>
      <ProgressProvider
        height="4px"
        color="#3b82f6"
        options={{ showSpinner: false }}
        shallowRouting>
        {children}
      </ProgressProvider>
    </>
  );
};

export default NProgressProvider;
