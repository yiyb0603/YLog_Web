import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import ReleaseList from 'components/Release/ReleaseList';
import { IRelease } from 'interface/ReleaseTypes';
import ReleaseItem from 'components/Release/ReleaseList/ReleaseItem';

const ReleaseContainer = observer(() => {
  const { store } = useStores();
  const { handleReleaseList, releaseList } = store.ReleaseStore;

  const releaseLists: JSX.Element[] = releaseList.map((release: IRelease) => {
    const { idx, title, writer, created_at, updated_at } = release;
    return (
      <ReleaseItem
        key ={idx}
        idx ={idx!}
        title ={title!}
        writer ={writer!}
        createdAt ={created_at!}
        updatedAt ={updated_at!}
      />
    );
  })

  useEffect(() => {
    handleReleaseList();
  }, [handleReleaseList]);

  return <ReleaseList releaseLists ={releaseLists} />
});

export default ReleaseContainer;