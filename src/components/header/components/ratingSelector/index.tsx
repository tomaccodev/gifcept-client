import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';

import { Rating } from '../../../../common/constants';

import './RatingSelector.scss';

interface IRaringSelectorPropps {
  currentRating: Rating;
  onRatingChange: (rating: Rating) => void;
}

const iconDictionary = {
  [Rating.sfw]: 'check_circle',
  [Rating.nsfw]: 'warning',
  [Rating.explicit]: 'error',
};

const textDictionary = {
  [Rating.sfw]: 'SFW',
  [Rating.nsfw]: 'NSFW',
  [Rating.explicit]: 'Explicit',
};

export default observer(({ currentRating, onRatingChange }: IRaringSelectorPropps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const hideMenu = useCallback(() => setMenuVisible(false), []);
  const toggleMenu = useCallback(() => setMenuVisible(!menuVisible), [menuVisible]);

  const dropdownMenuClases = ['dropdown-content'];
  if (menuVisible) {
    dropdownMenuClases.push('dropdown-content-showing');
  }

  return (
    <div className="dropdown" onMouseLeave={hideMenu}>
      <button className="header-button" title={textDictionary[currentRating]} onClick={toggleMenu}>
        <i className="material-icons">{iconDictionary[currentRating]}</i>
      </button>
      <ul className={dropdownMenuClases.join(' ')}>
        {Object.values(Rating)
          .filter((r) => r !== currentRating)
          .map((r) => (
            <li
              key={r}
              onClick={() => {
                onRatingChange(r);
                hideMenu();
              }}
            >
              <i className="material-icons">{iconDictionary[r]}</i> {textDictionary[r]}
            </li>
          ))}
      </ul>
    </div>
  );
});
