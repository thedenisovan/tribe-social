import { useEffect, useContext } from 'react';
import { CurrentPageContext } from '../context/DashContext';

export default function useSetCurrentPage(page: string) {
  const currPageContext = useContext(CurrentPageContext);

  useEffect(() => {
    const updateCurrentPage = () => currPageContext?.setCurrentPage(page);
    updateCurrentPage();
  }, [page, currPageContext]);
}
