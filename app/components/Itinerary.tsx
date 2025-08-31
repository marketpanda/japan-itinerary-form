"use client"

import { Reorder, useMotionValue } from 'framer-motion'
import React, { useState } from 'react'
import { useRaisedShadow } from './use-raised-shadow'  
import { Itinerary } from '../page' 
import "react-datepicker/dist/react-datepicker.css";

import {Button, Calendar, CalendarCell, CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeaderCell, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Label, Popover} from 'react-aria-components';
import type {ButtonProps, PopoverProps} from 'react-aria-components';
import {ChevronLeft, ChevronRight, ChevronsUpDown} from 'lucide-react';



interface Props {
    itinerary: Itinerary
}

const ItineraryItem = ({ itinerary }: Props) => {
    const y = useMotionValue(0)
    const boxShadow = useRaisedShadow(y)



    function RoundButton(props: ButtonProps) {
        return (
            <Button
            {...props}
            className="w-9 h-9 outline-hidden cursor-default bg-transparent text-gray-600 border-0 rounded-full flex items-center justify-center hover:bg-gray-100 pressed:bg-gray-200 focus-visible:ring-3 ring-violet-600/70 ring-offset-2"
            />
        );
    }

    function MyPopover(props: PopoverProps) {
        return (
            <Popover
            {...props}
            className={({ isEntering, isExiting }) => `
                overflow-auto rounded-lg drop-shadow-lg ring-1 ring-black/10 bg-white
                ${
                isEntering
                ? 'animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 ease-out duration-200'
                : ''
            }
                ${
                isExiting
                ? 'animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 ease-in duration-150'
                : ''
            }
            `}
            />
        );
    }

//  <ul  className="flex justify-between h-[44px] divide-x divide-black border-2 ">
//               <li className="w-[96px] flex items-end justify-center">Date</li>
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    return (
        <Reorder.Item value={itinerary} id={itinerary} style={{ boxShadow, y }}
            className="flex h-[44px] divide-x divide-black border-b border-1">
            
            <DatePicker className="group flex flex-col gap-1 w-[96px]"> 
                <Group className="flex items-center justify-center">
                    <DateInput className="flex flex-1 py-2">
                    {(segment) => (
                        <DateSegment
                        segment={segment}
                        className="px-0.5 tabular-nums outline-hidden rounded-xs focus:bg-violet-700 focus:text-white caret-transparent placeholder-shown:italic"
                        />
                    )}
                    </DateInput>
                    <Button className="w-full flex items-center justify-center text-gray-700 bg-white border-0 focus-visible:ring-2 ring-black">
                        <ChevronsUpDown className="w-4 h-4" />
                    </Button>
                </Group>
                <MyPopover>
                    <Dialog className="p-6 text-gray-600">
                    <Calendar>
                        <header className="flex items-center gap-1 pb-4 px-1 font-serif w-full">
                        <Heading className="flex-1 font-semibold text-2xl ml-2" />
                        <RoundButton slot="previous">
                            <ChevronLeft />
                        </RoundButton>
                        <RoundButton slot="next">
                            <ChevronRight />
                        </RoundButton>
                        </header>
                        <CalendarGrid className="border-spacing-1 border-separate">
                        <CalendarGridHeader>
                            {(day) => (
                            <CalendarHeaderCell className="text-xs text-gray-500 font-semibold">
                                {day}
                            </CalendarHeaderCell>
                            )}
                        </CalendarGridHeader>
                        <CalendarGridBody>
                            {(date) => (
                            <CalendarCell
                                date={date}
                                className="w-9 h-9 outline-hidden cursor-default rounded-full flex items-center justify-center outside-month:text-gray-300 hover:bg-gray-100 pressed:bg-gray-200 selected:bg-violet-700 selected:text-white focus-visible:ring-3 ring-violet-600/70 ring-offset-2"
                            />
                            )}
                        </CalendarGridBody>
                        </CalendarGrid>
                    </Calendar>
                    </Dialog>
                </MyPopover>
            </DatePicker> 

            <input className="w-[274px] justify-center text-center" type='text' placeholder='Activity' />
            <input className="w-[114px] justify-center" type='text' placeholder='Contact' />
            <input className="w-[171px] justify-center" type='text' placeholder='Accommodation' />
          
        </Reorder.Item>
    )
}

export default ItineraryItem