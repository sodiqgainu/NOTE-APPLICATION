import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import NoteCard from '../../components/cards/NoteCard'

const Home = () => {
  return (
   <>
    <Navbar/>


    <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <NoteCard 
          title="Meeting you on 3rd July" 
          date="3rd Jul 2024" 
          content="lorem ipsum dolor atit pete"
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
          />

<NoteCard 
          title="Meeting you on 3rd July" 
          date="3rd Jul 2024" 
          content="lorem ipsum dolor atit pete"
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
          />

<NoteCard 
          title="Meeting you on 3rd July" 
          date="3rd Jul 2024" 
          content="lorem ipsum dolor atit pete"
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
          />

<NoteCard 
          title="Meeting you on 3rd July" 
          date="3rd Jul 2024" 
          content="lorem ipsum dolor atit pete"
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
          />

<NoteCard 
          title="Meeting you on 3rd July" 
          date="3rd Jul 2024" 
          content="lorem ipsum dolor atit pete"
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
          />

<NoteCard 
          title="Meeting you on 3rd July" 
          date="3rd Jul 2024" 
          content="lorem ipsum dolor atit pete"
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
          />

<NoteCard 
          title="Meeting you on 3rd July" 
          date="3rd Jul 2024" 
          content="lorem ipsum dolor atit pete"
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
          />
        </div>
    </div>
   </>
  )
}

export default Home