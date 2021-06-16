import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { IRelease } from 'interface/ReleaseTypes';
import ReleaseList from 'components/Release/ReleaseList';
import ReleaseItem from 'components/Release/ReleaseList/ReleaseItem';

const ReleaseContainer = observer((): JSX.Element => {
  const { store } = useStores();
  const { handleReleaseList, releaseList } = store.ReleaseStore;

  const releaseLists: JSX.Element[] = useMemo(() => {
    return releaseList.map((release: IRelease) => {
      const { idx, title, user, createdAt } = release;
      return (
        <ReleaseItem
          key={idx}
          idx={idx!}
          title={title!}
          user={user!}
          createdAt={createdAt!}
        />
      );
    });
  }, [releaseList]);

  useEffect(() => {
    handleReleaseList();
  }, [handleReleaseList]);

  return (
    <ReleaseList releaseLists={releaseLists} />
  );
});

export default ReleaseContainer;