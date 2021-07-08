import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGetDictionaryQuery, useLazyTranslateQuery, useUpdateDictionaryMutation } from './api'
import Svg from './shared/components/Svg'
import eyeSvg from './assets/svg/eye.svg'

const Wrap = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2px;
  padding: var(--size-xlg);
  height: 100%;
  width: 400px;
`
const Column = styled.div`
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 2px;
`

type IListItem = { isSelected: boolean; isCorrect?: boolean; isIncorrect?: boolean }
const ListItem = styled.div<IListItem>`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border: 2px solid #404040;
  border-radius: 2px;
  color: #919191;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #9b9b9b;
    color: #9b9b9b;
  };

  ${p => p.isSelected && `
    border-color: #c1c1c1 !important;
    color: #c1c1c1 !important;
  `};

  ${p => p.isCorrect && `
    border-color: #2cda9a !important;
    color: #2cda9a !important;
  `};

  ${p => p.isIncorrect && `
    border-color: #f04e4e !important;
    color: #f04e4e !important;
  `};
`

const Word = styled.div`
  display: flex;
  align-items: baseline;
  font-weight: bold;
`

const Gif = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  rotate: -11deg;
  opacity: 0.3;
`

const Link = styled.a`
  color: #b1b1b1;
  opacity: 0.4;
  font-weight: normal;
  position: absolute;
  right: 12px;
`

const Footer = styled.div`
  display: flex;
  margin-top: 24px;
`

const Questions: React.FC = () => {
  const { data: dictionary, refetch } = useGetDictionaryQuery<any>(10)
  const [trigger, result, lastPromiseInfo, ] = useLazyTranslateQuery()
  const [updateDictionary] = useUpdateDictionaryMutation(undefined)
  const [giphys, setGiphys] = useState<{[key: string]: string}>({})

  const [results, setResults] = useState<
    {
      [key: string]: boolean;
    }
  >({})
  const [selectedWords, setWords] = useState({ english: '', german: '' })

  useEffect(() => {
    if (!result.data) return;
    const resultTest: any = result
    const wordKey = resultTest?.originalArgs[0];
    setGiphys({ ...giphys, [wordKey]: resultTest.data.data.images.original.url})
  }, [result.data])

  if (!dictionary) {
    return <div>Loading...</div>
  }

  function selectWord(language: string, word: string) {
    const wordsSet = { ...selectedWords, [language]: word }
    const { english, german } = wordsSet
    setWords(wordsSet)

    if (!english || !german) return;

    setWords({ english: '', german: ''})
    const isValid = !!dictionary.data.find(x => x.english === english && x.german === german)
    setResults({ ...results, [english]: isValid, [german]: isValid })
    if (isValid) {
      trigger([english, 0]);
    }
  }

  function determineSelected(language: string, word: string) {
    return selectedWords[language] === word
  }

  function determineCorrect(word:string) {
    return results[word] === true
  }

  function determineIncorrect(word:string) {
    return results[word] === false
  }

  const englishWords = dictionary.data.map(x => x.english).sort()
  const germanWords = dictionary.data.map(x => x.german).sort()
  const germanToEnglish = dictionary.data.reduce((acc, cur) => ({ ...acc, [cur.german]: cur.english}), {})

  function onSvgLinkClick(event) {
    event.stopPropagation()
  }

  function onSvgPriorityClick(word: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    event.stopPropagation();
    updateDictionary({ word, priority: 2 })
  }

  function renderWords(language, words) {
    return words.map(word => (
      <ListItem key={word}
        isSelected={determineSelected(language, word)}
        isCorrect={determineCorrect(word)}
        isIncorrect={determineIncorrect(word)}
        onClick={() => selectWord(language, word)}
      >
        <Word>{word}</Word>
        {language === 'german' &&
          <div>
            {/* <Link target="_blank" href={`https://www.linguee.com/english-german/search?source=german&query=${word}`}>
              <Svg svg={eyeSvg} size={1.6} onClick={onSvgLinkClick} />
            </Link> */}
            <Svg svg={eyeSvg} size={1.6} onClick={(event) => onSvgPriorityClick(word, event)} />
          </div>
        }
        {language === 'german' && determineCorrect(word) && giphys[germanToEnglish[word]] && (
          <Gif src={giphys[germanToEnglish[word]]} />
        )}
      </ListItem>
    ))
  }

  return (
    <Wrap>
      {/* <Columns> */}
        <Column>
          {renderWords('english', englishWords)}
        </Column>
        <Column>
          {renderWords('german', germanWords)}
        </Column>
      {/* </Columns>
      <Footer>
        <button onClick={refetch}>Reload</button>
      </Footer> */}
    </Wrap>
  )
}

export default Questions
