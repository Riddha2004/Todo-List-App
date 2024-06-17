import { Manager } from "@/models/manager";
import mongoose from "mongoose"

export async function POST(req) {
  const body = await req.json(); 
  mongoose.connect("mongodb+srv://riddharc2004:EMJOwRuPzh8mKdK9@cluster0.dwp55th.mongodb.net/TodoList");
  const createdInfo = await Manager.create(body)
  return Response.json(createdInfo);
}

export async function GET() {
    mongoose.connect("mongodb+srv://riddharc2004:EMJOwRuPzh8mKdK9@cluster0.dwp55th.mongodb.net/TodoList");
    return Response.json(
        await Manager.find()
    );
}
export async function DELETE(req) {
    mongoose.connect("mongodb+srv://riddharc2004:EMJOwRuPzh8mKdK9@cluster0.dwp55th.mongodb.net/TodoList");
    const url =  new URL(req.url);
    const _id = url.searchParams.get('_id');
    await Manager.deleteOne({_id});
    return Response.json(true);
}