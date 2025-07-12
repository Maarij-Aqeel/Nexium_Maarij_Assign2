// Api Endpoint to Send data to DB

import dbConnect from "@/lib/mongodb";
import Item from "@/models/item";

export async function POST(request) {
  try {
    await dbConnect();

    const { url, title, fullText, dateTime } = await request.json();

    const newItem = new Item({
      url,
      title,
      fullText,
      dateTime: dateTime ? new Date(dateTime) : new Date(),
    });

    await newItem.save();

    return Response.json({ success: true, data: newItem });
  } catch (error) {
    console.error("Error saving item:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
