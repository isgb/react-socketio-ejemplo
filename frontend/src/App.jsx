import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('/');

const App = props => {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])

  function handleSubmmit(e){
      e.preventDefault();
      // console.log(message);
      // para mandarlo al consola server/ backend
      const newMessage = {
        body: message,
        from: 'Me'
      }

      setMessages([...messages,newMessage])
      socket.emit('message', message)
  };

  useEffect(() =>{
    // escuchar y renderizar al server
    socket.on('message', receiveMessage);
    
    return () => {
      // Apagar el evento para que no vuelva a renderizar
      socket.off("message", receiveMessage);
    };

  },[]);

  const receiveMessage = (message) =>{ 
        // state: es el state anterior
        
        setMessages(state => [...state, message])
        // console.log(message)
      }

  return (
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>

      <form onSubmit={handleSubmmit} className=' bg-zinc-900 p-10'>
        <h1 className=' text-2xl font-bold my-2'>Chat React</h1>
        <input type="text" 
         placeholder='Write your message...'
         className='border-2 border-zinc-500 p-2 w-full'
         onChange={(e) => setMessage(e.target.value)}
        />
        <button>
          Send
        </button>
      </form>

      <ul>
        {
          messages.map((message,i) => (
            <li key={i}>
              {message.from} : {message.body}
            </li>
          ))
        }
      </ul>

    </div>
  )
}

export default App