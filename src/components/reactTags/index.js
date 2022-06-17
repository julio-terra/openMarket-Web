import React, {useRef, useCallback} from 'react';
import ReactTag from 'react-tag-autocomplete'

import './styles.css';

const ReactTags = ({tags, setTags}) =>{
  const reactTags = useRef()

  const onDelete = useCallback((tagIndex) => {
    setTags(tags.filter((_, i) => i !== tagIndex))
  }, [tags])

  const onAddition = useCallback((newTag) => {
    setTags([...tags, newTag])
  }, [tags])
  const onValidate = useCallback((newTag) => {
    return /^[a-z-0-9]{2,20}$/i.test(newTag.name ? newTag.name : newTag)
  })
  return (
    <ReactTag
      allowNew
      newTagText='Create new tags:'
      ref={reactTags}
      tags={tags}
      suggestions={[]}
      onDelete={onDelete}
      onAddition={onAddition}
      onValidate={onValidate}
    />
  )
}

export default ReactTags;