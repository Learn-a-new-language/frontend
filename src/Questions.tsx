import React, { useState } from 'react'
import styled from 'styled-components'
import { useGetDictionaryQuery } from './api'
import Svg from './shared/components/Svg'
import eyeSvg from './assets/svg/eye.svg'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--size-xlg);
`

const Columns = styled.div`
  display: flex;
`
const Column = styled.div`
  margin: 0 2px;
`

type IListItem = { isSelected: boolean; isCorrect?: boolean; isIncorrect?: boolean }
const ListItem = styled.div<IListItem>`
  display: flex;
  margin: 2px 0;
  width: 200px;
  justify-content: space-between;
  padding: 8px 12px;
  border: 2px solid #404040;
  border-radius: 2px;
  color: #919191;
  cursor: pointer;
  position: relative;

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
  const { data: dictionary, refetch } = useGetDictionaryQuery<any>(25)

  const [results, setResults] = useState<
    {
      [key: string]: boolean;
    }
  >({})
  const [selectedWords, setWords] = useState({ english: '', german: '' })

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

  function renderWords(language, words) {
    function onSvgClick(event) {
      event.stopPropagation()
    }
    return words.map(word => (
      <ListItem key={word}
        isSelected={determineSelected(language, word)}
        isCorrect={determineCorrect(word)}
        isIncorrect={determineIncorrect(word)}
        onClick={() => selectWord(language, word)}
      >
        <Word>{word}</Word>
        {language === 'german' &&
          <Link target="_blank" href={`https://www.linguee.com/english-german/search?source=german&query=${word}`}>
            <Svg svg={eyeSvg} size={1.6} onClick={onSvgClick} />
          </Link>
        }
      </ListItem>
    ))
  }

  return (
    <Wrap>
      <Columns>
        <Column>
          {renderWords('english', englishWords)}
        </Column>
        <Column>
          {renderWords('german', germanWords)}
        </Column>
      </Columns>
      <Footer>
        <button onClick={refetch}>Reload</button>
      </Footer>
    </Wrap>
  )
}

export default Questions
