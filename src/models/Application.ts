import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  name: string;
  email: string;
  phone: string;
  position: string;
  message?: string;
  createdAt: Date;
}

const ApplicationSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

