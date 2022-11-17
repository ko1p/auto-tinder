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

  const AlarmFunction = (payload: { isMatch: boolean; like: boolean }) => {
    alert(
      payload.isMatch
        ? 'Ваш лайк учтен и владелец машины узнает об этом'
        : 'Поздравляем!!! Ваши машины понравились друг другу, проверьте свою почту для связи с владельцем понравившейся вам машины'
    );
  };

  const changeLike = async (event: SyntheticEvent) => {
    event.stopPropagation();
    if (userId) {
      await toLike({ likedCarId: likedId, likingCarId: likingId })
        .unwrap()
        .then((payload) => AlarmFunction(payload))
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
