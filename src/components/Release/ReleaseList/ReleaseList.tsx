import React from 'react';

interface ReleaseListProps {
  releaseLists: JSX.Element[];
}

const ReleaseList = ({ releaseLists }: ReleaseListProps): JSX.Element => {
  return (
    <div>
      {releaseLists}
    </div>
  );
};

export default ReleaseList;
