import { useContext } from 'react';
import { StoriesContext } from '@/stories/providers/StoriesProvider';

const useStories = () => {
  return useContext(StoriesContext);
};

export default useStories;
