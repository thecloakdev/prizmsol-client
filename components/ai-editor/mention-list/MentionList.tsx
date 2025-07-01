import './MentionList.scss'
import './styles.scss'

import { cn } from '@/lib/utils'
import {
  forwardRef, useEffect, useImperativeHandle,
  useState,
} from 'react'

export default forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]

    if (item) {
      props.command({ id: item })
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))

  return (
    <div className="flex flex-col border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-md rounded-md p-1">
      {props.items.length
        ? props.items.map((item: any, index: number) => (
          <button
            className={cn('p-2 flex justify-start bg-neutral-100 dark:bg-neutral-900 rounded-md', {
              'bg-neutral-200 dark:bg-neutral-800': index === selectedIndex,
            })}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item}
          </button>
        ))
        : <div className="flex p-1">No result</div>
      }
    </div>
  )
})
