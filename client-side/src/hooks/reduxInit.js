import { list as listFriend } from 'actions/friend/list';
import { getProfile } from 'actions/profile';
import { listTalkroom } from 'actions/talkRoom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useReduxServerHook = ({ pathname }) => {
  const { profile, talkRoomList, friendList } = useSelector(state => state);
  const dispatch = useDispatch();

  const dispatchHooks = ({ status }, event) => {
    if (!status) dispatch(event());
  };

  useEffect(() => {
    if (pathname !== '/login') {
      dispatchHooks(profile, getProfile);
      dispatchHooks(talkRoomList, listTalkroom);
      dispatchHooks(friendList, listFriend);
    }
  }, [pathname]);
};

export default useReduxServerHook;