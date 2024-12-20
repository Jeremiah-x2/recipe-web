import admin, { ServiceAccount } from "firebase-admin";
import { getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount: ServiceAccount = {
  projectId: "recipes-b4425",
  privateKey:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdCTA+mNVtSTqZ\nrZzMDdpPjCYvJ6l0QAzbB1crDnjLSM0jzomEYcGwrmCdEPFYu8GrAxIjZvkXKxQP\npWecDae2hSWlw2v+IKWy0X3zsVO78zFghVA9bdfSa8ss46tA3P78KmCMguvBB7Rr\nFd6v6+ZTD8eozxPbLr3jqcKcHSDtTI4/7EZDD5TVsRqK8CvQqk3IJxJgelERftmi\nudevpnAKKZfYgHhXayDpq3JwQNR/rQ+Yy0dXvQTIkN7Xr0xw80OvbINIKHiDsSTw\nJ1Gr4E0rN1K9HedF7bITbnSW56TtCYcS3Fv+bqgCCTdyf1iByjoeYGEYIrkWoIXQ\n4fifo2ADAgMBAAECggEAB5ITVNk6ZNfkbtc7WW0Lis03ZAuV9EhINmD+t1EtyqMa\nXLEO2SZ7V4C4oKnZ8MywdAWkYLeMp6zIfU6clZ3k6Xw2yeyHbst1IY9O8qooXsXF\nKiGTMjry7i6LL4FUVr6wvkhuuidvpTExZf46a6HES1nV5tIA44630dtzyeHvnfEB\nD1lU+XZaP810xrrJNy1Fd+O0RwI9IpHeT/oSRRUkwKZ0ws18fVOpPXiiHuUsynry\nITY9iTkgX55joPbQjRkqGzs+HkXOKVnPAZ1B/ILSRxcfFEZl3ToPwMS1zzVETsv8\njL8oBMLxZ+vOPZCedd1Jkx6lipgCDcZve5A55jValQKBgQDKC612+IUHOtXJAbye\nsxM70WCzAC+8bYdjJR3augndbU/Eod2VuYPFmTumiOEYhY95aQZ8gLTUQHwi/wJ3\nyGUqxIr7uvfU5OQQAl5zEQ4GOII6zGdEaYKLEo1VGGl7I8akOsXs9C8L4nkTkDj2\nKwKuNScA16+LDd1TNe3LYDg6RwKBgQDG+InQKJsGUf+HztZ1GDP22RCozviH2p45\nC52rb3DAU+k6IqS5ohB4wZla6VXLKB5ts5uSIAXU/lD/JmIVXUPSJnJqTNJKUU16\na2SsY0Dk37cQnaoGgyJvAiNlQ4AGiPGW54Gb5PB5k7IoZCuQCegfqyQDQWsQuHeU\ne/HUfVeOZQKBgADySw66nUzqXqQBaRPJPPbTxUMxZgfY74BsZRZoNrGd2HjQVUxl\nQRPE4v2luIA35/MmpcwhgjdYUfyL+0P6YVbw8sG5H34U0Giuyih51Pn8e8ewu28b\nm2vxW04hviTAhyavy8uPXUUN+4k27L1ieDG+t/8OA5mAKCBCqWmBeuHzAoGAdj/d\nf6WyRHZVHDxT/jFNKMZmfTzMPckywYpiwTEw3EzCTneqWFy1116PqpUEFQIZ226j\n5Zs8fBJMxubj4fiUxv9sfjp7vAlHt5q9sSonth4y6SAanVYwD7NAn/0WyEt48QtT\nXvgX5tldR14I+ci5eKC4fWrSm5RWFRv4ZCW99HUCgYEAlnVz9OkljputAgvQBNR7\nSvHTUHBSIbFes7LDry77O9k9lt6ljsbawHJl+d7P9RrB5oRbA310japKBwpqtJiX\nRVXgiFYtVEWy0bqcrZehS4zdTU5GC/f/p41QNdLKfVNFJSjd59Re8gm7jT3Hz2cJ\nTIrn7oYg9il3jcGYmpHTMwE=\n-----END PRIVATE KEY-----\n",
  clientEmail: "firebase-adminsdk-1hwiy@recipes-b4425.iam.gserviceaccount.com",
};
if (getApps.length <= 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
export const adminAuth = admin.auth();
export const adminDB = getFirestore();
