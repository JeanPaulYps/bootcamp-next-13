import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(501).json({
      message: "This method is not implemented",
    });
  }

  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    city,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    city: string;
  } = req.body;
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "First name is Invalid",
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Last name is Invalid",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is Invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone number is Invalid",
    },
    {
      valid: validator.isLength(city, {
        min: 1,
      }),
      errorMessage: "City is Invalid",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password is not strong enough",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return res.status(400).json({
      errorMessage: errors[0],
    });
  }

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithEmail) {
    return res.status(400).json({
      errorMessage: "Email associated with another account",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      password: hashedPassword,
      city,
      phone,
      email,
    },
  });

  const alg = "HS256";

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({
    email: user.email,
  })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  res.status(200).json({
    hello: token,
  });
}
