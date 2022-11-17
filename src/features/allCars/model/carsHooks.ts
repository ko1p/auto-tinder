import { userSelector } from 'entities/user/model/state/authSelector';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { routing } from 'shared/routing';
import { carsAPI } from './carsServices';

function useChoicePreference(likedId: number, likingId: number | undefined) {
  const [toLike] = carsAPI.useToLikeMutation();
  const [toDislike] = carsAPI.useToDislikeMutation();
  const userId = useAppSelector(userSelector);
  const navigate = useNavigate();

  const changeLike = async (event: SyntheticEvent) => {
    event.stopPropagation();
    if (userId) {
      await toLike({ likedCarId: likedId, likingCarId: likingId })
        .unwrap()
        .then((payload) => console.log(payload))
        .catch((error) => alert(error.data.message));
    } else {
      navigate(routing.signIn);
    }
  };

  const changeDislike = async (event: SyntheticEvent) => {
    event.stopPropagation();
    if (userId) {
      await toDislike({ likedCarId: likedId, likingCarId: likingId })
        .unwrap()
        .then(() => alert('Спасибо за ваше мнение, мы его обязательно учтем'))
        .catch((error) => alert(error.data.message));
    } else {
      navigate(routing.signIn);
    }
  };

  return { changeLike, changeDislike };
}

export { useChoicePreference };
