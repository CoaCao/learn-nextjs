/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, Ref, useEffect } from 'react'

type TextEditDivProps = {
    divRef: MutableRefObject<HTMLDivElement | null>
    fixedText: string
    inputText: string
    caretPosition: number
}

export const TextEditDiv = ({ divRef, fixedText, inputText, caretPosition }: TextEditDivProps) => {
    const leftText = fixedText.slice(0, caretPosition)
    const rightText = fixedText.slice(caretPosition)

    const setCaret = (): void => {
        divRef.current?.focus()

        const childNodes = divRef.current?.childNodes

        if (!childNodes || fixedText.length < caretPosition || caretPosition < 0) {
            return
        }

        const selection = window.getSelection()
        if (!selection) return

        // Create a new range
        const range = document.createRange()

        if (childNodes.length === 3) {
            range.setStartAfter(childNodes[1])
        }

        if (childNodes.length === 2) {
            if (caretPosition === 0) {
                range.setStartAfter(childNodes[0])
            } else {
                range.setStartAfter(childNodes[1])
            }
        }

        range.collapse(true)

        // Remove the current range
        selection.removeAllRanges()

        // Add the new range
        selection.addRange(range)

        // Focus on the contenteditable element instead of the node if needed.
        divRef.current?.focus()
    }

    const moveCaret = (position: number): void => {
        const node = divRef.current?.firstChild

        if (!node || fixedText.length < caretPosition || caretPosition < 0) {
            return
        }

        const selection = window.getSelection()
        if (!selection) return

        // Create a new range
        const range = document.createRange()

        range.setStart(node, position)
        range.collapse(true)

        // Remove the current range
        selection.removeAllRanges()

        // Add the new range
        selection.addRange(range)

        // Focus on the contenteditable element instead of the node if needed.
        divRef.current?.focus()
    }

    // <span style={{ color: 'red' }}>images and other content to display it in required format. </span>
    //             HTML stands for Hyper Text Markup Language.&nbsp; HTML is a markup language which is used by the browser
    //             to manipulate text,

    // useEffect(() => {
    //     // setCaret(caretPosition)
    //     divRef.current?.focus()
    // }, [])

    useEffect(() => {
        console.log('moveCaret: ', caretPosition)
        moveCaret(caretPosition)

        divRef.current?.focus()
    }, [caretPosition])

    useEffect(() => {
        console.log('setCaret: ', caretPosition)
        setCaret()

        divRef.current?.focus()
    }, [inputText])

    const toHtml = () => {
        let textHtml = fixedText
        if (inputText.length > 0) {
            textHtml = leftText + `<span style='color: red; textDecoration: underline;'>${inputText}</span>` + rightText
        }

        if (textHtml.slice(textHtml.length - 1, textHtml.length) === ' ') {
            textHtml = textHtml.slice(0, textHtml.length - 1) + '&nbsp;'
        }

        console.log('textHtml: ', textHtml)

        return textHtml
    }

    return (
        <>
            <div
                id="editable"
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={divRef}
                style={{ width: '600px', marginLeft: '100px', padding: '5px' }}
                spellCheck={false}
                dangerouslySetInnerHTML={{ __html: toHtml() }}
            >
                {/* {leftText}
                {inputText.length > 0 && <span style={{ color: 'red', textDecoration: 'underline' }}>{inputText}</span>}
                {rightText} */}
            </div>
        </>
    )
}
