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
  // return "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5aOU1GM0JDNkQifQ.eyJpc3MiOiJTMjUyTDVDMjQ3IiwiaWF0IjoxNjE4NjcwMTk1LCJleHAiOjE2NTM0ODkzOTV9.uVsCpjMMUXQw-Ax_n3T8p0eAmjmTt91kpOGRnfth5_dIO5rkAplXKuB0v_cuv4LPg5v4sHTVNWpOun2L7VCzrw"
};

export default fn;
