import { Schema, model, InferSchemaType } from "mongoose";

const PostsSchema = new Schema({
  username: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Auto-generates type safely from schema
type IPosts = InferSchemaType<typeof PostsSchema>;

export default model<IPosts>("Posts", PostsSchema);
