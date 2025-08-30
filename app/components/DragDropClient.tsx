"use client"

import React from "react";
import styled from "@emotion/styled";
import QuoteApp from "./quote-app";
import { getItineraries, getQuotes } from "./data";
import { grid } from "./constants";
import ItineraryList from "./itinerary-list";
import ItineraryApp from "./itinerary-app";

// Same helpers from your story
const generateData = {
  small: () => getQuotes(),
  medium: () => getQuotes(40),
  large: () => getQuotes(500),
  smallItineraries: () => getItineraries(),
  
};

const ScrollContainer = styled.div`
  box-sizing: border-box;
  background: lightgrey;
  padding: ${grid * 2}px;
  overflow-y: scroll;
  width: 500px;
  height: 100vh;
  position: relative;
`;

const Title = styled.h4`
  text-align: center;
  margin-bottom: ${grid}px;
`;

// Your "demo" page
export default function QuoteAppDemo() {
  return (
    <div style={{ display: "grid", gap: "2rem", padding: "2rem" }}>
      <section>
        <ItineraryApp initial={generateData.smallItineraries()} />
      </section>

      {/* <section>
        <h2>Large Data Set</h2>
        <QuoteApp initial={generateData.large()} />
      </section>

      <section>
        <h2>Droppable is a Scroll Container</h2>
        <QuoteApp
          initial={generateData.medium()}
          listStyle={{
            overflowY: "scroll",
            maxHeight: "80vh",
            position: "relative",
          }}
        />
      </section>

      <section>
        <h2>Within a Larger Scroll Container</h2>
        <ScrollContainer>
          <Title>List is within a larger scroll container</Title>
          <QuoteApp initial={generateData.medium()} />
        </ScrollContainer>
      </section>

      <section>
        <h2>With Combine Enabled</h2>
        <QuoteApp initial={generateData.small()} isCombineEnabled />
      </section> */}
    </div>
  );
}
