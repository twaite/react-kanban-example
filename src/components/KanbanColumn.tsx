import React from 'react';

import { Col, Card as BCard } from 'react-bootstrap';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Card } from '../App';

type Props = {
  title: string;
  cards: Card[];
};

export default function KanbanColumn(props: Props) {
  return (
    <Col lg={4} className="p-2">
      <div className="bg-light h-100">
        <div className="text-center p-2">
          <h3>{props.title}</h3>
        </div>
        <Droppable droppableId={`droppable-${props.title}`}>
          {(provided, snapshot) => (
            <div
              className={snapshot.isDraggingOver ? 'bg-primary h-100' : 'h-100'}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.cards.map((c, index) => (
                <Draggable draggableId={c.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <BCard className="m-2 p-2">
                        {c.title}
                      </BCard>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </div>
    </Col>
  )
}