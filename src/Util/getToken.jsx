// import { SignJWT } from "jose/jwt/sign";
import jwt from "jsonwebtoken";
import * as fs from "fs";
import p8 from "src/Assets/AuthKey_NZ9MF3BC6D.p8";

let authKey = "-----BEGIN PRIVATE KEY-----MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgBLKsRK8+cAyNGtGvg6Q+VKx/1x9Smd5+XgCo+bDF9WagCgYIKoZIzj0DAQehRANCAARBneFfkSxB2rQEfPvuF4C3HW0NViWpmgsIHk4fQacHu7BPt0d0bow3bOYBniqlOe56b+/UbTsTLpoXdVZrs19W-----END PRIVATE KEY-----"

const fn = async () => {
  const header = {
    alg: "ES256",
    kid: "NZ9MF3BC6D",
    typ: "JWT"
  };

  const payload = {
    iss: "S252L5C247",
    iat: Number((new Date().getTime() / 1000).toFixed()),
    exp: Number((new Date().getTime() / 1000).toFixed()) + 1000,
  };

  //   let encoded = "eyJhbGciOiJFUzI1NiIsImtpZCI6Ik5aOU1GM0JDNkQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJTMjUyTDVDMjQ3IiwiaWF0IjoxNjE4NjY1MTczLCJleHAiOjE2MzQ0NDM5OTl9.nZ9ZOwnqx72nsGf0QUG-j-1un6tTd2t5eKzkeggI4rweOOC-zB48W2miopcIOttvbbOPP2eZy3NZWQhF4jfn9w"
  //   let jwt = await new SignJWT({ "urn:example:claim": true })
  //     .setProtectedHeader(header)
  //     .setIssuedAt(Number((new Date().getTime() / 1000).toFixed()))
  //     .setExpirationTime("1h")
  //     .setIssuer("S252L5C247");

  //   let res = await jwt.sign(authKey);

  const res = jwt.sign(payload, authKey, { header });

  console.log(res);
  return res;
  //   let authorizatonToken = jwt.sign(payload, authKey, { header: header });

  //   return encoded;
};

export default fn;
