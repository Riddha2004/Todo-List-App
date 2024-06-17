import Form from "@/components/layout/Form";

export default function Home() {
  return (
  <>
   <header>
     <h1 className="font-bold text-center mt-8 text-3xl">ToDo List</h1>
   </header>
   <main className="p-8">
       <Form/>
   </main>
  </>
  );
}