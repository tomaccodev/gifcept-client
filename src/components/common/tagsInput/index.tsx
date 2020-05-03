import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';

import styles from './TagsInput.module.scss';

interface ITagsInputProps {
  tags?: string[];
  suggestions?: string[];
  delimiter?: string;
  uniqueTags?: boolean;
  caseInsensitive?: boolean;
  onChange?: (tags: string[]) => void;
}

export default ({
  tags,
  delimiter = ',',
  uniqueTags = true,
  caseInsensitive = true,
  onChange,
}: ITagsInputProps) => {
  const [currentTags, setCurrentTags] = useState(tags || []);
  const [currentInput, setCurrentInput] = useState('');

  const doSetCurrentTags = useCallback(
    (newTags: string[]) => {
      setCurrentTags([...newTags]);
      if (onChange) {
        onChange([...newTags]);
      }
    },
    [onChange],
  );

  const updateSuggestions = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(ev.target.value);
  }, []);
  const updateTags = useCallback(
    (ev: KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === delimiter) {
        ev.preventDefault();
        if (
          !uniqueTags ||
          !currentTags
            .map((t) => (caseInsensitive ? t.toLowerCase() : t))
            .includes(caseInsensitive ? currentInput.toLowerCase() : currentInput)
        ) {
          doSetCurrentTags([...currentTags, currentInput]);
        }
        setCurrentInput('');
      }
    },
    [caseInsensitive, currentInput, currentTags, delimiter, uniqueTags, doSetCurrentTags],
  );

  useEffect(() => {
    setCurrentTags(tags || []);
  }, [tags]);

  return (
    <div className={styles['tags-input']}>
      {currentTags.map((t, i) => (
        <span key={i}>
          {t}{' '}
          <i
            onClick={() => {
              const newTags = [...currentTags];
              newTags.splice(i, 1);
              doSetCurrentTags(newTags);
            }}
          >
            ×
          </i>
        </span>
      ))}
      <input value={currentInput} onChange={updateSuggestions} onKeyDown={updateTags} />
    </div>
  );
};
