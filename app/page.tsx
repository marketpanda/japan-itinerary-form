"use client"

import { useState } from "react";
import QuoteAppDemo from "./components/DragDropClient";
import { Reorder } from "framer-motion";
import Item from "./components/Item";
import Itinerary from "./components/Itinerary";
import ItineraryItem from "./components/Itinerary";

import {Button, Calendar, CalendarCell, CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeaderCell, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Label, Popover} from 'react-aria-components';
import type {ButtonProps, PopoverProps} from 'react-aria-components';
import {ChevronLeft, ChevronRight, ChevronsUpDown} from 'lucide-react';


export interface Itinerary {
  Date: string
  ActivityPlan: string
  Contact: string
  Accommodation: string
}

export default function Home() {

  const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

  const initialItineraries:Itinerary[] = [{
      Date: new Date().toDateString(),
      ActivityPlan: 'Disneyland',
      Contact: '8888-8888',
      Accommodation: 'Apa Hotel'
    },
      {
      Date: new Date().toDateString(),
      ActivityPlan: 'Shrine',
      Contact: '8888-8888',
      Accommodation: 'Apa Hotel'
      }
  ]
  
  const [itineraries, setItineraries] = useState<Itinerary[] | []>(initialItineraries)

  console.log('itineraries ', itineraries)
  const [items, setItems] = useState(initialItems)

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
  

  return (
    // <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    <div>
      {/* <QuoteAppDemo /> */}
      {/* <Reorder.Group axis="y" onReorder={setItems} values={items}>
        {items.map((item) => (
          <Item key={item} item={item} />
        ))}
      </Reorder.Group> */}
    
      <Reorder.Group axis="y" onReorder={setItineraries} values={itineraries}>
        <div
          className="bg-white shadow-lg mx-auto my-4 p-8"
          style={{ width: "210mm", minHeight: "297mm" }}
        >
           <DatePicker className="group flex flex-col gap-1 w-[200px]"> 
                <Group className="flex rounded-lg bg-white/90 focus-within:bg-white group-open:bg-white transition pl-3 shadow-md text-gray-700 focus-visible:ring-2 ring-black">
                    <DateInput className="flex flex-1 py-2">
                    {(segment) => (
                        <DateSegment
                        segment={segment}
                        className="px-0.5 tabular-nums outline-hidden rounded-xs focus:bg-violet-700 focus:text-white caret-transparent placeholder-shown:italic"
                        />
                    )}
                    </DateInput>
                    <Button className="outline-hidden px-3 flex items-center text-gray-700 transition border-0 border-solid border-l border-l-purple-200 bg-transparent rounded-r-lg pressed:bg-purple-100 focus-visible:ring-2 ring-black">
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

          <div>
            <div>Itinerary in Japan</div>
            <div>The itinerary in Japan of the visa applicant(s) is as follows</div>
            <ul  className="flex w-full justify-between">
              <li>Date</li>
              <li>Activity</li>
              <li>Contact</li>
              <li>Accommodation</li>
            </ul>
          </div>

          {itineraries.map((itinerary) => (
            <ItineraryItem key={itinerary.ActivityPlan} itinerary={itinerary} />
          ))}
        </div>
      </Reorder.Group>

    </div>
  );
}
