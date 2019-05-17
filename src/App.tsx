import React, { useMemo, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row } from 'react-bootstrap'
import { DragDropContext } from 'react-beautiful-dnd';

import KanbanColumn from './components/KanbanColumn';
import { statement } from '@babel/template';

enum Columns {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type Card = {
  id: string,
  title: string,
  assignee?: string,
  points?: number,
  description?: string,
  column: Columns,
}

const initialCard: Card[] = [
  {
    id: '1',
    title: 'Card One',
    column: Columns.TODO,
  },
  {
    id: '2',
    title: 'Card Two',
    column: Columns.IN_PROGRESS,
  },
  {
    id: '3',
    title: 'Card Three',
    column: Columns.IN_PROGRESS,
  },
]

const initialColumns = [
  {
    title: 'Todo',
    type: Columns.TODO,
  },
  {
    title: 'In Progress',
    type: Columns.IN_PROGRESS,
  },
  {
    title: 'Done',
    type: Columns.DONE,
  },
]

function App() {

  /**
   * State
   */
  const [cards, setCards] = useState(initialCard);
  const [columns, setColumns] = useState(initialColumns);

  /**
   * Memos
   */
  const groupedCards = useMemo(groupedCardsMemo, []);

  return (
    <div className="App" style={{ height: '100vh' }}>
      <DragDropContext onDragEnd={console.log}>
        <Container className="h-100">
          <Row className="h-100">
            {columns.map(c => (
              <KanbanColumn
                title={c.title}
                cards={groupedCards[c.type]}
              />
            ))}
          </Row>
        </Container>
      </DragDropContext>
    </div>
  );

  function groupedCardsMemo() {
    return cards.reduce((acc, nextCard) => {
      acc[nextCard.column].push(nextCard);
      return acc;
    }, {
        [Columns.TODO]: [] as Card[],
        [Columns.IN_PROGRESS]: [] as Card[],
        [Columns.DONE]: [] as Card[],
      })
  }
}

export default App;
