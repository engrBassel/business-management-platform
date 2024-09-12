import { useEffect } from "react";

function useDocTitle(newTitle) {
  useEffect(() => {
    document.title = `${newTitle} | My Business`;
  }, [newTitle]);
}

export default useDocTitle;
