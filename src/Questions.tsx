import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, List, ListItem, ListIcon } from '@chakra-ui/react'
import { useGetDictionaryQuery } from './api'

const Wrap = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white-smoke);
  padding: var(--size-xlg);
  color: var(--arsenic);
`

const ListItemWrap = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
`
type IWord = { isSelected: boolean; isCorrect?: boolean }

const Word = styled.div<IWord>`
  display: flex;
  align-items: baseline;
  padding: 0 4px;
  cursor: pointer;

  ${p => p.isSelected && 'font-weight: bold'};
  ${p => p.isCorrect && `
    font-weight: bold;
    color: #2cda9a;
  `};
`

const Links = styled.div`
  margin-left: 8px;
  font-size: 10px;
`

const Link = styled.a`
  color: #b1b1b1;
  margin: 0 4px;
  font-weight: normal;
`

const Footer = styled.div`
  display: flex;
  margin-top: 24px;
`

const Header: React.FC = () => {
  const { data: dictionary, refetch } = useGetDictionaryQuery<any>(10)

  useEffect(() => {
    if (dictionary?.data) {
      setResults(dictionary.data)
    }
  }, [dictionary])

  const [results, setResults] = useState<
    {
      english: string;
      german: string;
      isCorrect?: boolean;
    }[]
  >()
  const [{ selectedEnglishWord, selectedGermanWord }, setSelectedWords] = useState<{
    selectedEnglishWord: string;
    selectedGermanWord: string;
  }>({
    selectedEnglishWord: '',
    selectedGermanWord: '',
  })

  if (!dictionary) {
    return <div>Loading...</div>
  }

  function selectWord({
    english = selectedEnglishWord,
    german = selectedGermanWord,
  }: {
    english?: string;
    german?: string;
    correctGerman?: string;
  }) {
    if (!!english && !!german) {
      updateResult(english, german)
      setSelectedWords({
        selectedEnglishWord: '',
        selectedGermanWord: '',
      })
    } else {
      setSelectedWords({
        selectedEnglishWord: english,
        selectedGermanWord: german,
      })
    }
  }
  function updateResult(english, german) {
    setResults(results?.map(x => {
      const isCorrect = x.english === english && x.german === german;

      return {
        ...x,
        isCorrect: isCorrect ? true : x.isCorrect
      }
    }))
  }

  const germanWords = dictionary.data.map(x => x.german).sort()

  return (
    <Wrap>
      <List spacing={3}>
        {dictionary.data.map(({ english }, index) => {
          const randomGermanWord = germanWords[index]
          const isCorrectEnglish = results?.find(x => x.english === english)?.isCorrect
          const isCorrectGerman = results?.find(x => x.german === randomGermanWord)?.isCorrect

          return (
            <ListItem key={english}>
              <ListItemWrap>
                <Word
                  isSelected={english === selectedEnglishWord}
                  isCorrect={isCorrectEnglish}
                  onClick={() => selectWord({ english })}
                >
                  {english}
                </Word>
                <Word
                  isSelected={randomGermanWord === selectedGermanWord}
                  isCorrect={isCorrectGerman}
                  onClick={() => selectWord({ german: randomGermanWord })}
                >
                  {randomGermanWord}
                  <Links>
                    <Link target="_blank" href={`https://www.linguee.com/english-german/search?source=german&query=${randomGermanWord}`}>Linguee</Link>
                  </Links>
                </Word>
              </ListItemWrap>
            </ListItem>
          )
        })}
      </List>
      <Footer>
        <Button colorScheme="blue" onClick={refetch}>Reload</Button>
      </Footer>
    </Wrap>
  )
}

export default Header
