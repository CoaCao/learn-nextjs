import { MainLayout } from '@/components/layout'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { TextEditDiv } from './TextEditDiv'

export default function Demo() {
    const setCursor = (pos: number) => {
        const tag = document.getElementById('editable')

        // Creates range object
        const setpos = document.createRange()

        // Creates object for selection
        const set = window.getSelection()

        // Set start position of range
        if (tag) {
            setpos.setStart(tag.childNodes[0], pos)
        }

        // Collapse range within its boundary points
        // Returns boolean
        setpos.collapse(true)

        // Remove all ranges set
        set?.removeAllRanges()

        // Add range with respect to range object.
        set?.addRange(setpos)

        // Set cursor on focus
        tag?.focus()
    }

    const divRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const [caretPosition, setCaretPosition] = useState<number>(0)
    // const [fixedText, setFixedText] = useState<string>('123456789&nbsp;')
    const [fixedText, setFixedText] = useState<string>('123456789 ')
    const [inputText, setInputText] = useState<string>('')

    // const setCaret = (contenteditableElement: HTMLElement, node: Node, position: number): void => {
    const setCaret = (position: number): void => {
        const node = divRef.current?.firstChild
        if (!node) {
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

    const setFirstSpan = (): void => {
        const childNodes = divRef.current?.childNodes
        if (!childNodes) {
            return
        }

        const selection = window.getSelection()
        if (!selection) return

        // alert(childNodes.length)
        // Create a new range
        const range = document.createRange()
        // range.setStart(node, position)
        // if (childNodes.length === 3) {
        //     range.setStartAfter(childNodes[0])
        // }

        // if (childNodes.length === 2) {
        //     range.setStartAfter(childNodes[0])
        // }

        range.setStartAfter(childNodes[0])
        // range.setStartBefore(childNodes[2])

        range.collapse(true)

        // Remove the current range
        selection.removeAllRanges()

        // Add the new range
        selection.addRange(range)

        // Focus on the contenteditable element instead of the node if needed.
        divRef.current?.focus()
    }

    const setCaretTo = (caretPos: number) => {
        if (caretPos < 0) {
            setCaretPosition(0)
        } else {
            if (caretPos > fixedText.length) {
                setCaretPosition(fixedText.length)
            } else {
                setCaretPosition(caretPos)
            }
        }

        divRef.current?.focus()
    }

    const addText = (text: string) => {
        setInputText(inputText + text)
        // setCaretPosition(0)
    }

    useEffect(() => {
        // setCaret(caretPosition)
        divRef.current?.focus()
    }, [])

    return (
        <>
            <TextEditDiv caretPosition={caretPosition} divRef={divRef} fixedText={fixedText} inputText={inputText} />

            <input type="button" onClick={() => setCaretTo(caretPosition - 1)} value="Back" />
            <input type="button" onClick={() => setCaretTo(caretPosition + 1)} value="Next" />
            <input type="button" onClick={() => addText('A')} value="Input Text" />
        </>
    )
}

Demo.Layout = MainLayout
