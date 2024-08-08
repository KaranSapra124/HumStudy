import { useEffect, useState } from 'react';
import { FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';
import { MdAddCircle, MdDelete } from 'react-icons/md';
import  todos from '../../../dummyData.json';
import { BsClockFill } from 'react-icons/bs';

export default function Todos() {
  const [todoes, setTodos] = useState(todos);
  const [activeType, setActiveType] = useState('pending');
  const [shownTasks, setShownTasks] = useState(
    todoes.filter((item) => item.status === activeType)
  );

  useEffect(() => {
    setShownTasks(todoes.filter((item) => item.status === activeType));
  }, [activeType, todoes]);
  return (
    <div className="lg:col-span-5 col-span-12 rounded-md bg-white min-h-[200px] shadow-md shadow-gray-300">
      <div className="flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={() => setActiveType('pending')}
            className="p-2 rounded-md border border-primary text-primary bg-transparent hover:bg-tl_primary hover:text-white transition-all duration-300"
          >
            <BsClockFill />
          </button>
          <button
            type="button"
            onClick={() => setActiveType('completed')}
            className="p-2 rounded-md border border-primary text-primary bg-transparent hover:bg-tl_primary hover:text-white transition-all duration-300"
          >
            <FaCalendarCheck />
          </button>
        </div>
        <button
          type="button"
          // onClick={handleAddNew}
          className="p-2 rounded-md border border-primary text-primary bg-transparent hover:bg-tl_primary hover:text-white transition-all duration-300"
        >
          <MdAddCircle />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {shownTasks?.map((item, i) => (
          <Todo handleUpdate={()=>{}} key={i} data={item} />
        ))}
      </div>
    </div>
  );
}

const Todo = ({ handleUpdate, data }) => {
  const handleCheck = () => {};

  const handleDelete = () => {};

  return (
    <div className="relative hover:scale-110 transition-all duration-300 flex items-center gap-5 p-2 border rounded-md">
      <p>{data.task}</p>
      <div className="flex items-center gap-4">
        {data.status === 'pending' && (
          <button
            type="button"
            onClick={handleCheck}
            className="p-2 rounded-md border border-primary text-primary bg-transparent hover:bg-tl_primary hover:text-white transition-all duration-300"
          >
            <FaCheckCircle />
          </button>
        )}
        <button
          type="button"
          onClick={handleDelete}
          className="p-2 rounded-md border border-primary text-primary bg-transparent hover:bg-tl_primary hover:text-white transition-all duration-300"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};
