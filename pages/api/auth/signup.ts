import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Invalid Call" });
    return;
  }
  await mongooseConnect();
  const { name, email, password } = req.body;

  if (!email || !email.includes("@") || !password || !name) {
    res.status(400).json({ message: "Invalid Data" });
    return;
  }

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const _ = await User.create({
    name,
    email,
    password: await hash(password, 12),
  });
  res.status(201).json({ message: "User created" });
};

export default handler;
