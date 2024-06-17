"use client";
import { useState,useEffect } from "react";
import Trash from "@/components/icons/Trash"
import toast from "react-hot-toast";
export default function Form(){
    const [task, setTask] = useState('');
    const [info, setInfo] = useState([]);
    const [show,setShow] = useState(false);
    useEffect(()=>{
      fetchInfo();
    },[]);

    function fetchInfo() {
       fetch('/api/manager').then(res => {
        res.json().then(info => {
            setInfo(info);
        });
       });
    }

    async function handleTask(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async(resolve,reject)=>{
            const response = await fetch('/api/manager', {
               method:'POST' ,
               headers: {'Content-Type':'application/json'},
               body: JSON.stringify({task}),
            });
            setTask('');
            fetchInfo();
            if(response.ok)
                resolve();
            else
               reject();
        });
        await toast.promise(creationPromise, {
            loading: 'Creating your new Task',
            success:'New Task Created',
            error:'Error, sorry...'
        });
    }
    async function handleDeleteClick(_id) {
        const promise = new Promise(async(resolve,reject) => {
          const response = await fetch('/api/manager?_id='+_id, {
               method: 'DELETE',
          }); 
          if(response.ok) {
            resolve();
          } else {
            reject();
          }
        });

        await toast.promise(promise,{
           loading: 'Deleting....',
           success: 'Deleted',
           error: 'Error',

        });
        fetchInfo();
    }
    return (
     <section className="mt-8 max-w-2xl mx-auto">
         <form className="mx-16" onSubmit={handleTask}>
              <label className="text-[16px] my-2 flex items-center justify-center">
                 New Task:
              </label>
              <div className="flex items-center justify-center">
                <input type="text" className="w-[24rem] h-10 mx-2 py-2 border border-black rounded-lg px-2" value={task} placeholder="Task"  onChange={ev => setTask(ev.target.value)}/>
                <button className="border rounded-lg bg-blue-600 py-2 px-4 text-white font-semibold" type="submit">Add</button>
              </div>
        </form>
        <div className="mt-8">
           <h2 classsName="mt-8 text-sm text-gray-500">Existing Tasks:</h2>
            {info?.length > 0 && info.map( i => (
                <div
                  key={i._id}
                  className="bg-green-500 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center justify-between">
                   <div
                    className="grid grid-cols-2 gap-36 md:grow md:gap-4">
                     <div className="text-white font-semibold">
                       {i.task}
                     </div>
                   </div>
                   <div className="flex gap-2">
                     <button onClick={()=>handleDeleteClick(i._id)} className="border border-white p-1 rounded-lg">
                        <Trash/>
                     </button>
                  </div>
                </div>
            ))}
          </div>
     </section>
    );
}
// #EMJOwRuPzh8mKdK9