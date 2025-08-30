"use client"
import React, { CSSProperties, ReactElement, useState } from 'react';
import styled from '@emotion/styled';
import type { DropResult } from '@hello-pangea/dnd';
import { DragDropContext } from '@hello-pangea/dnd';
import type { Itinerary, Quote } from './types';
import QuoteList from './quote-list';
import reorder from './reorder';
import { grid } from './constants';
import ItineraryList from './itinerary-list';

const Root = styled.div`
  /* flexbox */
  padding-top: ${grid * 2}px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

interface Props {
  initial: Itinerary[];
  isCombineEnabled?: boolean;
  listStyle?: CSSProperties;
}

export default function ItineraryApp(props: Props): ReactElement { 
  const [itineraries, setItineraries] = useState(() => props.initial);

  function onDragStart() {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }

  function onDragEnd(result: DropResult) {
    // combining item
    if (result.combine) {
      // super simple: just removing the dragging item
      const newItineraries: Itinerary[] = [...itineraries];
      newItineraries.splice(result.source.index, 1);
      setItineraries(newItineraries);
      return;
    }

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newQuotes = reorder(
      itineraries,
      result.source.index,
      result.destination.index,
    );

    setItineraries(newQuotes);
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Root>
        <ItineraryList
          listId="list"
          style={props.listStyle}
          itineraries={itineraries}
          isCombineEnabled={props.isCombineEnabled}
        />
      </Root>

      
    </DragDropContext>
  );
}