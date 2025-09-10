"use client"

import { forwardRef, useRef, useState } from "react";
import QuoteAppDemo from "./components/DragDropClient";
import { Reorder } from "framer-motion";
import Item from "./components/Item";
import Itinerary from "./components/Itinerary";
import ItineraryItem from "./components/Itinerary";

import {Button, Calendar, CalendarCell, CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeaderCell, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Label, Popover} from 'react-aria-components';
import type {ButtonProps, PopoverProps} from 'react-aria-components';
import {ChevronLeft, ChevronRight, ChevronsUpDown} from 'lucide-react';
import { useReactToPrint } from "react-to-print";
import { v4 as uuidv4 } from "uuid"

export interface Itinerary {
  id: string,
  Date: string
  ActivityPlan: string
  Contact: string
  Accommodation: string
}

export default function Home() {

  const initialItineraries:Itinerary[] = [
      {
        id: uuidv4(),
        Date: new Date().toDateString(),
        ActivityPlan: 'Disneyland',
        Contact: '8888-8888',
        Accommodation: 'Apa Hotel'
      },
      {
        id: uuidv4(),
        Date: new Date().toDateString(),
        ActivityPlan: 'Shrine',
        Contact: '8888-8888',
        Accommodation: 'Apa Hotel'
      },
      ...Array.from({length: 8}, () => ({
        id: uuidv4(),
        Date: '',
        ActivityPlan: '',
        Contact: '',
        Accommodation: ''
      }))
  ]
  
  const [itineraries, setItineraries] = useState<Itinerary[] | []>(initialItineraries)
  
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


  const handleAfterPrint = () => {
    console.log('after print')
  }
  const handleBeforePrint = async() => {
    console.log('before print')
  }
 
  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Japan Itinerary",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint
  })

 

 

  return (
     <div className="flex justify-center">
      <div onClick={handlePrint} className="fixed top-2 right-2 cursor-pointer">print</div> 
      <Reorder.Group axis="y" onReorder={setItineraries} values={itineraries}>
        <div
          className="bg-white shadow-lg mx-auto my-4 p-8 relative border-1 border-dashed border-gray-300"
          style={{ width: "210mm", minHeight: "297mm" }}
          ref={componentRef} 
        >
          <div className="absolute top-[60px] w-[654px] justify-right text-right border-0 left-1/2 -translate-x-1/2">
            <DatePicker className="absolute group flex flex-col gap-1 w-[180px] text-right right-0"> 
              <Group className="flex  bg-white/90 focus-within:bg-white group-open:bg-white transition pl-3  text-gray-700 focus-visible:ring-2 border-1 ring-black">
                      <DateInput className="flex flex-1 py-2">
                      {(segment) => (
                          <DateSegment
                          segment={segment}
                          className="px-0.5 tabular-nums outline-hidden rounded-xs focus:bg-violet-700 focus:text-white caret-transparent placeholder-shown:italic print:placeholder-shown:hidden"
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
           </div>

          <div className="absolute top-[112px] w-[654px] justify-center left-1/2 -translate-x-1/2">
            <div className="font-serif text-2xl text-center border-0 mb-4">Itinerary in Japan</div>
            <div className="font-serif text-sm border-0">The itinerary in Japan of the visa applicant(s) is as follows</div>
          </div>

          <div className="absolute top-[188px] w-[654px] justify-center left-1/2 -translate-x-1/2">
            <ul  className="flex justify-between h-[44px] divide-x divide-black border-1 border-b-0">
              <li className="w-[96px] flex items-end justify-center bg-white font-serif text-sm">Date</li>
              <li className="w-[274px] flex items-end justify-center bg-white font-serif text-sm">Activity</li> 
              <li className="w-[114px] flex items-end justify-center bg-white font-serif text-sm">Contact</li> 
              <li className="w-[171px] flex items-end justify-center  bg-white font-serif text-sm">Accommodation</li>  
            </ul>
            {itineraries.map((itinerary) => (
              <ItineraryItem key={itinerary.id} itinerary={itinerary} />
            ))}
          </div>
        </div>
      </Reorder.Group>

    </div>
  );
}
