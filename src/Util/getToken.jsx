import jwt from "jsonwebtoken";

let authKey =
  "-----BEGIN PRIVATE KEY-----\n" +
  "MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgBLKsRK8+cAyNGtGv\n" +
  "g6Q+VKx/1x9Smd5+XgCo+bDF9WagCgYIKoZIzj0DAQehRANCAARBneFfkSxB2rQE\n" +
  "fPvuF4C3HW0NViWpmgsIHk4fQacHu7BPt0d0bow3bOYBniqlOe56b+/UbTsTLpoX\n" +
  "dVZrs19W\n" +
  "-----END PRIVATE KEY-----";

const fn = async () => {
  const header = {
    alg: "ES256",
    kid: "NZ9MF3BC6D",
    typ: "JWT",
  };

  const payload = {
    iss: "S252L5C247",
    iat: Number((new Date().getTime() / 1000).toFixed()),
    exp: Number((new Date().getTime() / 1000).toFixed()) + 1800,
  };

  const res = jwt.sign(payload, authKey, { header });

  console.log(res);
  return res;
  // return "eyJhbGciOiJFUzI1NiIsImtpZCI6Ik5UTjY3NFVRM1AiLCJ0eXAiOiJKV1QifQ.eyJhbGciOiJFUzI1NiIsImlzcyI6IjJaN0Y0UDQ5MjUiLCJpYXQiOjE2MTg2Nzg4NTgsImV4cCI6MTYxODY4MDY1OH0.MEUCIG3l+Bvb6QNdVoqWoweMIruuCa9vcVhg4Iew/UGPFiqlAiEA8tkiGmxXSlf7QLqBcw6FpqfHFdJjKweMkv2BpRiXxJk="
};

export default fn;
