"use client"

import { Reorder, useMotionValue } from 'framer-motion'
import React from 'react'
import { useRaisedShadow } from './use-raised-shadow'  

interface Props {
    item: string
}

const Item = ({ item }: Props) => {
    const y = useMotionValue(0)
    const boxShadow = useRaisedShadow(y)
    return (
        <Reorder.Item value={item} id={item} style={{ boxShadow, y }}>
            <span>{ item }</span>
        </Reorder.Item>
    )
}

export default Item