import { escapeRegExp } from 'lodash';
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { mod } from '../../../utils/math';

import styles from './TagsInput.module.scss';

interface ITagsInputProps {
  tags?: string[];
  suggestions?: string[];
  delimiter?: string;
  uniqueTags?: boolean;
  caseInsensitive?: boolean;
  onChange?: (tags: string[]) => void;
  minLength?: number;
}

export default ({
  tags,
  suggestions = [],
  delimiter = ',',
  uniqueTags = true,
  caseInsensitive = true,
  onChange,
  minLength = 1,
}: ITagsInputProps) => {
  const [currentTags, setCurrentTags] = useState(tags || []);
  const [currentInput, setCurrentInput] = useState('');
  const [matchingSuggestions, setMatchingSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | undefined>(undefined);

  const normalizedCurrentTags = currentTags.map((t) => (caseInsensitive ? t.toLowerCase() : t));

  const inputRef = useRef<HTMLInputElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const doSetCurrentTags = useCallback(
    (newTags: string[]) => {
      setCurrentTags([...newTags]);
      if (onChange) {
        onChange([...newTags]);
      }
    },
    [onChange],
  );

  const addTag = useCallback(
    (newTag) => {
      doSetCurrentTags([...currentTags, newTag]);
      setCurrentInput('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [currentTags, doSetCurrentTags],
  );

  const onInputChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(ev.target.value);
  }, []);

  const onInputKeyDown = useCallback(
    (ev: KeyboardEvent<HTMLInputElement>) => {
      switch (ev.key) {
        case 'Backspace':
          if (currentInput === '') {
            ev.preventDefault();
            doSetCurrentTags([...currentTags.slice(0, -1)]);
          }
          break;
        case delimiter:
          ev.preventDefault();
          if (
            currentInput.trim() !== '' &&
            (!uniqueTags ||
              !currentTags
                .map((t) => (caseInsensitive ? t.toLowerCase() : t))
                .includes(caseInsensitive ? currentInput.toLowerCase() : currentInput))
          ) {
            doSetCurrentTags([...currentTags, currentInput]);
          }
          setCurrentInput('');
          break;
        case 'ArrowUp':
          ev.preventDefault();
          setSelectedSuggestion(
            mod(
              (selectedSuggestion !== undefined ? selectedSuggestion : 0) - 1,
              matchingSuggestions?.length,
            ),
          );
          break;
        case 'ArrowDown':
          ev.preventDefault();
          setSelectedSuggestion(
            mod(
              (selectedSuggestion !== undefined
                ? selectedSuggestion
                : matchingSuggestions?.length - 1) + 1,
              matchingSuggestions?.length,
            ),
          );
          break;
        case 'Enter':
          ev.preventDefault();
          if (
            selectedSuggestion !== undefined &&
            !normalizedCurrentTags.includes(matchingSuggestions[selectedSuggestion].toLowerCase())
          ) {
            addTag(matchingSuggestions[selectedSuggestion]);
          }
          break;
      }
    },
    [
      caseInsensitive,
      currentInput,
      currentTags,
      delimiter,
      uniqueTags,
      doSetCurrentTags,
      selectedSuggestion,
      matchingSuggestions,
      addTag,
      normalizedCurrentTags,
    ],
  );

  useEffect(() => {
    setCurrentTags(tags || []);
  }, [tags]);

  useEffect(() => {
    const updateSuggestionsTimeout = setTimeout(() => {
      if (currentInput.length >= minLength) {
        setMatchingSuggestions([
          ...suggestions.filter((s) =>
            (caseInsensitive ? s.toLowerCase() : s).includes(
              caseInsensitive ? currentInput.toLowerCase() : currentInput,
            ),
          ),
        ]);
      } else {
        setMatchingSuggestions([]);
      }
    }, 200);

    return () => {
      clearTimeout(updateSuggestionsTimeout);
    };
  }, [currentInput, minLength, suggestions, caseInsensitive]);

  useEffect(() => {
    setSelectedSuggestion(undefined);
  }, [matchingSuggestions]);

  useLayoutEffect(() => {
    if (ulRef.current) {
      if (selectedSuggestion !== undefined) {
        const selectedChild = ulRef.current.children[selectedSuggestion];
        if (selectedChild) {
          selectedChild.scrollIntoView();
        }
      } else {
        ulRef.current.scrollTo(0, 0);
      }
    }
  }, [selectedSuggestion, matchingSuggestions]);

  const dropdownMenuClases = [styles['dropdown-content']];
  if (matchingSuggestions.length > 0) {
    dropdownMenuClases.push(styles['dropdown-content-showing']);
  }

  const matchingRegExp = new RegExp(
    `(${escapeRegExp(currentInput)})`,
    caseInsensitive ? 'gi' : 'g',
  );

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
      <input
        value={currentInput}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        ref={inputRef}
      />
      <ul className={dropdownMenuClases.join(' ')} ref={ulRef}>
        {matchingSuggestions.map((s, i) => {
          const disabled = uniqueTags && normalizedCurrentTags.includes(s);
          const entryStyles: string[] = [];
          if (disabled) {
            entryStyles.push(styles['disabled-option']);
          }
          if (selectedSuggestion !== undefined && selectedSuggestion === i) {
            entryStyles.push(styles['selected-suggestion']);
          }

          return (
            <li
              key={s}
              className={entryStyles.join(' ')}
              onClick={() => {
                if (!disabled) {
                  addTag(s);
                }
              }}
              dangerouslySetInnerHTML={{ __html: s.replace(matchingRegExp, `<b>$1</b>`) }}
            />
          );
        })}
      </ul>
    </div>
  );
};
